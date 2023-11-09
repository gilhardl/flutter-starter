/**
 * Base interface for options passed to the `flutter <command>` command.
 *
 * Each Nx executor of a Flutter command extends this interface to add
 * additional options.
 *
 * - @see FlutterAnalyzeExecutorOptions
 * - @see FlutterAttachExecutorOptions
 * - @see FlutterCleanExecutorOptions
 * - @see FlutterGenL10nExecutorOptions
 * - @see FlutterInstallExecutorOptions
 * - @see FlutterRunExecutorOptions
 * - @see FlutterTestExecutorOptions
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
 * - @see FlutterAttachExecutorOptionsNormalized
 * - @see FlutterCleanExecutorOptionsNormalized
 * - @see FlutterGenL10nExecutorOptionsNormalized
 * - @see FlutterInstallExecutorOptionsNormalized
 * - @see FlutterRunExecutorOptionsNormalized
 * - @see FlutterTestExecutorOptionsNormalized
 */
export interface FlutterExecutorOptionsNormalized {
  /**
   * Enable noisy logging, including all shell commands executed.
   */
  verbose: boolean | null;
}
