export class Logger {

    static info(message: string) {
        console.log(`[INFO] ${message}`);
    }

    static success(message: string) {
        console.log(`[SUCCESS] ${message}`);
    }

    static warning(message: string) {
        console.log(`[WARNING] ${message}`);
    }

    static error(message: string) {
        console.error(`[ERROR] ${message}`);
    }

    static api(method: string, endpoint: string) {
        console.log(`[API] ${method} ${endpoint}`);
    }

}