import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const fs = require('fs');
const {Docker} = require('node-docker-api');

global.fs = fs;
global.process = JSON.parse(JSON.stringify(process));
global.docker = new Docker({ socketPath: '/var/run/docker.sock' });

createApp(App).use(router).mount('#app');
