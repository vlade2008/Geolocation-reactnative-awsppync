# Geolocation-reactnative-awsappync

## To run this project

1. Clone this repo 
```
https://github.com/vlade2008/Geolocation-reactnative-awsappync.git
```
2. cd into directory and install the dependencies

```
cd Geolocation-reactnative-awsappync
yarn || npm i
```

3. update src/appsync.js with your AppSync credentials

4. Run Project

```
  npm run ios - for ios 
  npm run android - for android
  
  ```
  
### Demo
https://expo.io/@christianjohnsaclao/geolocation-aws-appysnc-christian

### SCHEMA

``` 
type Business {
	id: ID!
	name: String!
	description: String
	address: String
	type: String
	latitude: Float
	longitude: Float
	latitudeDelta: Float
	longitudeDelta: Float
} 
```
