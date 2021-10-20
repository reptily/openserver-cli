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
    @font-face {
        font-family: 'PT Sans';
        src: url('./assets/fonts/ptsans.ttf');
        src:
                url('./assets/fonts/ptsans.woff') format('woff'),
                url('./assets/fonts/ptsans.ttf') format('truetype'),
                url('./assets/fonts/ptsans.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }

    body {
        background: #FFF;
        line-height: 1.5;
        font-family: 'PT Sans', serif;
        font-size: 18px;
    }

    select {
        padding: 5px 10px;
        margin: 2px;
        min-width: 300px;
    }

    button {
        height: 36px;
        min-width: 64px;
        padding: 0 16px;
        background-color: #FB8C00;
        border-radius: 5px;
        border: 1px solid #FC8D00;
        box-shadow: 0 3px 1px -2px rgba(0,0,0,0.2),
            0 2px 2px 0 rgba(0,0,0,0.14),
            0 1px 5px 0 rgba(0,0,0,0.12);
        color: #FFF;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        margin: 0px 5px;
    }

    input[type=text] {
        height: 36px;
        min-width: 64px;
        padding: 0 16px;
        border-radius: 5px;
        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
                    0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12);
        border: 1px solid #FC8D00;
        margin: 0 5px;
        font-size: 18px;
    }

    .label.input {
        display: inline-flex;
        background-color: #FB8C00;
        border-radius: 5px 0 0 5px;
        height: 32px;
        padding: 6px 12px 0;
        margin: 0 -10px 0 0;
        color: #FFF;
        font-size: 18px;
        font-weight: bold;
        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
                    0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12);
    }

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #303030;
        margin-top: 60px;
    }

    .plus {
        font-size: 260px;
        font-weight: bold;
        margin: 0px 30px 0px 10px;
    }
</style>
