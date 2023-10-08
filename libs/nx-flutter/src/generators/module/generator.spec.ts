import { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { DEFAULT_FLUTTER_CLI_ARGS } from '../../lib/constants';
import * as FlutterProjectGenerator from '../../lib/flutter-command.executor';
import moduleGenerator from './generator';
import { FlutterModuleGeneratorOptions } from './schema';

const defaultOptions = DEFAULT_FLUTTER_CLI_ARGS.create;

describe('module generator', () => {
  let tree: Tree;
  const options: FlutterModuleGeneratorOptions = {
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
    expect(() => moduleGenerator(tree, options)).not.toThrow();
  });
});
