# <Project Name Goes Here>

## Setup

For setting up the Dart SDK and Flutter, see the
[official documentation](https://flutter.io/)

To set up Firebase, run the following:

```
flutterfire configure
```

Or log in to the project firebase console and download the firebase config files for
Android and iOS. Put the two files here:

```
android/app/google-services.json
ios/Runner/GoogleService-Info.plist
```

## Test

To run all unit and widget tests:

```
flutter test test/
```

## Workflow and conventions

- We follow a [classic git flow][1] for this project
- Use [conventional commit v1.0.0][2] standard for commit messages
- The app source code is in the lib folder and organised by feature. That means where
  possible the root folders are feature folders that holds the models, managers and
  widgets needed for that feature except for the `shared` folder.
- Models, services, widgets and utilities that are used all across the app are located in
  the `shared` folder.
- The app is crafted along an MVVM architecture:
- `M`: models and services do not depend on any other part of the app. A service can
  reference models and other services, but not cyclical. Services are registered in the
  central `service_locator.dart` and have a `_service` filename suffix.
- `V`: page and component widgets are driven by view managers and can also depend directly
  on models and services. Page widgets have a `_screen` filename suffix.
- `VM`: view managers are the glue between the view and the base model/service layer. They
  can depend on the `M` layer, but not the `V` layer. Managers are responsible for
  updating the view and reacting to user input and other events. As a class they typically
  extend a ChangeNotifier or have ValueNotifier properties. They are registered in the
  service locator as a lazy loading singleton and have a `_manager` filename suffix.
- To help avoid cyclical dependencies, a service dependency hierarchy is maintained in the
  service locator where the registration order is determined.

## Release

Update the release version number in pubspec.yaml, for example:

```
version: 0.2.2+5
```

Update the changelog with:

```
npx standard-version -- --release-as 8.4.5
```

The version should be tagged and shared as soon as a build is submitted for public
release.

### App localisation

To add a new language, say Spanish:

1. add a translation file called `lib/src/localization/app_es.arb`
2. add the language to the `supportedLocales` list in `lib/src/app.dart`

Every time you build your app, an up-to-date app_localizations.dart file is generated in
the untracked `.dart_tool/flutter_gen/gen_l10n` folder so that the new strings and
functions become available on the build context for you to reference.

The widely used "Application Resource Bundles" format is basically just json with some
standard conventions to add meta-data to translation phrases. For example, a phrase that
takes a parameter could be specified as follows:

```
{
    "greeting": "Morning {name}!",
    "@greeting": {
        "description": "Greet the user by their name.",
        "placeholders": {
            "name": {
                "type": "String",
                "example": "Jane"
            }
        }
    }
}
```

For more detail on formatting localized dates, numbers and plurals see [the docs][3]

[1]: https://res.cloudinary.com/kiekies/image/upload/v1652880941/gugo2gvwuoumdxdbmino.png
[2]: https://www.conventionalcommits.org/en/v1.0.0/
[3]: https://ishort.ink/owwv
