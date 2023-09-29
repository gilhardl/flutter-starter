import { ExecutorContext } from '@nx/devkit';

import { DEFAULT_FLUTTER_CLI_ARGS } from '../../lib/constants';
import { FlutterGenL10nExecutorOptions } from './schema';
import { FlutterGenL10nExecutorOptionsNormalized } from '../../lib/models/flutter-gen-l10n-executor-options.model';
import flutterCommandExecutor, {
  normalizeCommandExecutorOptions,
} from '../../lib/executors/flutter-command.executor';

/**
 * Nx executor for generating a Flutter project localization files.
 *
 * @param options the options provided to the executor
 * @param context the Nx executor context
 */
export default async function (
  options: FlutterGenL10nExecutorOptions,
  context: ExecutorContext
) {
  const project = context.projectsConfigurations.projects[context.projectName];
  const normalizedOptions = normalizeCommandExecutorOptions<
    FlutterGenL10nExecutorOptions,
    FlutterGenL10nExecutorOptionsNormalized
  >(options, DEFAULT_FLUTTER_CLI_ARGS.genL10n);

  return flutterCommandExecutor(project, 'gen-l10n', {
    keyValue: [
      { key: 'arb-dir', value: normalizedOptions.arbDir },
      { key: 'output-dir', value: normalizedOptions.outputDir },
      { key: 'template-arb-file', value: normalizedOptions.templateArbFile },
      {
        key: 'untranslated-messages-lile',
        value: normalizedOptions.untranslatedMessagesFile,
      },
      { key: 'output-class', value: normalizedOptions.outputClass },
      ...(normalizedOptions.preferredSupportedLocales?.map((value) => ({
        key: 'preferred-supported-locales',
        value: value,
      })) ?? []),
      { key: 'header', value: normalizedOptions.header },
      { key: 'header-file', value: normalizedOptions.headerFile },
      {
        key: 'gen-inputs-and-outputs-list',
        value: normalizedOptions.genInputsAndOutputsList,
      },
      { key: 'project-dir', value: normalizedOptions.projectDir },
    ],
    boolean: [
      { key: 'verbose', value: normalizedOptions.verbose },
      {
        key: 'use-deferred-loading',
        value: normalizedOptions.useDeferredLoading,
      },
      { key: 'synthetic-package', value: normalizedOptions.syntheticPackage },
      {
        key: 'required-resource-attributes',
        value: normalizedOptions.requiredResourceAttributes,
      },
      { key: 'nullable-getter', value: normalizedOptions.nullableGetter },
      { key: 'format', value: normalizedOptions.format },
      { key: 'use-escaping', value: normalizedOptions.useEscaping },
      { key: 'suppress-warnings', value: normalizedOptions.suppressWarnings },
    ],
    positional: [],
  });
}
