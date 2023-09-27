/**
 * Normalized options passed to the `flutter analyze` command.
 */
export interface FlutterAnalyzeExecutorOptionsNormalized {
  /**
   * Enable noisy logging, including all shell commands executed.
   */
  verbose: boolean | null;

  /**
   * Analyze the current project, if applicable.
   */
  currentPackage: boolean | null;

  /**
   * Run analysis continuously, watching the filesystem for changes.
   */
  watch: boolean | null;

  /**
   * Also output the results to a file. This is useful with \"--watch\" if you want a file to always contain the latest results.
   */
  write: string | null;

  /**
   * Show suggestions about the current flutter project.
   */
  suggestions: boolean | null;

  /**
   * Whether to run \"flutter pub get\" before executing this command.
   */
  pub: boolean | null;

  /**
   * Show output even when there are no errors, warnings, hints, or lints. Ignored if \"--watch\" is specified.
   */
  congratulate: boolean | null;

  /**
   * When analyzing the flutter repository, display the number of files that will be analyzed.
   */
  preamble: boolean | null;

  /**
   * Treat info level issues as fatal.
   */
  fatalInfos: boolean | null;

  /**
   * Treat warning level issues as fatal.
   */
  fatalWarnings: boolean | null;
}
