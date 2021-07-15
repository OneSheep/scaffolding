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
    'README.md',
    'analysis_options.yaml',  // remove after flutter 2.3
    'flutter_launcher_icons.yaml',
    '_meta/.gitignore',
    'lib/styles.dart',
    'lib/extensions.dart',
]

const packages = [
    'firebase_analytics|analytics',
    'firebase_crashlytics|crash reporting',
    'provider|shared state management',
    'flutter_svg|SVG assets',
    'collection|enum helpers',
    'http|api calls',
    'url_launcher|launching links',
    'shared_preferences|key-value store',
]

const devPackages = [
    'flutter_lints',
    'flutter_launcher_icons',
]

const templatePath = 'https://raw.githubusercontent.com/OneSheep/scaffolding/main/flutter'

$.verbose = false
console.log(chalk.black.bgGreenBright.bold('\n  New Flutter app!  \n'))
let appName = await question('Right, what shall we call it? ')
let path = (await $`pwd`).stdout.split('\n')[0]

// await $`mkdir ${appName}`
console.log(`\nCreating app in ${path}/${appName} ...`)

await $`flutter create ${appName}`
cd(`${path}/${appName}`)


for (const folder of rootFolders) {
    await $`mkdir -p ${folder}`
}

console.log(`Fetching templates ...`)

for (const template of templates) {
    await $`curl -fsSL ${templatePath}/${template} > ${template}`
}

console.log(`Installing dev packages ...`)

for (const dev of devPackages) {
    await $`flutter pub add --dev ${dev}`
}

for (const pub of packages) {
    let [pName, pReason] = pub.split('|');
    let yes = await question(chalk`Use {bold ${pName}} for ${pReason}? [yes] `)
    if (['yes', 'YES', 'Y', 'y'].includes(yes || 'yes')) {
        await $`flutter pub add ${pName}`
    }
}

console.log(chalk.green(`\nReady!`))

