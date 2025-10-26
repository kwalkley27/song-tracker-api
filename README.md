# Song Tracker API

A RESTful API for tracking songs, setlists, and played songs.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/)
*   [npm](https://www.npmjs.com/)

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/kwalkley27/song-tracker-api.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```

### Database Setup

This project uses [Prisma](https://www.prisma.io/) as an ORM.

1.  Set up your database and update the `datasource` in `prisma/schema.prisma`.
2.  Run the following command to create the database tables:
    ```sh
    npx prisma migrate dev
    ```

### Running the application

1.  Build the project
    ```sh
    npm run build
    ```
2.  Start the server
    ```sh
    npm start
    ```

## API Endpoints

The following are the available API endpoints.

*   **/api/songs**: For managing songs.
*   **/api/users**: For managing users.
*   **/api/playedsongs**: For managing played songs.
*   **/api/setlist**: For managing setlists.

## Technologies Used

*   [Node.js](https://nodejs.org/)
*   [Express](https://expressjs.com/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Prisma](https://www.prisma.io/)
*   [Helmet](https://helmetjs.github.io/)
*   [Morgan](httpshttps://github.com/expressjs/morgan)
