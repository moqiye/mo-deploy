#!/usr/bin/env node

import Service from '../lib/service';
import minimist from 'minimist';

const service = new Service()
const rawArgv = process.argv.slice(2);

const args = minimist(rawArgv);
const command = args._[0]

service.run(command, args, rawArgv);
