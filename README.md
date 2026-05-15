# School Management API

A simple Express.js API for managing schools and calculating distance to a user-provided location.

## Features

- Add a school with name, address, latitude, and longitude
- List all schools sorted by distance from a provided location
- MySQL database integration
- Environment variable configuration via `.env`

## Prerequisites

- Node.js 18+ or compatible
- npm
- MySQL server

## Setup

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`.

```bash
cp .env.example .env
```

4. Update the `.env` file with your database connection values.

## Environment Variables

The application uses the following environment variables:

- `PORT` - Port the server listens on (default: `5000`)
- `DB_HOST` - MySQL host
- `DB_USER` - MySQL username
- `DB_PASSWORD` - MySQL password
- `DB_NAME` - MySQL database name
- `DB_PORT` - MySQL port

## Running the Application

Start the server in development mode:

```bash
npm run dev
```

Or start normally:

```bash
npm start
```

The server will run on `http://localhost:<PORT>`.

## API Endpoints

### Health Check

- `GET /`
- Response: `School Management API Running`

### Add School

- `POST /addSchool`
- Request body (JSON):

```json
{
  "name": "School Name",
  "address": "School Address",
  "latitude": 12.345678,
  "longitude": 98.765432
}
```

- Success response:

```json
{
  "success": true,
  "message": "School added successfully",
  "schoolId": 1
}
```

### List Schools

- `GET /listSchools?latitude=<lat>&longitude=<lon>`
- Query parameters:
  - `latitude` - user latitude
  - `longitude` - user longitude

- Success response includes school details and distance sorted nearest first.

## Database Setup

Create a MySQL database and a `schools` table before running the app. Example schema:

```sql
CREATE DATABASE school_management;
USE school_management;

CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL
);
```

## Notes

- The app uses `dotenv` for environment configuration.
- The MySQL connection uses `rejectUnauthorized: false` for SSL settings.
- Ensure the database credentials match those in `.env`.
