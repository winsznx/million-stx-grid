import { TRUNCATE_START, TRUNCATE_END } from "./constants";

export function shortAddress(address: string): string {
  if (!address) return "";
  if (address.length <= TRUNCATE_START + TRUNCATE_END + 1) return address;
  return `${address.slice(0, TRUNCATE_START)}…${address.slice(-TRUNCATE_END)}`;
}

export function mediumAddress(address: string): string {
  if (!address) return "";
  if (address.length <= 13) return address;
  return `${address.slice(0, 8)}…${address.slice(-4)}`;
}

export function fullAddress(address: string): string {
  return address.trim().toUpperCase();
}
