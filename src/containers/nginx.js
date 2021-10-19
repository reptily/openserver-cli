export default {
    image: "nginx:alpine",
    container_name: "nginx",
    restart: "unless-stopped",
    tty: "true",
    environment: {
        SERVICE_NAME: "nginx",
    },
    ports: [
        "80:80",
        "433:433",
    ],
    volumes: [
        "./www:/var/www",
        "./config/nginx/:/etc/nginx/conf.d/",
        "./scripts:/bin/app",
    ],
    networks: [
        "openweb-network"
    ]
}