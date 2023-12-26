import { API_BASE_API_URL } from "./constants"

const AnswerService = {
  getAnswer: async function (prompt: string) {
    try {
      const response = await fetch(API_BASE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      })

      return response.text()
    } catch (error) {
      throw new Error("Error", error)
    }
  }
}

export default AnswerService
