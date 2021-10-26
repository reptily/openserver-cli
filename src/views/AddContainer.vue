<template>
    <div>
        Образ: {{ container.default.image }} <br>
        Порты:
        <div v-for="(port, i) in container.default.ports" :key="i">
            <input v-model="ports[i][0]" @keyup="changePort(i)"> => <input v-model="ports[i][1]" @keyup="changePort(i)">
        </div>
        Директории:
        <div v-for="(volume, i) in container.default.volumes" :key="i">
            <input v-model="volumes[i][0]" @keyup="changeVolume(i)"> => <input v-model="volumes[i][1]" @keyup="changeVolume(i)">
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                container: {
                    default: {
                        image: null,
                        ports: [],
                        volumes: [],
                    },
                },
                ports: [],
                volumes: [],
            }
        },

        mounted() {
            this.container = require("../containers/" + this.$route.params.name);
            this.container.default.ports.forEach( (port, i) => {
                this.ports[i] = port.split(':');
            });
            this.container.default.volumes.forEach( (volume, i) => {
                this.volumes[i] = volume.split(':');
            });
        },

        methods: {

            changePort(index) {
                this.container.default.ports[index] = this.ports[index][0] + ":" + this.ports[index][1];
            },

            changeVolume(index) {
                this.container.default.volumes[index] = this.volumes[index][0] + ":" + this.volumes[index][1];
            },

        },
    }
</script>

<style>

</style>
