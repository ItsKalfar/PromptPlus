import { zodResolver } from "@hookform/resolvers/zod"
import cssText from "data-text:./style.css"
import { ArrowLeft, Zap } from "lucide-react"
import type { PlasmoCSConfig } from "plasmo"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import * as z from "zod"

import { sendToBackground } from "@plasmohq/messaging"

import { Button } from "./features/button"
import { InputField } from "./features/input-field"
import { OutputBox } from "./features/output-field"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const MainPopup = () => {
  const [answer, setAnswer] = useState("")
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const formSchema = z.object({
    prompt: z
      .string()
      .min(3, {
        message: "Prompt must be at least 3 characters."
      })
      .max(1000, { message: "Prompt cannot be more than 200 characters" })
  })

  type ValidationSchema = z.infer<typeof formSchema>

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  })

  const onSubmit: SubmitHandler<ValidationSchema> = async (data: any) => {
    try {
      setIsLoading(true)
      const { prompt } = data

      const res = await sendToBackground({
        name: "answerHandler" as never,
        body: {
          prompt
        }
      })
      setIsLoading(false)
      setAnswer(res)
    } catch (error) {
      console.error("Validation error:", error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    reset({
      prompt: ""
    })
    setAnswer("")
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Zap
        className="fixed shadow-xl w-[50px] h-[50px] rounded-md bottom-9 right-6 hover:scale-105 transition-all duration-100 ease-in-out dark:bg-white dark:text-gray-900 p-3 cursor-pointer border-2 border-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      />
      <div
        className={`fixed inset-0 z-50 backdrop-blur-sm items-center justify-center ${
          isOpen ? "flex" : "hidden"
        }`}>
        <div className="bg-white p-6 w-11/12 h-full max-w-[500px] max-h-[500px] shadow-lg rounded-md flex flex-col item-center relative overflow-y-auto">
          <ArrowLeft
            className="absolute top-4 left-5 text-gray-400 gray-100 cursor-pointer hover:text-gray-500"
            onClick={handleClose}
          />
          <h1 className="text-gray-800 text-lg text-center font-bold my-6">
            PromptPlus
          </h1>
          <form
            className="flex flex-col items-center justify-between h-full w-full"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full">
              <InputField
                id="message"
                type="text"
                placeholder="Send a message"
                {...register("prompt")}
                error={errors.prompt && errors.prompt.message}
              />
              {isLoading ? (
                <div className="border-gray-200 border-2 px-3 py-2 w-full h-[250px] rounded-md my-4 overflow-y-auto text-gray-900">
                  <p>Please Wait...</p>
                </div>
              ) : (
                <OutputBox response={answer} />
              )}
            </div>
            <Button type="submit">Send</Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default MainPopup
