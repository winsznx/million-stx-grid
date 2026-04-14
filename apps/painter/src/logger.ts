const PREFIX = "[painter]";

export function info(msg: string): void {
  console.log(`${PREFIX} ${msg}`);
}

export function warn(msg: string): void {
  console.warn(`${PREFIX} ${msg}`);
}

export function error(msg: string): void {
  console.error(`${PREFIX} ${msg}`);
}
