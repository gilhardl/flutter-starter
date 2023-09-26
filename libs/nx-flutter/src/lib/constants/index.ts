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
  run: {
    verbose: false,
    deviceId: undefined,
    mode: 'debug',
    dartDefine: [] as string[],
    dartDefineFromFile: undefined,
    flavor: false,
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
