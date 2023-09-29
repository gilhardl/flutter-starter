/**
 * Base interface for options passed to the `flutter <command>` command.
 *
 * Each Nx executor of a Flutter command extends this interface to add
 * additional options.
 *
 * - @see FlutterAnalyzeExecutorOptions
 * - @see FlutterCleanExecutorOptions
 * - @see FlutterGenL10nExecutorOptions
 * - @see FlutterRunExecutorOptions
 */
export interface FlutterExecutorOptions {
  /**
   * Enable noisy logging, including all shell commands executed.
   */
  verbose: boolean;
}

/**
 * Base interface for normalized options passed to the `flutter clean` command.
 *
 * Each Nx executor of a Flutter command extends this interface to add
 * additional options.
 *
 * - @see FlutterAnalyzeExecutorOptionsNormalized
 * - @see FlutterCleanExecutorOptionsNormalized
 * - @see FlutterGenL10nExecutorOptionsNormalized
 * - @see FlutterRunExecutorOptionsNormalized
 */
export interface FlutterExecutorOptionsNormalized {
  /**
   * Enable noisy logging, including all shell commands executed.
   */
  verbose: boolean | null;
}
