# Test case for plantix by Babak Zarrinbal

## instructions
### installation
  after cloning the repo or downloading the code 
run bellow commands to install nodejs dependencies on each folder
```
$cd ./front-end && npm ci
$cd ./sensors-api && npm ci
```
### execution
run bellow command to start the backend api service 
```
cd ./sensors-api && npm run start:dev
```

and for front end app run bellow command
for windows
```
cd ./front-end && npm run start:win
```
for linux 
``` 
cd ./front-end && npm run start:linux
```
app should be visible at [here](http://localhost:3001)

for testing run ```npm test``` on each folder


