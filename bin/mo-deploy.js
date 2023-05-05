#!/usr/bin/env node

import minimist from 'minimist'
import Service from '../lib/service.js'

const rawArgv = process.argv.slice(2)
const args = minimist(rawArgv)
const command = args._[0]
const service = new Service();
service.run(command, args, rawArgv);
