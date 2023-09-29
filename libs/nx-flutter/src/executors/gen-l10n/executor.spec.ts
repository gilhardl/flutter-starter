import { ExecutorContext } from '@nx/devkit';

import { DEFAULT_FLUTTER_CLI_ARGS } from '../../lib/constants';
import runExecutor from './executor';
import { FlutterGenL10nExecutorOptions } from './schema';

const defaultOptions = DEFAULT_FLUTTER_CLI_ARGS.genL10n;

describe('GenL10n executor', () => {
  const options: FlutterGenL10nExecutorOptions = defaultOptions;
  const context = {
    cwd: '/root',
    root: '/root',
    projectName: 'my-app',
    targetName: 'build',
    configurationName: 'production',
    projectsConfigurations: {
      version: 1,
      projects: {
        'my-app': {
          root: '/apps/my-app',
        },
      },
    },
    isVerbose: false,
  } as ExecutorContext;

  it('can run', async () => {
    const output = await runExecutor(options, context);
    expect(output.success).toBe(true);
  });
});
