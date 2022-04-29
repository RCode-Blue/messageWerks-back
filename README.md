# messageWerks

Newsletter utility - backend

## Desription

messageWerks - backend is the backend of a 2-part application suite. This is the backend that:
- Serves API endpoints that provide access to the frontend
- Interfaces with the backend databases
- Handles authentication for authorised users

### A note about documentation

Documents are created using JSDoc. Go [here](https://jsdoc.app/) for reference.

To generate the documents using JSDoc, run `npm run jsdoc` in project root. The output is in the `./docs/documentation` folder. To view, open `index.html` in the output folder in your web browser.




## Made with
- Node.js
- Express.js
- 

## About the application

### Models


### Configuration settings


### API Endpoints


### Authentication

### Databases




## The demo app


## Viewing the development environment

### Downloading the codebase


### Prerequisites for running the app locally

- Local Redis server
- Local PostgreSQL server
- PGAdmin (optional)


#### Environment variables
Environment variables are contained in 2 files:
- `.env.development` for development environment use.
- `.env.production `for production environment use.
- Please refer to the `sample_.env` file for reference variable keys.

The npm script specifies the NODE_ENV value which is used by a small function in the ./server.js file to determine which file to reference.


#### Postman
Postman can be used to query API endpoints.
Click [here](https://learning.postman.com/docs/getting-started/installation-and-updates/) for details on setting up Postman on your local computer.



#### PostgreSQL


#### MongoDB


#### Redis

Reference [here](https://docs.redis.com/latest/rs/references/client_references/client_nodejs/)
Default settings for local Redis:
- host: "12.0.0.1"
- port: 6379
- password: <none>


### Running the dev environment locally

To start the application, run `npm run serve:dev`. The app listens on port 3001.





