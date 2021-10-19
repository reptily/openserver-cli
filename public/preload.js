let fs = require('fs');

global.fs = fs;
global.process = JSON.parse(JSON.stringify(process));
