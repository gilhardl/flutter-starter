import { DEFAULT_FLUTTER_CLI_ARGS } from '../../lib/constants';
import { TEST_APP_NAME } from '../../lib/constants/tests';
import * as FlutterCommandExecutor from '../../lib/flutter-command.executor';
import { FlutterTestExecutorOptionsNormalized } from '../../lib/models/executors/flutter-test-executor-options.model';
import { getExecutorContext } from '../../lib/utils/tests.utils';
import runExecutor from './executor';
import { FlutterTestExecutorOptions } from './schema';

const defaultOptions = DEFAULT_FLUTTER_CLI_ARGS.test;

describe('Run executor', () => {
  const options: FlutterTestExecutorOptions = defaultOptions;
  const context = getExecutorContext(TEST_APP_NAME, 'test');

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
        ) as FlutterTestExecutorOptionsNormalized
      );
  });

  it('can run', async () => {
    const output = await runExecutor(options, context);
    expect(output.success).toBe(true);
  });
});
