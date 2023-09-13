import { join } from 'path';
import { addProjectConfiguration, Tree } from '@nx/devkit';

import { ModuleGeneratorSchema } from './schema';
import { NX_FLUTTER_PKG } from '../../lib/constants';
import { FlutterProject } from '../../lib/models/flutter-project.model';
import { addPluginToNxJson } from '../../lib/utils/nx.utils';
import {
  createFlutterProject,
  getFlutterProjectNxTargets,
} from '../../lib/utils/flutter.utils';

/**
 * Nx generator for creating a Flutter module (Embeddable Flutter view)
 *
 * @param tree the file system tree
 * @param options the options passed to the generator
 */
export async function moduleGenerator(
  tree: Tree,
  options: ModuleGeneratorSchema
) {
  addPluginToNxJson(tree, NX_FLUTTER_PKG);

  const project = new FlutterProject('module', options, tree);
  await createFlutterProject(project);

  addProjectConfiguration(tree, project.name, {
    root: project.directory,
    sourceRoot: join(project.directory, 'src'),
    projectType: 'library',
    targets: getFlutterProjectNxTargets(project),
    tags: project.tags,
  });
}

export default moduleGenerator;
