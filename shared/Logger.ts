export class Logger {

  static resetColor: string = '\u001b[0m'

  private includeDate: boolean
  private isVerbose: boolean
  private highlightColor: string

  constructor(includeDate: boolean, isVerbose: boolean, highlightColor: string) {
    this.includeDate = includeDate
    this.isVerbose = isVerbose
    this.highlightColor = highlightColor

    this.log('Logger created with args: { includeDate: $0, isVerbose: $1}', includeDate, isVerbose)
  }

  log(msg: string, ...args: unknown[]) {
    if (!this.isVerbose)
      return

    for (let i=0; i<args.length; i++) {
      msg = msg.replace(
        `$${i}`,
        `${this.highlightColor}${args[i]}${Logger.resetColor}`
      )
    }

    if (this.includeDate) {
      const date = new Date()
      msg = `[${date.getHours()}:${date.getMinutes()}] ${msg}`
    }

    console.log(msg)
  }

}