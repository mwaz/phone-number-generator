[![Coverage Status](https://coveralls.io/repos/github/mwaz/phone-number-generator/badge.svg?branch=master)](https://coveralls.io/github/mwaz/phone-number-generator?branch=master)

## Random Phone Number Generator
A CRUD API app built with node, express, and localstorage


The Express JS framework handles the API CRUD, localStorage handles the  storage of data. the stored data is then transferred to an external file on user request

## Requirements

* NodeJS

* express framework

## What the app does

The API enables a user generate unique phone numbers everytime. they can then receive realtime updates on the numbers they have generated, the maximum number and the minimum numbers. The users can also delete hte numbers and sort the numbers in either ascending or descending orders. For efficiency local storage ensures that the company using the system does not incur extra charges for the file storage in terms of a database. 

## Application setup 

The Phone generator API is hosted on heroku and you can access the [documentation here](https://phone-number-generator-api.herokuapp.com/api-docs). Through the docs you can test out the endpoints and the functionnality of the API.

## Running the application locally 
1. clone the application from `git@github.com:mwaz/sms-mgt-api.git`
2. Install dependencies using `npm ci` or `npm install`
3. Start the application `npm start`

## Running the test locally
1. clone the application from `git@github.com:mwaz/sms-mgt-api.git`
2. Install dependencies using `npm ci` or `npm install`
3. run the tests using `npm test`

## Technologies
Technologies used in the application are Express and Node. 

## Documentation 
The app is currently documented using swagger 2.0 and the Open API Specification as shown below . 

![Screen Shot 2019-03-17 at 11 32 19](https://user-images.githubusercontent.com/10160787/54487550-5e946580-48a8-11e9-977b-94e09c8ea024.png)

## contributors
[@mwaz](https://github.com/mwaz)


