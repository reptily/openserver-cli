<template>
    <div class="app д">
        <div class="icon">
            <img src="../assets/img/container/php.png">
        </div>
        <div class="icon">
            <img src="../assets/img/container/nginx.png">
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

<style scoped>
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
