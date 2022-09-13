# Maddin's-Discord-Bot

- rename ".env.template" to ".env" and fill the variables
- make sure to have a postgres server running

# Docker Compose File

```
version: "3"

services:
  discord-bot:
    container_name: discord-bot
    build: .
    restart: unless-stopped
    env_file:
      - .env
# add the below part only, if postgres is started from a different docker-compose.yml (https://stackoverflow.com/a/38089080/13045488)
    networks:
     - postgres

networks:
  postgres:
    external:
      name: postgres-network
```