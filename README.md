### IMPORTANT
This README showcases the production-ready Docker implementation. *For the original development documentation, see the README in the "shared" directory.*

# Nipon Motors - Production Car Dealership Platform

A fully containerized car dealership web application built with Django, React, and Docker. Features a complete production setup with NGINX reverse proxy, PostgreSQL database, and multi-stage builds optimized for deployment.

## Quick Start (Docker)

Get the entire application running in under 2 minutes:

```bash
# 1. Clone and setup environment
git clone <repository-url>
cd nipon-motors
./generate-env.sh

# 2. Launch everything with Docker
docker-compose up --build

# 3. Visit http://localhost
```

That's it! The application includes pre-loaded data (77 cars + 2 users) and is ready for immediate use.

## Architecture Overview

This production-ready platform showcases modern containerization practices with a clean separation of concerns:

### Container Architecture

**Frontend Container (25MB)**
- Multi-stage build: Node.js 20 Alpine → NGINX Alpine
- React + Vite production build with modern bundling
- NGINX reverse proxy handling routing and static files
- Smart API rewriting (`/api/*` → `/cars/api/*`)
- File upload support up to 50MB

**Backend Container**
- Python 3.11-slim with PostgreSQL client
- Django + Gunicorn WSGI server (3 workers)
- Environment-driven configuration (DEBUG=False in production)
- Automated static file collection and media handling
- JWT authentication with secure token management

**Database Container**
- PostgreSQL 15 Alpine with persistent volumes
- Pre-loaded with 77 cars and 2 users
- Health checks and dependency management
- Automatic data migration from development SQLite

### Request Flow

1. **User visits** → NGINX serves React static files
2. **API calls** → NGINX proxies to Django backend
3. **Authentication** → JWT tokens handled securely
4. **Media files** → NGINX serves directly from shared volumes
5. **Database** → PostgreSQL with persistent data storage

### Production Features

- **Security**: Environment variables, .dockerignore, CORS properly configured
- **Performance**: Multi-stage builds, static file optimization, database indexing
- **Reliability**: Health checks, proper error handling, graceful shutdowns
- **Scalability**: Stateless containers, shared volumes, horizontal scaling ready

## What's Working

**Complete CRUD Operations**
- ✅ Browse 77+ cars with advanced filtering
- ✅ Add new vehicles with image uploads
- ✅ Edit existing car listings  
- ✅ Delete cars (owner-restricted)
- ✅ User authentication and sessions

**Production Infrastructure**
- ✅ Docker containerization with optimized builds
- ✅ NGINX reverse proxy with smart routing
- ✅ PostgreSQL database with persistent data
- ✅ Environment-based configuration management
- ✅ Security hardening and best practices

**User Experience**
- ✅ Responsive design with Japanese aesthetics
- ✅ Professional home page with animations
- ✅ Advanced search and filtering capabilities
- ✅ Image galleries with proper error handling
- ✅ Mobile-friendly interface

## Technology Stack

**Infrastructure**
- Docker & Docker Compose for containerization
- NGINX for reverse proxy and static file serving
- PostgreSQL 15 for production database
- Multi-stage builds for optimization

**Backend**
- Django 4.2.16 with Django REST Framework
- Gunicorn WSGI server for production
- JWT authentication with token refresh
- Pillow for image processing
- Advanced filtering with django-filters

**Frontend**  
- React 18 with Vite for modern bundling
- React Router for client-side routing
- Axios for API communication with interceptors
- Modern CSS with animations and responsiveness

## Documentation

For detailed setup instructions and deployment guide:
- **[DOCKER_QUICKSTART.md](./DOCKER_QUICKSTART.md)** - Complete Docker setup guide
- **[shared/CHANGELOG.md](./shared/CHANGELOG.md)** - Version history and updates
- **[shared/README.md](./shared/README.md)** - Original development documentation


## Project Showcase

This represents my most comprehensive full-stack project, demonstrating:

**Technical Skills**
- Modern containerization practices with Docker
- Production-ready infrastructure setup
- Full-stack development with React and Django
- Database design and migration strategies
- Security best practices and environment management

**Problem Solving**
- Architecture decisions for scalability
- Performance optimization techniques  
- Debugging complex integration issues
- User experience design principles

**Professional Development**
This project showcases months of dedicated development, from initial concept to production-ready deployment. It demonstrates not just coding ability, but also project planning, documentation, and the persistence to solve complex technical challenges.

---

### Acknowledgments
- **Teachers**: Fer and Oscar for guidance, patience, and knowledge sharing
- **Community**: Friends who provided ideas, feedback, and debugging assistance  
- **Open Source**: The countless developers on Stack Overflow, Reddit, and GitHub who share their knowledge

*built with passion* 