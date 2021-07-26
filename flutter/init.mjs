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
    'analysis_options.yaml',  // remove after flutter 2.3
    'flutter_launcher_icons.yaml',
    '_meta/.gitignore',
    'lib/styles.dart',
    'lib/extensions.dart',
    '.github/workflows/test.yml',
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
    'flutter_lints',
    'flutter_launcher_icons',
];

const templatePath = 'https://raw.githubusercontent.com/OneSheep/scaffolding/main/flutter'

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

const createApp = async () => {
    let appName = await question('Right, what shall we call it? ');
    const defaultBundleId = `com.example.${appName}`;
    let org = await question(`Enter reverse domain for bundle id. [${defaultBundleId}]: `);

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
    let isFirebaseCoreInstalled = false;

    for (const pub of packages) {
        let [pName, pReason] = pub.split('|');
        let yes = await question(chalk`Use {bold ${pName}} for ${pReason}? [yes] `)
        if (['yes', 'YES', 'Y', 'y'].includes(yes || 'yes')) {
            const needsFirebaseCore = pName.startsWith('firebase_');
            if (needsFirebaseCore && !isFirebaseCoreInstalled) {
                await $`flutter pub add firebase_core`;
                isFirebaseCoreInstalled = true;
            }
            await $`flutter pub add ${pName}`;
        }
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

