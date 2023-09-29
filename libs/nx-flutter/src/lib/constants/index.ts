/**
 * Name of the Nx plugin.
 */
export const NX_FLUTTER = 'nx-flutter';

/**
 * Package name of the Nx plugin.
 */
export const NX_FLUTTER_PKG = '@gilhardl/nx-flutter';

/**
 * Default Flutter CLI arguments for each command.
 */
export const DEFAULT_FLUTTER_CLI_ARGS = {
  create: {
    description: 'A new Flutter application.',
    org: 'com.example',
    platforms: ['android', 'ios', 'linux', 'windows', 'macos', 'web'],
    androidLanguage: 'kotlin',
    iosLanguage: 'swift',
    pub: true,
    offline: false,
    overwrite: false,
    empty: false,
  },
  analyze: {
    verbose: false,
    currentPackage: true,
    watch: false,
    write: undefined,
    suggestions: true,
    pub: true,
    congratulate: true,
    preamble: true,
    fatalInfos: true,
    fatalWarnings: true,
  },
  clean: {
    verbose: false,
  },
  genL10n: {
    verbose: false,
    arbDir: 'lib/l10n',
    outputDir: undefined,
    templateArbFile: 'app_en.arb',
    untranslatedMessagesFile: undefined,
    outputClass: 'AppLocalizations',
    preferredSupportedLocales: [],
    header: undefined,
    headerFile: undefined,
    useDeferredLoading: true,
    genInputsAndOutputsList: undefined,
    syntheticPackage: true,
    projectDir: undefined,
    requiredResourceAttributes: true,
    nullableGetter: true,
    format: true,
    useEscaping: true,
    suppressWarnings: true,
  },
  install: {
    verbose: false,
    deviceId: undefined,
    mode: 'debug',
    useApplicationBinary: undefined,
    flavor: undefined,
    deviceTimeout: 10,
    deviceUser: undefined,
    uninstallOnly: false,
  },
  run: {
    verbose: false,
    deviceId: undefined,
    mode: 'debug',
    dartDefine: [] as string[],
    dartDefineFromFile: undefined,
    flavor: undefined,
    webRenderer: 'auto',
    useApplicationBinary: undefined,
    traceStartup: false,
    cacheStartupProfile: true,
    verboseSystemLogs: false,
    cacheSksl: false,
    dumpSkpOnShaderCompilation: false,
    purgePersistentCache: false,
    route: undefined,
    startPaused: true,
    endlessTraceBuffer: false,
    traceSystrace: false,
    traceSkia: false,
    enableDartProfiling: true,
    enableSoftwareRendering: false,
    skiaDeterministicRendering: false,
    dartEntrypointArgs: [] as string[],
    webLaunchUrl: undefined,
    target: undefined,
    deviceVmservicePort: 0,
    hostVmservicePort: 0,
    pub: true,
    trackWidgetCreation: true,
    nullAssertions: true,
    deviceUser: undefined,
    deviceTimeout: 10,
    ddsPort: 0,
    androidProjectArg: [] as string[],
    multidex: true,
    ignoreDeprecation: false,
    awaitFirstFrameWhenTracing: true,
    useTestFonts: true,
    build: true,
    hot: true,
    pidFile: undefined,
  },
};
