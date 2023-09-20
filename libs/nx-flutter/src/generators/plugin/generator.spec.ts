import { createTree, createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import pluginGenerator from './generator';
import { FlutterPluginGeneratorOptions } from './schema';
import { DEFAULT_FLUTTER_CLI_ARGS } from '../../lib/constants';

const defaultOptions = DEFAULT_FLUTTER_CLI_ARGS.create;

describe('plugin generator', () => {
  let tree: Tree;
  const options: FlutterPluginGeneratorOptions = {
    name: 'test',
    ...defaultOptions,
    tags: undefined,
    directory: '.',
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await pluginGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
