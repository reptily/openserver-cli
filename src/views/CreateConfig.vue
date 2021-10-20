<template>
    <div>
        <img src="../assets/img/logo_start.jpeg">
        <h1>Начнем!</h1>
        Для старта нужно определить имя docker сети.<br>
        <div class="label input">Имя сети:</div><input type="text" v-model="name_networks">
        <button @click="createYaml">Создать конфигурацию</button>
    </div>
</template>

<script>
    import YAML from 'yaml';

    export default {

        data() {
            return {
                name_networks: "openweb",
            };
        },

        computed: {
            createNetwork() {
                return this.name_networks.trim();
            },
        },

        methods: {
            createYaml: function () {

                if (this.createNetwork.length <= 0) {
                    alert('Имя сети не может быть пустым');
                    return;
                }

                let tpl = {
                    'version': '3',
                    'services': null,
                    'networks': {},
                    'volumes': {
                        'dbdata': {
                            'driver': 'local'
                        }
                    }
                };

                tpl['networks'][this.createNetwork] = {
                    'driver': 'bridge',
                };

                global.fs.writeFile(global.process.env.PWD + "/../docker-compose.yml", YAML.stringify(tpl), (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    this.$router.push("/");
                });
            },

        }
    }
</script>
