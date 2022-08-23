#!/usr/bin/env zx

const rootFolders = [
    '_meta',
    'assets/fonts',
    'assets/images',
    'assets/icons',
    '.github/workflows',
    'lib/src/shared/services',
    'lib/src/localization',
    'lib/src/navigation',
    'lib/src/settings',
    'test/doubles',
];

const templates = [
    'README.md',
    'analysis_options.yaml',
    '.versionrc',
    'flutter_launcher_icons.yaml',
    'l10n.yaml',
    '.github/workflows/test.yml',
    '_meta/.gitignore',
    'test/store_test.dart',
    'test/doubles/store_double.dart',
    'lib/main.dart',
    'lib/src/app.dart',
    'lib/src/localization/app_en.arb',
    'lib/src/navigation/root_screen.dart',
    'lib/src/settings/settings_manager.dart',
    'lib/src/settings/settings_screen.dart',
    'lib/src/settings/settings_service.dart',
    'lib/src/shared/styles.dart',
    'lib/src/shared/extensions.dart',
    'lib/src/shared/routes.dart',
    'lib/src/shared/services/analytics_service.dart',
    'lib/src/shared/services/crashlytics_service.dart',
    'lib/src/shared/services/service_locator.dart',
    'lib/src/shared/services/store_service.dart',
];

const packages = [
    'firebase_core',
    'firebase_analytics',
    'firebase_crashlytics',
    'get_it',
    'get_it_mixin',
    'go_router',
    'hive',
    'hive_flutter',
    'intl',
];

const recommendedPackages = [
    'flutter_svg|SVG assets',
    'http|api calls',
    'url_launcher|launching links',
];

const devPackages = ['flutter_launcher_icons'];

// Inserts into the pubspec.yaml file
// the value gets inserted just after the line identified by the key
const specTweaks = {
    'dependencies:': '  flutter_localizations:\n    sdk: flutter\n',
    '  uses-material-design: true': '\n  generate: true\n\n  assets:\n    - assets/images/\n',
};

const flutterPlatforms = ['ios', 'android', 'web', 'linux', 'macos', 'windows'];

const templatePath =
    'https://raw.githubusercontent.com/OneSheep/scaffolding/main/flutter';

let collectedPackages = [];
let collectedPlatforms = [];

const run = async () => {
    $.verbose = false;
    console.log(chalk.black.bgGreenBright.bold('\n  New Flutter app! 🕶  \n'));

    await createApp();

    await makeFolders();

    console.log(`Installing dev packages ...`);
    await installDevPackages();

    await installPackages();

    console.log(`Fetching templates ...`);
    await fetchTemplates();
    // await copyTemplates();  // testing locally

    console.log(`Tweaking templates ...`);
    await tweakTemplates();

    console.log(chalk`To set up firebase, run: {bold flutterfire configure}`);

    console.log(chalk.green(`\nReady!  🚀 `));
};

const tweakTemplates = async () => {
    for (const [key, value] of Object.entries(specTweaks)) {
        const cmd = `/^${key}\n/ and $_.="${value}"`;
        await $`perl -pi -e ${cmd} pubspec.yaml`;
    }
};

const collectPlatforms = async () => {
    let isDone = false;

    while (!isDone) {
        let choice = await pickPlatform();
        if (!choice) {
            isDone = true;
            return;
        }
        if (collectedPlatforms.indexOf(choice) > -1) {
            continue;
        }
        collectedPlatforms.push(choice);
    }

    if (collectedPlatforms.length == 0) {
        collectedPlatforms.push('android');
    }
};

const collectPackages = async () => {
    let isDone = false;

    while (!isDone) {
        let choice = await pickPackage();
        if (!choice) {
            isDone = true;
            return;
        }

        if (collectedPackages.indexOf(choice) > -1) {
            continue;
        }
        collectedPackages.push(choice);
    }

};


const pickPackage = async () => {
    console.log('\n');
    for (let index = 0; index < recommendedPackages.length; index++) {
        let [pName, pReason] = recommendedPackages[index].split('|');
        console.log(chalk`${index}. {bold ${pName}} for ${pReason}`);
    }
    console.log('\n');
    if (collectedPackages.length > 0) {
        console.log('Selected: ', collectedPackages);
        console.log('\n');
    }
    let choice = await question(
        chalk`Choose a number for a package to add or {bold Enter} to continue: `,
    );
    if (!choice || isNaN(choice)) return null;
    choice = Number(choice);
    if (choice < 0 || choice >= recommendedPackages.length) {
        return null;
    }

    return recommendedPackages[choice].split('|')[0];
};


const pickPlatform = async () => {
    console.log('\n');
    for (let index = 0; index < flutterPlatforms.length; index++) {
        console.log(chalk`${index}. ${flutterPlatforms[index]}`);
    }
    console.log('\n');
    if (collectedPlatforms.length > 0) {
        console.log('Selected: ', collectedPlatforms);
        console.log('\n');
    }
    let choice = await question(
        chalk`Choose a number for a platform to add or {bold Enter} to continue: `,
    );
    if (!choice || isNaN(choice)) return null;
    choice = Number(choice);
    if (choice < 0 || choice >= flutterPlatforms.length) {
        return null;
    }

    return flutterPlatforms[choice];
};

const createApp = async () => {
    let appName = await question('Right, what shall we call it? Enter a valid package name like the_verge: ');
    const defaultBundleId = `org.onesheep.${appName}`;
    let org = await question(`Enter reverse domain for bundle id. [${defaultBundleId}]: `);

    console.log('What platforms are we targeting?');
    await collectPlatforms();

    console.log('What packages will the app need?');
    await collectPackages();

    if (org == '') org = defaultBundleId;

    let path = (await $`pwd`).stdout.split('\n')[0];

    // await $`mkdir ${appName}`
    console.log(`\nCreating app in ${path}/${appName} ...`);
    const platforms = collectedPlatforms.join(',');
    // flutter create--org org.onesheep.test - t app--platforms ios, android mini
    await $`flutter create --org ${org} -t app --platforms ${platforms} ${appName}`;

    cd(`${path}/${appName}`);
};

const makeFolders = async () => {
    for (const folder of rootFolders) {
        await $`mkdir -p ${folder}`;
    }
};

const installPackages = async () => {
    for (const p of packages) {
        await $`flutter pub add ${p}`;
    }

    for (const p of collectedPackages) {
        await $`flutter pub add ${p}`;
    }
};

const installDevPackages = async () => {
    for (const dev of devPackages) {
        await $`flutter pub add --dev ${dev}`;
    }
};

const fetchTemplates = async () => {
    for (const template of templates) {
        await $`curl -fsSL ${templatePath}/${template} > ${template}`;
    }
};

const copyTemplates = async () => {
    const devPath = '/Users/jannie/Code/scaffolding/flutter';
    for (const template of templates) {
        // console.log(`cp ${devPath}/${template} ./${template}`);
        await $`cp ${devPath}/${template} ./${template}`;
    }
};

await run();
