deploy_timestamp=$(date +'%s')
deploy_date=$(date +'%d.%m.%Y')
heroku config:set DEPLOY_TIMESTAMP=${deploy_timestamp} DEPLOY_DATE=${deploy_date} --app voice-tracker
heroku git:remote --app voice-tracker
git push heroku master
$SHELL