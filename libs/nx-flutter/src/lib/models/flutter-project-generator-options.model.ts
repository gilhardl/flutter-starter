/**
 * Base interface for options passed to the `flutter create` command.
 *
 * Each Nx generator of Flutter projects extends this interface to add
 * additional options.
 *
 * - @see FlutterAppGeneratorOptions
 * - @see FlutterModuleGeneratorOptions
 * - @see FlutterPackageGeneratorOptions
 * - @see FlutterPluginGeneratorOptions
 */
export interface FlutterProjectGeneratorOptions {
  name: string;
  description: string;
  org: string;

  pub: boolean;
  offline: boolean;
  overwrite: boolean;

  tags: string;
  directory: string;
}
