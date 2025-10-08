"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    constructor() { }
    static getInstance() {
        if (!Logger.instance)
            Logger.instance = new Logger();
        return Logger.instance;
    }
    timestamp() {
        return new Date().toISOString();
    }
    log(...args) {
        console.log(`[LOG - ${this.timestamp()}]`, ...args);
    }
    info(...args) {
        console.info(`[INFO - ${this.timestamp()}]`, ...args);
    }
    warn(...args) {
        console.warn(`[WARN - ${this.timestamp()}]`, ...args);
    }
    error(...args) {
        console.error(`[ERROR - ${this.timestamp()}]`, ...args);
    }
}
exports.Logger = Logger;
Logger.instance = null;
