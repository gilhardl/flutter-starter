import { BooleanArgument, KeyValueArgument } from '../types';

/**
 * Map lists of key-value and boolean arguments to a string of shell arguments.
 *
 * @param keyValue list of key-value arguments
 * @param boolean list of boolean arguments
 * @returns all arguments as a string
 */
export function stringifyShellArguments(
  keyValue: KeyValueArgument[],
  boolean: BooleanArgument[]
): string {
  return [
    keyValue
      .filter((e) => e.value !== null && e.value !== undefined)
      .map((e) => `--${e.key}=${e.value}`)
      .join(' '),
    boolean
      .filter((e) => e.value !== null && e.value !== undefined)
      .map((e) => {
        if (e.value === true) return `--${e.key}`;
        else if (e.value === false) return `--no-${e.key}`;
        return '';
      })
      .join(' '),
  ].join(' ');
}
