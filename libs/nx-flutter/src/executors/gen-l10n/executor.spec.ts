import { DEFAULT_FLUTTER_CLI_ARGS } from '../../lib/constants';
import { TEST_APP_NAME } from '../../lib/constants/tests';
import * as FlutterCommandExecutor from '../../lib/flutter-command.executor';
import { FlutterGenL10nExecutorOptionsNormalized } from '../../lib/models/executors/flutter-gen-l10n-executor-options.model';
import { getExecutorContext } from '../../lib/utils/tests.utils';
import runExecutor from './executor';
import { FlutterGenL10nExecutorOptions } from './schema';

const defaultOptions = DEFAULT_FLUTTER_CLI_ARGS.genL10n;

describe('GenL10n executor', () => {
  const options: FlutterGenL10nExecutorOptions = defaultOptions;
  const context = getExecutorContext(TEST_APP_NAME, 'gen-l10n');

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
        ) as FlutterGenL10nExecutorOptionsNormalized
      );
  });

  it('can run', async () => {
    const output = await runExecutor(options, context);
    expect(output.success).toBe(true);
  });
});
