import { FlutterBuildMode } from '../../types';
import { FlutterExecutorOptionsNormalized } from './flutter-executor-options.model';

/**
 * Normalized options passed to the `flutter install` command.
 */
export interface FlutterInstallExecutorOptionsNormalized
  extends FlutterExecutorOptionsNormalized {
  /**
   * Target device id or name (prefixes allowed).
   */
  deviceId: string | null;

  /**
   * Application build mode.
   */
  mode: FlutterBuildMode | null;

  /**
   * Specify a pre-built application binary to use when running. For Android applications, this must be the path to an APK. For iOS applications, the path to an IPA.\nOther device types do not yet support prebuilt application binaries.
   */
  useApplicationBinary: string | null;

  /**
   * Time in seconds to wait for devices to attach. Longer timeouts may be necessary for networked devices.
   */
  deviceTimeout: number | null;

  /**
   * Identifier number for a user or work profile on Android only. Run \"adb shell pm list users\" for available identifiers.
   */
  deviceUser: string | null;

  /**
   * Build a custom app flavor as defined by platform-specific build setup.\nSupports the use of product flavors in Android Gradle scripts, and the use of custom Xcode schemes.
   */
  flavor: string | null;

  /**
   * Uninstall the app if already on the device. Skip install.
   */
  uninstallOnly: boolean | null;
}
