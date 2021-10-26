<template>
    <div class="app">
        <div class="icon">
            <img src="../assets/img/back.png" @click="$router.push('/')">
        </div>
        <div class="icon" v-for="(module, i) in modules" :key="i" @click="$router.push('/add_container/' + module.service_name)">
            <img :src="module.icon">
        </div>
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
                        icon: require('../assets/img/container/nginx.png'),
                        service_name: 'nginx',
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

<style scoped>
    .app {
        display: flex;
        flex-direction: row;
    }

    .icon {
        width: 84px;
        height: 74px;
        border-radius: 10px;
        text-align: center;
        padding-top: 10px;
        background: #DFDEDE;
        box-shadow:  0 5px 5px rgba(0, 0, 0, 0.2);
        margin: 10px;
        cursor: pointer;
    }
</style>
