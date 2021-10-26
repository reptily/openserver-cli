<template>
    <div class="app">
<!--        <AddContainer v-on:container="addContainerHandler"/>-->
<!--        <button @click="addContainer()">Добавить контейнер</button>-->
<!--        <div v-if="docker_composer.services !== null">-->
<!--            <div v-for="(service, name) in docker_composer.services" :key="name" class="container" @click="selectContainer(name)">-->
<!--                {{ service?.environment?.SERVICE_NAME }}-->
<!--            </div>-->
<!--        </div>-->
        <div v-if="container !== null">
            <Container :container="container"/>
        </div>

        <div class="panel">
            <div @click="$router.push('/list_container')">
                <div class="icon add"></div>
                <div class="title">Добавить контейнер</div>
            </div>
        </div>
        <div class="body">
            <div class="error" v-if="error.connect_socket">
                Ошибка подключение к демону
            </div>
            <div class="dashboard_container" v-for="(container, i) in containers" :key="i">
                <div class="icon">
                    <img src="../assets/img/container/php.png">
                </div>
                <div class="desc">
                    <div>
                        <span :class="container.data.State === 'running' ? 'online' : 'offline'"></span>
                        <span style="margin-left: 5px; font-weight: bold; color: #173F4F;">{{ container.data.Names[0].replace("/", "") }}</span>
                    </div>
                    <div><b>Статус:</b> {{ container.data.Status }}</div>
                    <div>
                        <b>Ports:</b>
                        <span v-for="(port, p) in container.data.sortPorts" :key="p">
                            <span style="background: #FFF; margin-left: 10px; border-radius: 3px; padding: 0 5px">
                                {{ port }}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import YAML from 'yaml';

    // import AddContainer from "../components/AddContainer.vue";
    import Container from "../components/Container.vue";

    export default {
        data() {
            return {
                docker_composer: {
                    services: null,
                },
                add_container: null,
                container: null,
                containers: [],
                error: {
                    connect_socket: false,
                },
            };
        },

        components: {
            // AddContainer,
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
                this.initContainers();
            },

            sortPort() {
                this.containers.forEach((container, i) => {
                    let ports = [];
                    container.data.Ports.forEach((port) => {
                        if (port.IP !== "::" && port.PublicPort !== undefined) {
                            ports.push(port.PublicPort);
                        }
                    });
                    this.containers[i].data.sortPorts = ports.sort();
                });
            },

            initContainers() {
                global.docker.container.list()
                    .then(containers => {
                        this.containers = containers;
                        this.sortPort();
                        this.error.connect_socket = false;
                        setTimeout(() => this.initContainers(), 1000);
                    })
                    .catch(() => {
                        this.error.connect_socket = true;
                        setTimeout(() => this.initContainers(), 1000);
                    });
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

<style scoped>
    .container {
        padding: 10px;
        margin: 10px;
        border: 1px solid #003e00;
        background: powderblue;
        cursor: pointer;
    }

    .error {
        min-height: 100px;
        background: url("../assets/img/error.png") top center no-repeat;
        color: #D00;
        padding-top: 72px;
    }

    .app {
        display: flex;
    }

    .panel {
        width: 600px;
        height: 100%;
        background: #4BB679;;
        display: flex;
        padding: 10px;
        box-shadow: 3px 0 1px -2px rgba(0, 0, 0, 0.2);
    }

    .panel > div {
        box-shadow:  0 5px 5px rgba(0, 0, 0, 0.2);
        background: #DFDEDE;
        height: 64px;
        width: 100%;
        border-radius: 10px;
        text-align: left;
        font-weight: bold;
        color: #173F4F;
        display: inline-flex;
        cursor: pointer;
    }

    .panel .icon {
        width: 64px;
        height: 64px;
        margin-right: 10px;
    }

    .panel .title {
        margin-top: 17px;
    }

    .body {
        display: flex;
        align-content: flex-end;
        padding: 10px;
        flex-direction: column;
        width: 100%;
    }

    .dashboard_container {
        display: flex;
        margin-bottom: 10px;
        width: 100%;
    }

    .dashboard_container > div {
        box-shadow:  0 5px 5px rgba(0, 0, 0, 0.2);
        margin-right: 10px;
        background: #DFDEDE;
    }

    .dashboard_container .icon {
        width: 88px;
        height: 76px;
        border-radius: 10px;
        text-align: center;
        padding-top: 12px;
    }

    .dashboard_container .desc {
        padding: 5px;
        border-radius: 10px;
        width: calc(100% - 94px);
        text-align: left;
    }

    .online {
        background: #0F0;
        width: 5px;
        height: 5px;
        padding-left: 14px;
        font-size: 10px;
        border-radius: 100%;
        position: relative;
        top: -2px;
    }

    .offline {
        background: #F00;
        width: 5px;
        height: 5px;
        padding-left: 14px;
        font-size: 10px;
        border-radius: 100%;
        position: relative;
        top: -2px;
    }

    .icon.add {
        background: url("../assets/img/add.png");
        background-size: 80%;
        background-repeat: no-repeat;
        background-position: 6px 6px;
    }
</style>