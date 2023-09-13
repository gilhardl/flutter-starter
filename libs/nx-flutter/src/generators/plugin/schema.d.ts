import { FlutterProjectGeneratorOptions } from '../../lib/models/flutter-project-generator-options.model';

export interface FlutterPluginGeneratorOptions
  extends FlutterProjectGeneratorOptions {
  platforms: FlutterPlatform[];
  androidLanguage: AndroidLanguage;
  iosLanguage: IosLanguage;
}
