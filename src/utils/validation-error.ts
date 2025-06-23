export class ValidationError extends Error {
  public readonly code: string
  public readonly message: string

  constructor(message: string) {
    super(message)
    this.code = 'INVALID_DATA'
    this.message = message
  }
}