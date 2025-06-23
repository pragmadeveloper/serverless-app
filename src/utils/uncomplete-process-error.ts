export class UncompleteProcessError extends Error {
  public readonly code: string
  public readonly message: string

  constructor(message: string) {
    super(message)
    this.code = 'UNCOMPLETED_PROCESS'
    this.message = message
  }
}