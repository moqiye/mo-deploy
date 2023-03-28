#!/usr/bin/env node

import minimist from 'minimist'
import service from '../lib/service.mjs'

console.log('minimist ', minimist);
console.log('Service ', service);




// const rawArgv = process.argv.slice(2)
// const args = minimist(rawArgv)
// const command = args._[0]

// service.init();
// service.run(command, args, rawArgv);
