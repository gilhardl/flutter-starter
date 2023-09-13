import { FlutterPlatform, AndroidLanguage, IosLanguage } from '../../types';
import { FlutterProjectGeneratorOptions } from '../../lib/models/flutter-project-generator-options.model';

export interface FlutterAppGeneratorOptions
  extends FlutterProjectGeneratorOptions {
  empty: boolean;
  platforms: FlutterPlatform[];
  androidLanguage: AndroidLanguage;
  iosLanguage: IosLanguage;
}
