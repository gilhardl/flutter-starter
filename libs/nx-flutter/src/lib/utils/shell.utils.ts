import { CommandArguments } from '../types';

/**
 * Map lists of key-value and boolean arguments to a string of shell arguments.
 *
 * @param position list of positional arguments
 * @param keyValue list of key-value arguments
 * @param boolean list of boolean arguments
 * @returns all arguments as a string
 */
export function stringifyShellArguments({
  positional,
  keyValue,
  boolean,
}: CommandArguments): string {
  return [
    keyValue
      .filter((e) => e.value !== null && e.value !== undefined)
      .map((e) => `--${e.key}=${e.value.trim()}`)
      .join(' '),
    boolean
      .filter((e) => e.value !== null && e.value !== undefined)
      .map((e) => {
        if (e.value === true) return `--${e.key}`;
        else if (e.value === false) return `--no-${e.key}`;
        return '';
      })
      .join(' '),
    positional
      .filter((e) => e !== null && e !== undefined)
      .map((e) => e.trim())
      .join(' '),
  ].join(' ');
}
