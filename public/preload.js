const fs = require('fs');
const {Docker} = require('node-docker-api');

global.fs = fs;
global.process = JSON.parse(JSON.stringify(process));
global.docker = new Docker({ socketPath: '/var/run/docker.sock' });
