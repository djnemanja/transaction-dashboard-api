# Transaction Dashboard API

This is the backend API for the Transaction Dashboard project, built with Node.js, TypeScript, Fastify, and TypeORM.

## Requirements

- **Node.js**: v18.x or v20.x (LTS recommended)
- **npm**: v9.x or v10.x

## Getting Started

### 1. Clone the repository
```bash
git clone <repo-url>
cd transaction-dashboard-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy the example environment file and adjust as needed:
```bash
cp .env.example .env
```
Edit `.env` and set your database connection details if needed.

### 4. Start the database with Docker Compose
This project uses PostgreSQL. You can start a local instance with Docker Compose:
```bash
docker-compose up -d
```
This will start the database using the configuration from `docker-compose.yml`.

> **Note:** Make sure the values in your `.env` file match the database settings in `docker-compose.yml`.

### 5. Run database migrations (if you use TypeORM migrations)
```bash
npm run typeorm migration:run
```

### 6. Start the API server
```bash
npm run dev
```
The API will be available at `http://localhost:3005` (or the port specified in your `.env` file).

## Useful Commands
- `npm run dev` — Start development server with hot reload
- `npm run build` — Build the project
- `npm run start` — Start the built project
- `npm run typeorm migration:run` — Run database migrations

## Troubleshooting
- Make sure the Docker container for the database is running (`docker ps`)
- Check that the ports and credentials in your `.env` file are correct
- If you change `.env`, restart the server

## License
MIT 