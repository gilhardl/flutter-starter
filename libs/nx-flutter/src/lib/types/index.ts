/**
 * A Flutter project template.
 */
export type FlutterProjectTemplate = 'app' | 'module' | 'package' | 'plugin';

/**
 * A Flutter target platform.
 */
export type FlutterPlatform =
  | 'android'
  | 'ios'
  | 'linux'
  | 'macos'
  | 'windows'
  | 'web';

/**
 * An Android language.
 */
export type AndroidLanguage = 'java' | 'kotlin';

/**
 * An iOS language.
 */
export type IosLanguage = 'objc' | 'swift';

/**
 * A Flutter build mode.
 */
export type FlutterBuildMode = 'debug' | 'profile' | 'release';

/**
 * A Flutter web renderer.
 */
export type FlutterWebRenderer = 'auto' | 'canvasKit' | 'html';

/**
 * A Flutter command.
 */
export type FlutterCommand = 'create' | 'analyze' | 'clean' | 'run';

/**
 * Shell command arguments.
 */
export type CommandArguments = {
  keyValue: KeyValueArgument[];
  boolean: BooleanArgument[];
};

/**
 * A key=value shell argument.
 */
export type KeyValueArgument = { key: string; value: string | null };

/**
 * A boolean shell argument.
 */
export type BooleanArgument = { key: string; value?: boolean | null };
