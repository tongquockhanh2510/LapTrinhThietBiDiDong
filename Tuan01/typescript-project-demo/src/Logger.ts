export class Logger {
  private static instance: Logger | null = null;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) Logger.instance = new Logger();
    return Logger.instance;
  }

  private timestamp(): string {
    return new Date().toISOString();
  }

  log(...args: any[]): void {
    console.log(`[LOG - ${this.timestamp()}]`, ...args);
  }

  info(...args: any[]): void {
    console.info(`[INFO - ${this.timestamp()}]`, ...args);
  }

  warn(...args: any[]): void {
    console.warn(`[WARN - ${this.timestamp()}]`, ...args);
  }

  error(...args: any[]): void {
    console.error(`[ERROR - ${this.timestamp()}]`, ...args);
  }
}
