import { join } from 'path';
import {
  addProjectConfiguration,
  getWorkspaceLayout,
  names,
  Tree,
} from '@nx/devkit';

import { DEFAULT_FLUTTER_CLI_ARGS, NX_FLUTTER_PKG } from '../constants';
import {
  AndroidLanguage,
  FlutterPlatform,
  FlutterProjectTemplate,
  IosLanguage,
} from '../types';
import {
  FlutterProjectGeneratorOptions,
  FlutterProjectGeneratorOptionsNormalized,
} from '../models/flutter-project-generator-options.model';
import { addPluginToNxJson } from '../utils/nx.utils';
import {
  createFlutterProject,
  getFlutterProjectNxTargets,
} from '../utils/flutter.utils';
import { FlutterAppGeneratorOptions } from '../../generators/app/schema';
import { FlutterPluginGeneratorOptions } from '../../generators/plugin/schema';

/**
 * Nx generator for creating a Flutter project
 *
 * @param template the type of Flutter project to create
 * @param options the options passed to the generator
 * @param tree the file system tree
 */
export default async function (
  template: FlutterProjectTemplate,
  options: FlutterProjectGeneratorOptions,
  tree: Tree
) {
  addPluginToNxJson(tree, NX_FLUTTER_PKG);

  const normalizedOptions = normalizeOptions(
    template,
    options,
    getWorkspaceLayout(tree)
  );
  await createFlutterProject(normalizedOptions);

  addProjectConfiguration(tree, normalizedOptions.name, {
    root: normalizedOptions.directory,
    sourceRoot: join(normalizedOptions.directory, 'src'),
    projectType:
      normalizedOptions.template === 'app' ? 'application' : 'library',
    targets: getFlutterProjectNxTargets(normalizedOptions),
    tags: normalizedOptions.tags,
  });
}

/**
 * Normalize options for a Flutter project Nx generator.
 *
 * - Cleanup options strings (trim, replace spaces with dashes, etc.)
 * - Set options to null if they are the same as the default Flutter CLI options
 *
 * @param template the type of Flutter project to create
 * @param options the options passed to the generator
 * @param tree the file system tree
 * @returns normalized options
 */
function normalizeOptions(
  template: FlutterProjectTemplate,
  options: FlutterProjectGeneratorOptions,
  workspaceLayout: { appsDir: string; libsDir: string }
): FlutterProjectGeneratorOptionsNormalized {
  const defaultOptions = DEFAULT_FLUTTER_CLI_ARGS.create;

  options.name = names(options.name.trim()).fileName;
  options.description = options.description.trim();
  options.org = options.org.trim();
  options.tags = options.tags?.trim();
  options.directory = options.directory
    .trim()
    .replace(new RegExp('/', 'g'), '-');

  const rootDirectory =
    template === 'app' ? workspaceLayout.appsDir : workspaceLayout.libsDir;
  const parentDirectory = join(rootDirectory, options.directory);
  const namePrefix =
    parentDirectory === rootDirectory
      ? ''
      : names(options.directory).fileName.concat('-');

  const name = namePrefix.concat(options.name);
  const description =
    options.description !== defaultOptions.description
      ? options.description
      : null;
  const org = options.org !== defaultOptions.org ? options.org : null;

  const platforms = (() => {
    let platforms: FlutterPlatform[] = null;
    switch (template) {
      case 'app':
        platforms = (options as FlutterAppGeneratorOptions).platforms;
        break;
      case 'plugin':
        platforms = (options as FlutterPluginGeneratorOptions).platforms;
        break;
      default:
        return null;
    }
    return platforms.length === defaultOptions.platforms.length &&
      platforms.every((p) => defaultOptions.platforms.includes(p))
      ? null
      : platforms;
  })();
  const androidLanguage = (() => {
    let androidLanguage: AndroidLanguage = null;
    switch (template) {
      case 'app':
        androidLanguage = (options as FlutterAppGeneratorOptions)
          .androidLanguage;
        break;
      case 'plugin':
        androidLanguage = (options as FlutterPluginGeneratorOptions)
          .androidLanguage;
        break;
      default:
        return null;
    }
    return androidLanguage !== defaultOptions.androidLanguage
      ? androidLanguage
      : null;
  })();
  const iosLanguage = (() => {
    let iosLanguage: IosLanguage = null;
    switch (template) {
      case 'app':
        iosLanguage = (options as FlutterAppGeneratorOptions).iosLanguage;
        break;
      case 'plugin':
        iosLanguage = (options as FlutterPluginGeneratorOptions).iosLanguage;
        break;
      default:
        return null;
    }
    return iosLanguage !== defaultOptions.iosLanguage ? iosLanguage : null;
  })();

  const pub = options.pub !== defaultOptions.pub ? options.pub : null;
  const offline =
    options.offline !== defaultOptions.offline ? options.offline : null;
  const overwrite =
    options.overwrite !== defaultOptions.overwrite ? options.overwrite : null;

  const empty = (() => {
    if (template !== 'app') return null;

    const empty = (options as FlutterAppGeneratorOptions).empty;
    return empty !== defaultOptions.empty ? empty : null;
  })();

  const tags = options.tags?.split(',')?.map((s) => s.trim()) ?? [];
  const directory = join(
    options.directory ? parentDirectory : rootDirectory,
    name.replace(new RegExp('/', 'g'), '-')
  );

  return {
    template,
    name,
    description,
    org,
    platforms,
    androidLanguage,
    iosLanguage,
    pub,
    offline,
    overwrite,
    empty,
    tags,
    directory,
  };
}
