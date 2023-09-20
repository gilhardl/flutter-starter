import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import appGenerator from './generator';
import { FlutterAppGeneratorOptions } from './schema';
import { DEFAULT_FLUTTER_CLI_ARGS } from '../../lib/constants';

const defaultOptions = DEFAULT_FLUTTER_CLI_ARGS.create;

describe('app generator', () => {
  let tree: Tree;
  const options: FlutterAppGeneratorOptions = {
    name: 'test',
    ...defaultOptions,
    tags: undefined,
    directory: '.',
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await appGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
