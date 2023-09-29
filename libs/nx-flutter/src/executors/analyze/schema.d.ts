import { FlutterExecutorOptions } from '../../lib/models/executors/flutter-executor-options.model';

/**
 * Flutter analyze Nx executor options.
 *
 * These are specific options passed to the `flutter analyze` command.
 */
export interface FlutterAnalyzeExecutorOptions extends FlutterExecutorOptions {
  /**
   * Analyze the current project, if applicable.
   */
  currentPackage: boolean;

  /**
   * Run analysis continuously, watching the filesystem for changes.
   */
  watch: boolean;

  /**
   * Also output the results to a file. This is useful with \"--watch\" if you want a file to always contain the latest results.
   */
  write: string;

  /**
   * Show suggestions about the current flutter project.
   */
  suggestions: boolean;

  /**
   * Whether to run \"flutter pub get\" before executing this command.
   */
  pub: boolean;

  /**
   * Show output even when there are no errors, warnings, hints, or lints. Ignored if \"--watch\" is specified.
   */
  congratulate: boolean;

  /**
   * When analyzing the flutter repository, display the number of files that will be analyzed.
   */
  preamble: boolean;

  /**
   * Treat info level issues as fatal.
   */
  fatalInfos: boolean;

  /**
   * Treat warning level issues as fatal.
   */
  fatalWarnings: boolean;
}
