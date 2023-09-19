import { Tree } from '@nx/devkit';

import { FlutterPluginGeneratorOptions } from './schema';
import { FlutterProject } from '../../lib/models/flutter-project.model';
import projectGenerator from '../../lib/flutter-project-generator';

/**
 * Nx generator for creating a Flutter plugin (Dart + platform-specific code)
 *
 * @param tree the file system tree
 * @param options the options passed to the generator
 */
export default async function (
  tree: Tree,
  options: FlutterPluginGeneratorOptions
) {
  const project = new FlutterProject('plugin', options, tree);

  return projectGenerator(tree, project);
}
