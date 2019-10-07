# PlacementsIO Teaser

[TOC]

Invoice management app. For details about the different major components see the README files in each top-level subdirectory.

# Features

- **Infinite Scroll:** For the campaigns.
- **Data Table:** For the line items. Re-order and sort columns, update adjustments, and mark reviewed items.
- **Subtotals By Campaign:** For easy browsing.
- **Server-powered Filter:** On both campaigns and line items - find by name.
- **Persistant Data:** Edits are saved in mongo.
- **SubTotaling and Grand Totaling:** In easy-to-reach places
- **Deep Linked Filters:** Bookmark your favorite filter


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
