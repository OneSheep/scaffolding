#!/usr/bin/env zx

console.log(chalk.yellow('New Flutter app!'))
let name = await question('What shall we call it? ')
let path = (await $`pwd`).stdout.split('\n')[0]

console.log(`creating app in ${path}/${name}`)
// console.log(`creating app in ${path.stdout[0]}/${name}`)

// await $`flutter create ${name}`