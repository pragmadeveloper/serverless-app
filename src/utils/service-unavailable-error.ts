export class ServiceUnavailableError extends Error {
  public readonly code: string
  public readonly message: string

  constructor(message: string) {
    super(message)
    this.code = 'SERVICE_UNAVAILABLE'
    this.message = message
  }
}