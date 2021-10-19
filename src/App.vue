<template>
    <router-view/>
</template>

<script>
    export default {
        name: 'App',
        components: {},
        mounted() {
            global.fs.readFile(global.process.env.PWD + '/../docker-compose.yml', 'utf8', (err) => {
                if (err) {
                    this.$router.push("/create_config");
                }
            });
        }
    }
</script>

<style>
    body {
        background: #EEEEEE;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #003e00;
        margin-top: 60px;
    }

    .plus {
        font-size: 260px;
        font-weight: bold;
        margin: 0px 30px 0px 10px;
    }
</style>
