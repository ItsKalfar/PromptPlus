interface IAnswerService {
  getAnswer: (prompt: string) => Promise<{ answer: string }>
}
