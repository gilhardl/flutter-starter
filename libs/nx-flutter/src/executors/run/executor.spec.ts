import { DEFAULT_FLUTTER_CLI_ARGS } from '../../lib/constants';
import { TEST_APP_NAME } from '../../lib/constants/tests';
import * as FlutterCommandExecutor from '../../lib/flutter-command.executor';
import { FlutterRunExecutorOptionsNormalized } from '../../lib/models/executors/flutter-run-executor-options.model';
import { getExecutorContext } from '../../lib/utils/tests.utils';
import runExecutor from './executor';
import { FlutterRunExecutorOptions } from './schema';

const defaultOptions = DEFAULT_FLUTTER_CLI_ARGS.run;

describe('Run executor', () => {
  const options: FlutterRunExecutorOptions = defaultOptions;
  const context = getExecutorContext(TEST_APP_NAME, 'run');

  beforeAll(() => {
    jest
      .spyOn(FlutterCommandExecutor, 'default')
      .mockImplementation(async () => ({ success: true }));

    jest
      .spyOn(FlutterCommandExecutor, 'normalizeCommandExecutorOptions')
      .mockReturnValue(
        Object.keys(defaultOptions).reduce(
          (acc, key) => ({
            ...acc,
            [key]: null,
          }),
          {}
        ) as FlutterRunExecutorOptionsNormalized
      );
  });

  it('can run', async () => {
    const output = await runExecutor(options, context);
    expect(output.success).toBe(true);
  });
});
