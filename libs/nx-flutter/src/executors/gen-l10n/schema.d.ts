import { FlutterExecutorOptions } from '../../lib/models/flutter-executor-options.model';

/**
 * Flutter gen-l10n Nx executor options.
 *
 * These are specific options passed to the `flutter gen-l10n` command.
 */
export interface FlutterGenL10nExecutorOptions extends FlutterExecutorOptions {
  /**
   * Noisy logging, including all shell commands executed.
   */
  verbose: boolean;

  /**
   * The directory where the template and translated arb files are located.
   */
  arbDir?: string;

  /**
   * The directory where the generated localization classes will be written if the synthetic-package flag is set to false.\n\nIf output-dir is specified and the synthetic-package flag is enabled, this option will be ignored by the tool.\n\nThe app must import the file specified in the \"--output-localization-file\" option from this directory. If unspecified, this defaults to the same directory as the input directory specified in \"--arb-dir\".
   */
  outputDir?: string;

  /**
   * The template arb file that will be used as the basis for generating the Dart localization and messages files.
   */
  templateArbFile?: string;

  /**
   * The location of a file that describes the localization messages have not been translated yet. Using this option will create a JSON file at the target location, in the following format:\n\"locale\": [\"message_1\", \"message_2\" ... \"message_n\"]\n\nIf this option is not specified, a summary of the messages that have not been translated will be printed on the command line.
   */
  untranslatedMessagesFile?: string;

  /**
   * The Dart class name to use for the output localization and localizations delegate classes.
   */
  outputClass?: string;

  /**
   * The list of preferred supported locales for the application. By default, the tool will generate the supported locales list in alphabetical order. Use this flag if you would like to default to a different locale. For example, pass in \"en_US\" if you would like your app to default to American English on devices that support it. Pass this option multiple times to define multiple items.
   */
  preferredSupportedLocales: string[];

  /**
   * The header to prepend to the generated Dart localizations files. This option takes in a string. For example, pass in \"/// All localized files.\" if you would like this string prepended to the generated Dart file. Alternatively, see the \"--header-file\" option to pass in a text file for longer headers.
   */
  header?: string;

  /**
   * The header to prepend to the generated Dart localizations files. The value of this option is the name of the file that contains the header text which will be inserted at the top of each generated Dart file. Alternatively, see the \"--header\" option to pass in a string for a simpler header. This file should be placed in the directory specified in \"--arb-dir\".
   */
  headerFile?: string;

  /**
   * Whether to generate the Dart localization file with locales imported as deferred, allowing for lazy loading of each locale in Flutter web.\nThis can reduce a web app’s initial startup time by decreasing the size of the JavaScript bundle. When this flag is set to true, the messages for a particular locale are only downloaded and loaded by the Flutter app as they are needed. For projects with a lot of different locales and many localization strings, it can be an performance improvement to have deferred loading. For projects with a small number of locales, the difference is negligible, and might slow down the start up compared to bundling the localizations with the rest of the application.\nThis flag does not affect other platforms such as mobile or desktop.
   */
  useDeferredLoading: boolean;

  /**
   * When specified, the tool generates a JSON file containing the tool's inputs and outputs named gen_l10n_inputs_and_outputs.json.\nThis can be useful for keeping track of which files of the Flutter project were used when generating the latest set of localizations. For example, the Flutter tool's build system uses this file to keep track of when to call gen_l10n during hot reload.\nThe value of this option is the directory where the JSON file will be generated.\nWhen null, the JSON file will not be generated.
   */
  genInputsAndOutputsList?: string;

  /**
   * Determines whether or not the generated output files will be generated as a synthetic package or at a specified directory in the Flutter project.\\nThis flag is set to true by default.\\nWhen synthetic-package is set to false, it will generate the localizations files in the directory specified by arb-dir by default.\\nIf output-dir is specified, files will be generated there.
   */
  syntheticPackage: boolean;

  /**
   * When specified, the tool uses the path passed into this option as the directory of the root Flutter project.\\nWhen null, the relative path to the present working directory will be used.
   */
  projectDir?: string;

  /**
   * Requires all resource ids to contain a corresponding resource attribute.\nBy default, simple messages will not require metadata, but it is highly recommended as this provides context for the meaning of a message to readers.\nResource attributes are still required for plural messages.
   */
  requiredResourceAttributes: boolean;

  /**
   * Whether or not the localizations class getter is nullable.\nBy default, this value is set to true so that Localizations.of(context) returns a nullable value for backwards compatibility. If this value is set to false, then a null check is performed on the returned value of Localizations.of(context), removing the need for null checking in user code.
   */
  nullableGetter: boolean;

  /**
   * When specified, the \"dart format\" command is run after generating the localization files.
   */
  format: boolean;

  /**
   * Whether or not to use escaping for messages.\nBy default, this value is set to false for backwards compatibility. Turning this flag on will cause the parser to treat any special characters contained within pairs of single quotes as normal strings and treat all consecutive pairs of single quotes as a single quote character.
   */
  useEscaping: boolean;

  /**
   * When specified, all warnings will be suppressed.
   */
  suppressWarnings: boolean;
}
