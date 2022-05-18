# <Project Name Goes Here>

## Setup

For setting up the Dart SDK and Flutter, see the [official documentation](https://flutter.io/)

Log in to the project firebase console and download the firebase config files for Android and iOS. Put the two files here:

```
android/app/google-services.json
ios/Runner/GoogleService-Info.plist
```

To set up release builds:

1. find the project.keystore file and the password from the password vault
2. place the file in android/app/key.jks
3. set the key configuration, copying the store and key passwords from 1P

```
cp android/key.example android/key.properties
edit android/key.properties
```

## Test

To run all unit and widget tests:

```
flutter test test/
```


## Workflow and convensions

We follow a classic git flow for this project:
![Git Flow][1]

And the [conventional commit v1.0.0][2] standard for commit messages.


## Release

Update the release version number in pubspec.yaml, for example:

```
version: 0.2.2+5
```

### Google Play Store

```
flutter build appbundle
```

Upload the aab to the new build in Google Play Console

### Apple TestFlight

Run flutter build:

```
flutter build ios
```

Use Xcode to make an archive of the build and upload it to Appstore Connect:

```
open ios/Runner.xcworkspace
```

1. In Project settings > General > Signing make sure "<partner account>" is selected
2. Select Generic ios Device from Product > Destination
3. select Product > Archive
4. Use the Xcode publish wizard to validate and upload the build to Testflight

### App localisation



[1]: https://res.cloudinary.com/kiekies/image/upload/v1652880941/gugo2gvwuoumdxdbmino.png
[2]: https://www.conventionalcommits.org/en/v1.0.0/

