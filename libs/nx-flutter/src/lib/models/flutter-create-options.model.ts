/**
 * Base interface for options passed to the `flutter create` command.
 *
 * Each Nx generator of Flutter projects extends this interface to add
 * additional options.
 *
 * - {@link AppGeneratorSchema}
 */
export interface FlutterCreateOptions {
  name: string;
  description: string;
  org: string;

  pub: boolean;
  offline: boolean;
  overwrite: boolean;

  tags: string[];
  directory: string;
}
