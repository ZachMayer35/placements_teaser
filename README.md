# PlacementsIO Teaser


[![Build Status](https://travis-ci.org/ZachMayer35/Radioscope.svg?branch=master)](https://travis-ci.com/ZachMayer35/placements_teaser)
[![Heroku](http://heroku-badge.herokuapp.com/?app=placementsteaser&style=flat&svg=1&root=/strings)](http://placementsteaser.herokuapp.com)

[Storybook on GithubPages](https://zachmayer35.github.io/placements_teaser)

# Features

- **Infinite Scroll:** For the campaigns.
- **Data Table:** For the line items. Re-order and sort columns, update adjustments, and mark reviewed items.
- **Subtotals By Campaign:** For easy browsing.
- **Server-powered Filter:** On both campaigns and line items - find by name.
- **Persistant Data:** Edits are saved in mongo.
- **SubTotaling and Grand Totaling:** In easy-to-reach places
- **Deep Linked Filters:** Bookmark your favorite filter
- **Storybook:** Living design document
- **API Docs by Swagger:** On `/documentation`

# Technologies Represented

- **Dockerized Development:** Uses docker-compose to make dev environment setup easy.
- **MongoDB:** JSON document storage given sample JSON data - loaded (and cleaned) on every `docker-compose up`
- **NodeJS:** Event-loop driven and natively asynchronous runtime for server-side JS
- **HapiJS with Mongoose:** A fast, declarative NodeJS web server for static files, API calls, and Mongoose drivers for MongoDB
- **Create-React-App:** Standard react Single Page Application boilerplate
- **Material UI:** Great boilerplate components for layout, forms, etc.
- **Redux and Redux Saga:** Generator-based state management for the client provides easy control flow for both synchronous and asyc needs.
- **SPA Routing:** Queries are persisted to the browser history and readily recalled on first load.
- **Jest:** Component (and anything else) testing.

# Setup

The app will run on any environment with docker available on version **19.03.2** or higher. Honestly it'll probably work on anything with docker-compose version: 3 but I haven't tested it so ymmv.

The setup scripts for each environment are straightforward (and identical but provided separately for convenience). They will install and build the UI locally so that it can be mounted as a volume in the dockerized server environment.

### Windows

1.  Install [Docker Desktop for Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows)
    1.  After installation (which may require a reboot) and once Docker Desktop is running [follow these instructions](https://blogs.msdn.microsoft.com/stevelasker/2016/06/14/configuring-docker-for-windows-volumes/) to allow docker to access at least the hard drive where the project lives.
2.  Open a Powershell terminal **as administrator** and navigate to the root of the project
3.  If you haven't already, set your current user script execution policy to unrestricted
    1. `Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope CurrentUser`
4.  Run `./setup.ps1`

### MacOS/Linux

1. Install [Docker Desktop for MacOS](https://hub.docker.com/editions/community/docker-ce-desktop-mac)
   1. On Linux, see instructions for your distrubution [on the docker website](https://docs.docker.com/v17.12/install/#server)
2. Open a bash terminal and navigate to the root of the project
3. Run `sh setup.sh`

# Running The App

1.  Run `docker-compose up -d` from the root of the project
2.  Open a browser to [http://localhost:8080](http://localhost:8080) to view the app
3.  API docs live on the `/documentation` route

# Making Changes

With the `docker-compose`'d instance running, you can make changes directly to the server or UI projects and see them in the running environment.

For the server, saving files in the `InvoiceServer/server` directory is enough. The app starts in development mode locally and mounts the server directory so it can be watched and reloaded via PM2.

For the UI client, making changes isn't enough since only the generated `InvoiceUI/build` directory is mounted. For those changes to show up on http://localhost:8080 you'll need to re-build the client with `npm run build` from the `InvoiceUI` directory.

You can run the UI client in a detached mode with `npm start` from `InvoiceUI` and get hot-reloading of changes on http://localhost:3000 In this mode the client will make requests to your running docker environment, however those requests will be cross-origin. The InvoiceServer is configured to allow CORS requests only for this detached UI, however there may be issues with some headers. As of now all the required calls work.

You can also run the InvoiceServer outside the docker environment with `npm run start:local` from the `InvoiceServer` directory. In this mode, the server will look for the dockerized MongoDB instance created with the `docker-compose up -d` command. Running locally allows you to attach debuggers and step through code but there is no file watching. It could be added with nodemon.

# Running Tests

For expediency, only the UI client has tests. Running the `npm run test` command from `InvoiceUI` will start a test watcher that will re-run on file changes. With a little additional configuration, the test runner Jest can be setup to also emmit snapshots (not screenshots) but this was left out for now. Adding `--coverage` to the `test` command in `package.json` will show coverage statistics.

There are not many tests in the client but there are enough to demonstrate how they should be composed with the rest of the project.

# Storybook

The storybook can be accessed locally by (first installing and then) running the command `npm run storybook` from the `/InvoiceUI` directory.
