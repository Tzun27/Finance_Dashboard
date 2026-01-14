# Environment Variables & API Keys in Docker

This guide explains how to securely manage API keys and environment variables when using Docker.

## ⚠️ Security First

**NEVER** hardcode API keys in:
- Your source code
- Dockerfile
- Docker images
- Version control (git)

Always use environment variables passed at runtime.

## Methods to Pass API Keys to Docker

### 1. Using `.env.local` File (Recommended for Development)

**Setup:**
```bash
# Your .env.local file (already gitignored)
NEXT_PUBLIC_API_KEY=your_api_key_here
DATABASE_URL=your_database_url
API_SECRET=your_secret_key
```

**Docker Compose:**
```yaml
services:
  finance-dashboard:
    env_file:
      - .env.local  # Loads all variables from this file
```

**Run:**
```bash
docker-compose up
```

✅ **Pros:** Simple, works great for local development  
❌ **Cons:** Not ideal for production deployments

---

### 2. Using Command Line (Docker CLI)

**Single variable:**
```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_KEY="your_api_key" \
  finance-dashboard
```

**Multiple variables:**
```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_KEY="your_api_key" \
  -e DATABASE_URL="your_database_url" \
  -e API_SECRET="your_secret" \
  finance-dashboard
```

**From file:**
```bash
docker run -p 3000:3000 --env-file .env.local finance-dashboard
```

✅ **Pros:** Direct control, good for testing  
❌ **Cons:** Verbose, secrets visible in command history

---

### 3. Docker Compose Environment Override

**Create a separate environment file:**
```bash
# .env.production (for production)
NEXT_PUBLIC_API_KEY=prod_key
DATABASE_URL=prod_database_url
```

**Use different files for different environments:**
```bash
# Development
docker-compose --env-file .env.local up

# Production
docker-compose --env-file .env.production up
```

✅ **Pros:** Environment-specific configurations  
❌ **Cons:** Need to manage multiple files

---

### 4. Docker Secrets (Production - Recommended for Production)

For production deployments (Docker Swarm or Kubernetes):

**Create secrets:**
```bash
echo "your_api_key" | docker secret create api_key -
```

**Use in docker-compose.yml:**
```yaml
version: '3.8'
services:
  finance-dashboard:
    secrets:
      - api_key
    environment:
      - API_KEY_FILE=/run/secrets/api_key

secrets:
  api_key:
    external: true
```

✅ **Pros:** Most secure, encrypted at rest  
❌ **Cons:** Only works with Docker Swarm/K8s

---

## Next.js Specific: Public vs Private Variables

### Public Variables (Client-Side)
Prefix with `NEXT_PUBLIC_`:
```bash
NEXT_PUBLIC_API_URL=https://api.example.com
```
- Exposed to the browser
- Safe for non-sensitive data (API endpoints, feature flags)

### Private Variables (Server-Side Only)
No prefix:
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/db
API_SECRET=super_secret_key
```
- Only accessible in server components and API routes
- Never sent to the client

---

## Best Practices

### ✅ DO:
- Use `.env.local` for local development
- Use Docker Secrets for production
- Keep `.env.local` in `.gitignore`
- Provide `.env.example` with dummy values
- Rotate API keys regularly
- Use different keys for dev/staging/production

### ❌ DON'T:
- Commit API keys to git
- Hardcode secrets in Dockerfile
- Use `ARG` for secrets (they're visible in image history)
- Share production keys with team members directly

---

## Checking Variables Inside Container

**View environment variables:**
```bash
docker exec -it <container-id> env
```

**Check if variable is set:**
```bash
docker exec -it <container-id> printenv NEXT_PUBLIC_API_KEY
```

---

## Current Setup

Your `docker-compose.yml` is configured to load variables from `.env.local`:

```yaml
env_file:
  - .env.local
```

**To use:**
1. Ensure `.env.local` exists with your API keys
2. Run: `docker-compose up`
3. All variables are automatically loaded into the container

**For production:** Create `.env.production` and use:
```bash
docker-compose --env-file .env.production up
```
