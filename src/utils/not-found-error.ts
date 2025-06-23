export class NotFoundError extends Error {
  public readonly code: string
  public readonly message: string

  constructor(message: string) {
    super(message)
    this.code = 'RESOURCE_NOT_FOUND'
    this.message = message
  }
}