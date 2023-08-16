# Prototype App - DLDT

**Disclaimer: This prototype app was built over the first half of 2023 in collaboration with UNDRR (United Nations Office for Disaster Risk Reduction). It is important to note that this is not production code and should not be used as such.**

This repository contains a prototype app built using React and Directus. The app aims to showcase the DLDT (Disaster Losses and Damage Tracking) data model and provide a basic user interface for interacting with the data.


## Requirements

To run the prototype locally, you will need **Node**, **NPM** and **Docker** installed.

## Contents

- `src/`: DLDT React app source code.
- `docker-compose.yml`: Docker compose file for building Directus and PostgreSQL containers and seeding the database.
- `api/`: Contains a db.sql file that provides a PostgreSQL database for the Directus instance, seeded with DLDT data model. Used by the docker-compose.yml.

## Getting Started

To get started with the prototype app, follow the steps below:

1. Clone this repository.
2. Run `docker-compose up -d` to start Directus and seed the database. Directus should be running on http://localhost:8055.
3. Raname `sample-env` to `.env`. (If you don't have an access token, you can create an Admin user in Directus and generate a new token).
4. Install the required dependencies for the frontend by running `npm install`.
5. Run the app with `npm start`. The DLDT app should be running on http://localhost:3000.
6. To stop the Docker containers, run `docker-compose down`.

Please note that this is a prototype and may contain bugs or incomplete features. It is not intended for production use.

## Contributing

We welcome contributions to enhance and improve this prototype app. If you would like to contribute, please follow these guidelines:

1. Fork the repository and create a new branch for your contribution.
2. Make your changes and test thoroughly.
3. Submit a pull request with a clear description of your changes.

Please note that this repository is maintained on a best-effort basis, and there is no guarantee of active maintenance or support.

## License

This prototype app is released under the [MIT License](LICENSE).
