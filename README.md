# voice tracker discord bot
A Discord Voice Tracker Bot made with discord.js

### Setup

2. Replace the token property in config.json with the current bot token from `https://discord.com/developers/applications`

3. Fill the rest of config.json

### Run the app

- for local development: `npm start`

### Deploy the app

- Run `npm run deploy`

### Create discord bot in 26 easy steps

- create repo
- set repo to private
- git clone {link-to-repo}
- npm init
- npm install typescript
- npm install {plugins}
- configure entrypoint and scripts in package.json
- add Procfile
- add config.json
- add .gitignore
- add tsconfig and tslint (?)
- add general structure
- write bot
- go to https://discord.com/developers/applications
- new application
- create bot application
- copy token, add it to config.file
- copy client id
- go to https://discord.com/oauth2/authorize?client_id={client-id}&scope=bot to add bot to server
- in heroku new app
- add postgres hobby plugin
- in project folder: heroku git:remote -a {name-of-app}
- git add .
- git commit -m "{message}"
- git push (for repo)
- git push heroku master (to deploy)
- in heroku: change dyno from web to worker in resources