#!/usr/bin/env zx

const rootFolders = [
    '_meta',
    'lib/services',
    'lib/models',
    'lib/screens',
    'lib/components',
    'assets/animations',
    'assets/fonts',
    'assets/images',
    'assets/icons',
]

const templates = [
    '_meta/.gitignore',
    'lib/styles.dart',
    'lib/extensions.dart',
    'analysis_options.yaml',  // remove after flutter 2.3
    'flutter_launcher_icons.yaml',
    'README.md'
]

const packages = [
    'flutter_svg',
    'firebase_analytics',
    'firebase_crashlytics',
    'provider',
    'collection',
]

const devPackages = [
    'flutter_lints',
    'flutter_launcher_icons',
]

// https://github.com/OneSheep/scaffolding/raw/main/bin/flutter.mjs
const templatePath = 'https://github.com/OneSheep/scaffolding/raw/main'

// flutter pub add --dev flutter_lints

$.verbose = false
console.log(chalk.yellow('\nNew Flutter app!\n------------------------'))
let appName = await question('Right, what shall we call it? ')
let path = (await $`pwd`).stdout.split('\n')[0]

console.log(chalk.green(`\nCreating app in ${path}/${appName}`))

// await $`flutter create ${appName}`
await $`mkdir ${appName}`
cd(`${path}/${appName}`)

rootFolders.forEach(async (folder) => {
    await $`mkdir -p ${folder}`
})

templates.forEach(async (path) => {
    await $`curl -fsSL ${templatePath}/${path} > ${path}`
})


