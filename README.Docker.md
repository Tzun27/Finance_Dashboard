# Docker Setup Guide

This guide explains how to build and run the Finance Dashboard using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose (optional, for easier deployment)

## Building the Docker Image

### Using Docker

```bash
docker build -t finance-dashboard .
```

### Using Docker Compose

```bash
docker-compose build
```

## Running the Container

### Using Docker

```bash
docker run -p 3000:3000 finance-dashboard
```

With environment variables:

```bash
docker run -p 3000:3000 --env-file .env.local finance-dashboard
```

### Using Docker Compose

```bash
docker-compose up
```

Run in detached mode:

```bash
docker-compose up -d
```

## Accessing the Application

Once the container is running, access the application at:

```
http://localhost:3000
```

## Stopping the Container

### Docker

```bash
docker stop <container-id>
```

### Docker Compose

```bash
docker-compose down
```

## Multi-Stage Build Explanation

The Dockerfile uses a 3-stage build process:

1. **deps**: Installs production dependencies only
2. **builder**: Builds the Next.js application
3. **runner**: Creates a minimal production image with only necessary files

This approach:
- Reduces final image size
- Improves build caching
- Enhances security by using a non-root user
- Optimizes for production deployment

## Environment Variables

Make sure to configure your environment variables properly:

1. Copy `.env.example` to `.env.local`
2. Fill in the required values
3. Either:
   - Pass them via `--env-file` flag, or
   - Uncomment the `env_file` section in `docker-compose.yml`

## Troubleshooting

### Build fails

- Ensure you have a stable internet connection
- Clear Docker cache: `docker builder prune`
- Rebuild without cache: `docker build --no-cache -t finance-dashboard .`

### Container exits immediately

- Check logs: `docker logs <container-id>`
- Verify environment variables are set correctly
- Ensure port 3000 is not already in use

### Permission issues

The container runs as a non-root user (nextjs) for security. If you encounter permission issues, check file ownership in the mounted volumes.
