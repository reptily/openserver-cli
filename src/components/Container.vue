<template>
    <div>
        image: <input :value="image"><br>
        container name: {{ container_name }} <br>
        <div v-for="(port, i) in ports" :key="i">
            port: <input :value="port[0]"><input :value="port[1]">
        </div>
        <div v-for="(volume, i) in volumes" :key="i">
            volume: <input :value="volume[0]"><input :value="volume[1]">
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'container',
        ],

        data() {
            return {
                $container: this.container,
                image: null,
                container_name: null,
                ports: [],
                volumes: [],
            }
        },

        created() {
            this.image = this.container.image;
            this.container_name = this.container?.environment?.SERVICE_NAME;

            this.container.ports.forEach((port) => {
                this.ports.push(port.split(":"));
            });

            this.container.volumes.forEach((volume) => {
                this.volumes.push(volume.split(":"));
            });
        },

    }
</script>