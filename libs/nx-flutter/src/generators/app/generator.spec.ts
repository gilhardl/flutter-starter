import { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { DEFAULT_FLUTTER_CLI_ARGS } from '../../lib/constants';
import * as FlutterProjectGenerator from '../../lib/flutter-command.executor';
import appGenerator from './generator';
import { FlutterAppGeneratorOptions } from './schema';

const defaultOptions = DEFAULT_FLUTTER_CLI_ARGS.create;

describe('app generator', () => {
  let tree: Tree;
  const options: FlutterAppGeneratorOptions = {
    name: 'test-app',
    ...defaultOptions,
    tags: undefined,
    directory: '.',
  };

  beforeAll(() => {
    jest
      .spyOn(FlutterProjectGenerator, 'default')
      .mockImplementation(async () => void 0);
  });

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    expect(() => appGenerator(tree, options)).not.toThrow();
  });
});
