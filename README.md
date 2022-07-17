# messageWerks

Newsletter utility - backend

## Desription

messageWerks - backend is the backend of a 2-part application suite. This backend:
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

- `/auth`: Login and user authorisation
  - POST `/login`: Authenticates a user

- `/business`: Business model access
  - GET `/all`: Gets all businesses
  - GET `/uuid`: GEts a Business by UUID
  - POST `/new`: Creates a new Business
  - PATCH `/edit`: Edits the details of a Business
  - DELETE `/DELETE`: Deletes a Business

- `/users`: User model access
  - GET `/all`: Gets all users
  - GET `/uuid`: Gets user by UUID
  - POST `/create`: Creates new user
  - PATCH `/edit`: Edits user account properties
  - DELETE `/remove`: Deletes a user


### Authentication

### Databases




## The demo app


## Viewing the development environment

## Downloading the codebase


## Prerequisites for running the app locally

- Local Redis server
- Local PostgreSQL server
- PGAdmin (optional)


### - Environment variables
Environment variables are contained in 2 files:
- `.env.development` for development environment use.
- `.env.production `for production environment use.
- Please refer to the `sample_.env` file for reference variable keys.

The npm script specifies the NODE_ENV value which is used by a small function in the ./server.js file to determine which file to reference.

### Node runtome environment
To install NodeJs in Windows:
- Download the packages [here](https://nodejs.org/en/download/)
- Installation instructions [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)


### Postman
Postman can be used to query API endpoints.
Click [here](https://learning.postman.com/docs/getting-started/installation-and-updates/) for details on setting up Postman on your local computer.


### WSL (Windows Subsystem for Linux) - Windows only
- Go [here](https://docs.microsoft.com/en-us/windows/wsl/install) for instructions
- To run WSL, double-click the icon provided by the installation, or run the file located in `C:\Windows\System32\wsl.exe`

- To stop WSL:
  - Open the command prompt or PowerShell console
  - View running distros by typing `wsl --list`
  - Terminate the running distro by typing `wsl -t <distro_name>`
  - Alternately, you can terminate all distros by running `wsl --shutdown`


### PostgreSQL

- PostgreSQL installer downloads [here](https://www.postgresql.org/download/)

### MongoDB


### Redis

- If you wish to install a local copy of Redis, the instructions are located [here](https://redis.io/docs/getting-started/). 

#### _Windows_
- Installation instructions [here](https://redis.io/docs/getting-started/installation/install-redis-on-windows/)


- Open the Windows Subsystem for Linux (WSL)
- Run the following to install Redis:

`sudo apt-add-repository ppa:redislabs/redis`<br>
`sudo apt-get update`<br>
`sudo apt-get upgrade`<br>
`sudo apt-get install redis-server`<br>


- To start Redis, run `sudo service redis-server start`
- To open the command-line interface, run `redis-cli`
- To stop Redis, run `sudo service redis-server stop`


- References:
  - [Redis command reference](https://redis.io/commands/)
  - [Redis cli manual](https://redis.io/docs/manual/cli/)

- Common CLI commands:

|Command|Description|
|---|---|
|`SET <key> <value>`|Sets a key and value|
|`KEYS *`|Gets all keys|
|`GET <key>`|Gets the value of a key|

Reference [here](https://docs.redis.com/latest/rs/references/client_references/client_nodejs/)
Default settings for local Redis:
- host: "12.0.0.1"
- port: 6379
- password: `<none>`


## Running the dev environment locally

### Start PostgreSQL

_Mac_

_Windows_
  - Double-click on the `pgAdmin 4` icon to start the PostgreSQL server
  - Enter the Master Password




### Start Redis

_Mac_

_Windows_
- Open the Windows Subsystem for linux (WSL)to the project root
- To start Redis, run `sudo service redis-server start`
- Enter the Redis admin password when prompted.

### Run the application
- Install dependencies by running `npm i`


_Mac_

_Windows_
- Open the Command Prompt or PowerShell console to the project root.
- To start the application, run `npm run dev`. The app listens on port 3001.
- Optionally, start Redis Commander by running `npx redis-commander` at project root in the Command Prompt. The default URL for viewing the database is `http://127.0.0.1:8081`





