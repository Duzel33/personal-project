# ZEN Home Care Services

A full-stack web application built for ZEN Home Care Services, a residential
service provider offering lawn care, trash haul-off, painting, and general home
maintenance and repairs. Built with a Django REST API, a React frontend, and a
PostgreSQL database, containerized with Docker Compose. Solo project from the
Code Platoon Full Stack Development Program (2026).

## What it does

The application supported ZEN Home Care Services' operations, giving the business
a system to manage its home service offerings and customer information through a
web interface backed by a REST API. (The business has since closed.)

## Tech stack

- **Backend:** Python, Django, Django REST Framework
- **Frontend:** React, Vite, JavaScript
- **Database:** PostgreSQL 15
- **Infrastructure:** Docker, Docker Compose

## Architecture

The backend API and PostgreSQL database run as Docker containers defined in
`backend/docker-compose.yml`. The API is served on port 8000; the React frontend
runs on port 5173. A `setup_data.py` script seeds the database with initial data
on startup.

## Running it locally

Requirements: Docker, Docker Compose, and Node.js.

```bash
./start.sh   # builds the backend containers, runs migrations, seeds data,
             # and starts the frontend dev server
./stop.sh    # stops the application
```

- Backend API: http://localhost:8000
- Frontend: http://localhost:5173

## About

Built by Nicholas Van Doren as a solo project during Code Platoon (2026).
