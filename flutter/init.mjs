#!/usr/bin/env zx

const rootFolders = [
    '_meta',
    'assets/animations',
    'assets/fonts',
    'assets/images',
    'assets/icons',
    '.github/workflows',
    'lib/src/shared',
];

const templates = [
    'README.md',
    'analysis_options.yaml',
    'flutter_launcher_icons.yaml',
    '_meta/.gitignore',
    'lib/src/shared/styles.dart',
    'lib/src/shared/extensions.dart',
    '.github/workflows/test.yml',
];

const packages = [
    'firebase_analytics|analytics',
    'firebase_crashlytics|crash reporting',
    'get_it|shared state management',
    'flutter_svg|SVG assets',
    'http|api calls',
    'url_launcher|launching links',
    'shared_preferences|key-value store',
];

const devPackages = ['flutter_launcher_icons'];

const templatePath =
    'https://raw.githubusercontent.com/OneSheep/scaffolding/main/flutter';

let collectedPackages = ['collection'];

const run = async () => {
    $.verbose = false;
    console.log(chalk.black.bgGreenBright.bold('\n  New Flutter app! 🕶 \n'));

    await createApp();

    await makeFolders();

    console.log(`Installing dev packages ...`);
    await installDevPackages();

    await installPackages();

    console.log(`Fetching templates ...`);
    await fetchTemplates();
    // await copyTemplates();  // testing locally

    console.log(chalk.green(`\nReady!  🚀 `));
};

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
};

const collectPackage = (packageName) => {
    if (collectedPackages.indexOf(packageName) > -1) {
        return;
    }
    collectedPackages.push(packageName);

    if (packageName == 'get_it') collectedPackages.push('get_it_mixin');

    const needsFirebaseCore = packageName.startsWith('firebase_');
    if (!needsFirebaseCore) return;
    if (collectedPackages.indexOf('firebase_core') > -1) return;

    collectedPackages.push('firebase_core');
};

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
    let choice = await question(
        chalk`Choose a number for a package to add or {bold Enter} to continue: `,
    );
    if (!choice || isNaN(choice)) return null;
    choice = Number(choice);
    if (choice < 0 || choice >= packages.length) {
        return null;
    }

    return packages[choice].split('|')[0];
};

const createApp = async () => {
    let appName = await question('Right, what shall we call it? Enter a valid package name like the_verge: ');
    const defaultBundleId = `org.onesheep.${appName}`;
    let org = await question(`Enter reverse domain for bundle id. [${defaultBundleId}]: `);
    console.log('What packages will the app need?');

    await collectPackages();

    if (org == '') org = defaultBundleId;

    let path = (await $`pwd`).stdout.split('\n')[0];

    // await $`mkdir ${appName}`
    console.log(`\nCreating app in ${path}/${appName} ...`);
    await $`flutter create --org ${org} -t skeleton ${appName}`;

    cd(`${path}/${appName}`);
};

const makeFolders = async () => {
    for (const folder of rootFolders) {
        await $`mkdir -p ${folder}`;
    }
};

const installPackages = async () => {
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
