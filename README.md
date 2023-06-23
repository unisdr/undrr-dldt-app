# Prototype App - DLDT

**Disclaimer: This prototype app was built over the first half of 2023 in collaboration with UNDRR (United Nations Office for Disaster Risk Reduction). It is important to note that this is not production code and should not be used as such.**

This repository contains a prototype app built using DLDT React, Docker, Express, and Directus. The app aims to showcase the DLDT (Disaster Losses and Damage Tracking) data model and provide a basic user interface for interacting with the data.

## Contents

- `src/`: DLDT React app source code.
- `Dockerfile`: Dockerfile for building a Docker image of the DLDT React app, which is served by Express with a configuration route for providing runtime credentials.
- `api/`: Contains the Dockerfile for building the Directus instance, based on a sample environment file and a dldt-seed.sql file that provides a PostgreSQL database for the Directus instance, seeded with DLDT data model.

## Getting Started

To get started with the prototype app, follow the steps below:

1. Clone this repository.
2. Install the required dependencies by running `npm install`.
3. Raname `sample-env` to `.env.development` and add your access token.
4. Create a PostgreSQL database and import `api/dldt-seed.sql`.
4. Rename the `api/sample-env` to `.env` and add your database credentials.
3. Build the Docker image for the Directus instance by running `docker build -t directus-api ./api`.
4. Launch the Docker image `docker run -p 8055:8055 dldt-api`.
3. Run the app with `npm start`.

Please note that this is a prototype and may contain bugs or incomplete features. It is not intended for production use.

## Contributing

We welcome contributions to enhance and improve this prototype app. If you would like to contribute, please follow these guidelines:

1. Fork the repository and create a new branch for your contribution.
2. Make your changes and test thoroughly.
3. Submit a pull request with a clear description of your changes.

Please note that this repository is maintained on a best-effort basis, and there is no guarantee of active maintenance or support.

## License

This prototype app is released under the [MIT License](LICENSE).
