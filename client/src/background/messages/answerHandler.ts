import type { PlasmoMessaging } from "@plasmohq/messaging"

import AnswerService from "../../answerService"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { prompt } = req.body
  const response = await AnswerService.getAnswer(prompt)
  res.send(response)
}

export default handler
