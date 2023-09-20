import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import packageGenerator from './generator';
import { FlutterPackageGeneratorOptions } from './schema';
import { DEFAULT_FLUTTER_CLI_ARGS } from '../../lib/constants';

const defaultOptions = DEFAULT_FLUTTER_CLI_ARGS.create;

describe('package generator', () => {
  let tree: Tree;
  const options: FlutterPackageGeneratorOptions = {
    name: 'test',
    ...defaultOptions,
    tags: undefined,
    directory: '.',
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await packageGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
