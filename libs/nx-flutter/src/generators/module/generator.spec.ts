import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import moduleGenerator from './generator';
import { FlutterModuleGeneratorOptions } from './schema';
import { DEFAULT_FLUTTER_CLI_ARGS } from '../../lib/constants';

const defaultOptions = DEFAULT_FLUTTER_CLI_ARGS.create;

describe('module generator', () => {
  let tree: Tree;
  const options: FlutterModuleGeneratorOptions = {
    name: 'test',
    ...defaultOptions,
    tags: undefined,
    directory: '.',
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await moduleGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
