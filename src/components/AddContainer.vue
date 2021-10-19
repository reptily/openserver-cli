<template>
    <div>
        <select v-model="state_container" @change="emitChange">
            <option v-for="(module, i) in modules" :key="i" :value="module">{{ module.title }}</option>
        </select>
    </div>
</template>

<script>
    import nginx from "../containers/nginx";

    export default {
        props: [
            'container',
        ],

        data() {
            return {
                state_container: this.container,
                modules: [
                    {
                        title: 'Nginx',
                        service_name: 'webserver',
                        config: nginx,
                    },
                ],
            };
        },

        methods: {
            emitChange() {
                this.$emit('container', this.state_container);
            },
        }
    }
</script>

<style>

</style>