import { ExecutorContext } from '@nx/devkit';

import { DEFAULT_FLUTTER_CLI_ARGS } from '../../lib/constants';
import analyzeExecutor from './executor';
import { FlutterAnalyzeExecutorOptions } from './schema';

const defaultOptions = DEFAULT_FLUTTER_CLI_ARGS.analyze;

describe('Analyze executor', () => {
  const options: FlutterAnalyzeExecutorOptions = defaultOptions;
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
    const output = await analyzeExecutor(options, context);
    expect(output.success).toBe(true);
  });
});
