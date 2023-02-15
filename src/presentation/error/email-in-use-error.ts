export class EmailInUseError extends Error {
  constructor() {
    super(`Email received email is already in use`)
    this.name = 'EmailInUseError'
  }
}