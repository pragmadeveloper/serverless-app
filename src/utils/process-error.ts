export class ProcessError extends Error {
  public readonly code: string
  public readonly message: string

  constructor(message: string) {
    super(message)
    this.code = 'PROCESS_ERROR'
    this.message = message
  }
}