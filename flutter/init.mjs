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
    '.github/workflows',
];

const templates = [
    'README.md',
    'flutter_launcher_icons.yaml',
    '_meta/.gitignore',
    'lib/styles.dart',
    'lib/extensions.dart',
    '.github/workflows/test.yml',
    'l10n.yaml',
    'lib/l10n/app_en.arb',
    'lib/main.dart',
    'lib/screens/home_screen.dart',
    'pubspec.yaml',
];

const packages = [
    'firebase_analytics|analytics',
    'firebase_crashlytics|crash reporting',
    'provider|shared state management',
    'flutter_svg|SVG assets',
    'collection|enum helpers',
    'http|api calls',
    'url_launcher|launching links',
    'shared_preferences|key-value store',
];

const devPackages = [
    'flutter_launcher_icons',
];

const templatePath = 'https://raw.githubusercontent.com/OneSheep/scaffolding/add-localization/flutter'

let collectedPackages = [];

const run = async () => {
    $.verbose = false
    console.log(chalk.black.bgGreenBright.bold('\n  New Flutter app!  \n'))

    await createApp();

    await makeFolders();

    console.log(`Fetching templates ...`)
    await fetchTemplates();

    console.log(`Installing dev packages ...`)
    await installDevPackages();

    await installPackages();

    console.log(chalk.green(`\nReady!`))
}

const collectPackages = async () => {
    let isDone = false;

    while (!isDone) {
        let choice = await pickPackage();
        if (!choice) {
            isDone = true;
            return;
        }
        collectPackage(choice);
    }
}

const collectPackage = (packageName) => {
    if (collectedPackages.indexOf(packageName) > -1) {
        return;
    }
    collectedPackages.push(packageName);

    const needsFirebaseCore = packageName.startsWith('firebase_');
    if (!needsFirebaseCore) return;
    if (collectedPackages.indexOf('firebase_core') > -1) return;

    collectedPackages.push('firebase_core');
}

const pickPackage = async () => {
    console.log('\n');
    for (let index = 0; index < packages.length; index++) {
        let [pName, pReason] = packages[index].split('|');
        console.log(chalk`${index}. {bold ${pName}} for ${pReason}`);
    }
    console.log('\n');
    if (collectedPackages.length > 0) {
        console.log('Selected: ', collectedPackages);
        console.log('\n');
    }
    let choice = await question(chalk`Choose a number for a package to add or {bold Enter} to continue: `);
    if (!choice || isNaN(choice)) return null;
    choice = Number(choice);
    if (choice < 0 || choice >= packages.length) {
        return null;
    }

    return packages[choice].split('|')[0];
}

const createApp = async () => {
    let appName = await question('Right, what shall we call it? ');
    const defaultBundleId = `org.onesheep.${appName}`;
    let org = await question(`Enter reverse domain for bundle id. [${defaultBundleId}]: `);
    console.log('What packages will the app need?');

    await collectPackages();

    if (org == '') org = defaultBundleId;

    let path = (await $`pwd`).stdout.split('\n')[0];

    // await $`mkdir ${appName}`
    console.log(`\nCreating app in ${path}/${appName} ...`);
    await $`flutter create --org ${org} ${appName}`;

    cd(`${path}/${appName}`);
}

const makeFolders = async () => {
    for (const folder of rootFolders) {
        await $`mkdir -p ${folder}`
    }
}

const installPackages = async () => {
    for (const p of collectedPackages) {
        await $`flutter pub add ${p}`;
    }
}

const installDevPackages = async () => {
    for (const dev of devPackages) {
        await $`flutter pub add --dev ${dev}`
    }
}

const fetchTemplates = async () => {
    for (const template of templates) {
        await $`curl -fsSL ${templatePath}/${template} > ${template}`
    }
}

await run();

