# Flutter starter
 
Start building Flutter applications in minutes. This starter pack is a set of opinionated stack and design patterns.

## Stack

- VS Code
- Flutter
- Bloc
- Firebase
- Supabase

## Features

This package includes default app scafolding with a features oriented architecture and some common app features such as :

- Internationalization management
- Opinionated state management using BloC
- Local storage
- Theming
  - Light / Dark theme management
  - Custom color scheme
- Routing
  - Authentication guard
- Firebase integration
  - Analytics
  - Crashalytics
- Supabase integration
  - Authentication
  - Database
  - Storage
- Features
  - Authentication
  - User profile
  - Organization management
  - User preferences
- [VSCode project configuration](apps/example/.vscode/)

## Getting started

- Create a new flutter project

  ```bash
  $ flutter create --org com.example my_app
  ```

- Ensure Android package name and iOS / macOS bundle ID are correct

- Add dependencies

  ```bash
  # App dependencies
  $ flutter pub add intl flutter_bloc firebase_core flutter_starter

  # Development dependencies
  $ flutter pub add --dev flutter_launcher_icons
  ```

- Configure Firebase

  ```bash
  $ flutterfire configure
  ```

- Put the app icon at [assets/icon.png](apps/example/assets/icon.png) and add `flutter_icons` configuration to the app's `pubspec.yaml` file

  ```yaml
  flutter_icons:
    ios: true
    android: "launcher_icon"
    image_path: "assets/icon.png"
    min_sdk_android: 21
    web:
      generate: true
      image_path: "assets/icon.png"
      background_color: "#FFFFFF" # TODO
      theme_color: "#FFFFFF" # TODO
    windows:
      generate: true
      image_path: "assets/icon.png"
      icon_size: 48
  ```

  - Build platforms launcher icons

  ```shell
  flutter pub run flutter_launcher_icons:main
  ```

- Set up internationalization generation tool by creating [l10n.yaml](apps/example/l10n.yaml) file

  ```yaml
  arb-dir: lib/l10n
  template-arb-file: app_en.arb
  output-localization-file: app_localizations.dart
  output-class: AppLocalizations
  nullable-getter: false
  ```

- Set up localized messages by creating [lib/l10n](apps/example/lib/l10n/) folder with [app_en.arb](apps/example/lib/l10n/app_en.arb) and [app_fr.arb](apps/example/lib/l10n/app_fr.arb) files with the `appTitle` key for example :

  ```arb
  {
    "@@locale": "en",
    "appTitle": "ARKOD Flutter app"
  }
  ```

  ```arb
  {
    "@@locale": "fr",
    "appTitle": "ARKOD Flutter app"
  }
  ```

- Enable code generation in [pubspec.yaml](apps/example/pubspec.yaml)

  ```yaml
  ...
  flutter:
    ...
    generate: true
    ...
  ...
  ```

- Create [configuration.dart](apps/example/lib/configuration.dart) file

- Create the app theme using [Material Theme Builder](https://m3.material.io/theme-builder#/custom)

  - Export as Flutter (Dart)
  - Unzip downloaded archive
  - Copy the `color_schemes.g.dart` file as `theme.dart` in the projec's root.
  - Add `lightColorScheme` and `darkColorScheme` properties to your theme config in [configuration.dart](apps/example/lib/configuration.dart) file

- Set up [main.dart](apps/example/lib/main.dart) file
