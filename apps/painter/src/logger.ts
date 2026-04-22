const PREFIX = "[painter]";

/**
 * Logs an informational message to the console with a timestamp.
 * @param msg - The message to log.
 */
export function info(msg: string): void {
  console.log(`${new Date().toISOString()} ${PREFIX} INFO: ${msg}`);
}

/**
 * Logs a warning message to the console with a timestamp.
 * @param msg - The message to log.
 */
export function warn(msg: string): void {
  console.warn(`${new Date().toISOString()} ${PREFIX} WARN: ${msg}`);
}

/**
 * Logs an error message to the console with a timestamp.
 * @param msg - The message to log.
 */
export function error(msg: string): void {
  console.error(`${new Date().toISOString()} ${PREFIX} ERROR: ${msg}`);
}
