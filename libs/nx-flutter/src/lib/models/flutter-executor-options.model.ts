/**
 * Base interface for options passed to the `flutter <command>` command.
 *
 * Each Nx executor of a Flutter command extends this interface to add
 * additional options.
 *
 * - @see FlutterRunExecutorOptions
 */
export interface FlutterExecutorOptions {
  /**
   * Enable noisy logging, including all shell commands executed.
   */
  verbose: boolean;
}
