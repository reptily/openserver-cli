<template>
    <div>
        <AddContainer v-on:container="addContainerHandler"/>
        <button @click="addContainer()">Добавить контейнер</button>
        <div v-if="docker_composer.services !== null">
            <div v-for="(service, name) in docker_composer.services" :key="name" class="container" @click="selectContainer(name)">
                {{ service?.environment?.SERVICE_NAME }}
            </div>
        </div>
        <div v-if="container !== null">
            <Container :container="container"/>
        </div>
    </div>
</template>

<script>
    import YAML from 'yaml';

    import AddContainer from "../components/AddContainer.vue";
    import Container from "../components/Container.vue";

    export default {
        data() {
            return {
                docker_composer: {
                    services: null,
                },
                add_container: null,
                container: null,
            };
        },

        components: {
            AddContainer,
            Container,
        },

        computed: {

        },

        mounted() {
            global.fs.readFile(global.process.env.PWD + '/../docker-compose.yml', 'utf8', (err, data) => {
                if (err) {
                    this.$router.push("/create_config");
                }
                this.docker_composer = this.getJson(data);
                this.Init();
            });
        },

        methods: {
            Init() {
                console.log(this.docker_composer)
            },

            getYaml(json) {
                return YAML.stringify(json);
            },

            getJson(yaml) {
                return YAML.parse(yaml);
            },

            addContainer() {
                if (this.docker_composer.services === null) {
                    this.docker_composer.services = {};
                }

                let new_container = {};
                new_container[this.add_container.service_name] = this.add_container.config;
                this.docker_composer.services = Object.assign(this.docker_composer.services, new_container);

                global.fs.writeFile(global.process.env.PWD + "/../docker-compose.yml", YAML.stringify(this.docker_composer), (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
            },

            addContainerHandler(config) {
                this.add_container = config;
            },

            selectContainer(name) {
                this.container = this.docker_composer.services[name];
            }
        }
    };
</script>

<style>
    .container {
        padding: 10px;
        margin: 10px;
        border: 1px solid #003e00;
        background: powderblue;
        cursor: pointer;
    }
</style>