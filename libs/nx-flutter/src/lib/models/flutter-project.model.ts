import { join } from 'path';
import { Tree, names, getWorkspaceLayout } from '@nx/devkit';

import { FlutterProjectGeneratorOptions } from './flutter-project-generator-options.model';
import {
  AndroidLanguage,
  FlutterPlatform,
  FlutterProjectTemplate,
  IosLanguage,
} from '../types';

/**
 * A Flutter project in a Nx workspace.
 *
 * It is used to generate the Flutter project with Nx target.
 */
export class FlutterProject {
  /**
   * The template used to generate the project.
   *
   * It is used to determine the project type and Nx targets to generate.
   */
  public readonly template: FlutterProjectTemplate;

  /**
   * Name of the Nx project.
   *
   * It is used as Flutter project name but with '-' replaced by '_'.
   */
  public readonly name: string;

  /**
   * Flutter project description. This string ends up in the pubspec.yaml file.
   */
  public readonly description: string;

  /**
   * The organization responsible for the Flutter project, in reverse domain name notation.
   * This string is used in Java package names and as prefix in the iOS bundle identifier.
   */
  public readonly org: string;

  /**
   * The platforms supported by the project. Platform folders (e.g. android/) will be generated in the target project. Adding desktop platforms requires the corresponding desktop config setting to be enabled.
   *
   * If not specified, all platforms are generated by the Flutter CLI.
   */
  public readonly platforms: FlutterPlatform[] | null;

  /**
   * The language to use for Android-specific code.
   */
  public readonly androidLanguage: AndroidLanguage | null;

  /**
   * The language to use for iOS-specific code.
   */
  public readonly iosLanguage: IosLanguage | null;

  /**
   * Whether to run "flutter pub get" after the project has been created.
   */
  public readonly pub: boolean;

  /**
   * When "flutter pub get" is run by the create command, this indicates whether to run it in offline mode or not. In offline mode, it will need to have all dependencies already available in the pub cache to succeed.
   */
  public readonly offline: boolean;

  /**
   * When performing operations, overwrite existing files.
   */
  public readonly overwrite: boolean;

  /**
   * Specifies creating using an application template with a main.dart that is minimal, including no comments, as a starting point for a new application.
   */
  public readonly empty: boolean | null;

  /**
   * The tags to add to the project.
   */
  public readonly tags: string[];

  /**
   * The directory where the project is generated.
   */
  public readonly directory: string;

  /**
   * Instantiate a Flutter project in a Nx environment.
   *
   * @param template the template used to generate the project
   * @param options the options passed to the generator
   * @param tree the file system tree
   */
  constructor(
    template: FlutterProjectTemplate,
    options: FlutterProjectGeneratorOptions,
    tree: Tree
  ) {
    const { appsDir, libsDir } = getWorkspaceLayout(tree);

    this.template = template;

    this.name = names(options.name).fileName;
    this.description = options.description;
    this.org = options.org.trim();
    if (!this.org.length) this.org = 'com.example';
    if (['app', 'plugin'].includes(template)) {
      this.platforms = options['platforms'] ?? [
        'android',
        'ios',
        'linux',
        'windows',
        'macos',
        'web',
      ];
      this.androidLanguage = options['androidLanguage'] ?? 'kotlin';
      this.iosLanguage = options['iosLanguage'] ?? 'swift';
    } else {
      this.platforms = null;
      this.androidLanguage = null;
      this.iosLanguage = null;
    }
    this.pub = options.pub ?? true;
    this.offline = options.offline ?? false;
    this.overwrite = options.overwrite ?? false;
    if (template == 'app') this.empty = options['empty'] ?? false;
    else this.empty = null;

    this.tags = options.tags
      ? options.tags
          .trim()
          .split(',')
          .map((s) => s.trim())
      : [];
    const parentDirectory = this.template === 'app' ? appsDir : libsDir;
    this.directory = join(
      options.directory
        ? join(parentDirectory, options.directory)
        : parentDirectory,
      this.name.replace(new RegExp('/', 'g'), '-')
    );
  }
}
