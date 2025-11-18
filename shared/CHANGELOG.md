# changelog

## [1.5.0] - 2025-11-18

### added
- complete Docker containerization with multi-stage builds
- NGINX reverse proxy configuration with API routing
- PostgreSQL database integration with data migration
- environment variable management with security best practices
- comprehensive documentation (DOCKER_QUICKSTART.md)
- automatic static file collection and media serving
- production-ready configuration with Gunicorn WSGI server

### enhanced
- frontend build optimization from 1.2GB to 25MB final image
- database migration from SQLite to PostgreSQL (77 cars + 2 users)

### technical
- multi-stage Docker builds (Node 20 alpine + NGINX alpine)
- production Django settings with environment variable configuration  
- NGINX location blocks for static files, media, and API proxy
- Docker volume management for persistent data and shared media
- health checks and service dependencies in Docker Compose

### fixed
- removed hardcoded localhost:8000 URLs from all frontend components
- CORS configuration for containerized environment
- image serving through NGINX with proper media volume mounting
- API authentication token handling in production environment

## [1.4.1] - 2025-10-30

### added
- custom 404 and 500 error pages with soft, friendly pastel design
- mascot integration in error pages (mascot404.png) and over the app
- footer component with debug links and branding
- catch-all route for proper 404 handling

### enhanced
- error pages with soft pink/lavender color scheme (testing)
- footer styling

### improved
- app layout with footer integration
- CSS specificity for error pages
- main content wrapper styling for home and error pages
- responsive footer design for mobile devices

### technical
- new NotFound component (404.jsx) with mascot and soft, different colors
- new ServerError component (500.jsx) same as 404.jsx
- new Footer component 
- wildcard route (*) for unmatched URLs

## [1.4.0] - 2025-10-28

### added
- japanese-style floating side panels with glass morphism effects
- user car management system with CRUD operations
- background image integration in promotional panels
- add and edit car functionality with feature selection with owner validation
- delete car capability restricted to car owners
- colorful text styling with CSS outlines for image overlays
- published by field linking cars to their creators

### enhanced
- text readability over background images with vibrant colors
- floating panels positioning closer to header
- font sizes increased for better visibility
- CSS text-stroke effects for improved contrast
- user authentication context with car ownership checks

### improved
- API endpoints with proper ownership permissions
- paginated responses for features and car data
- FormData handling for image uploads
- error handling with content-type validation
- responsive panel layout and positioning

### technical
- IsOwnerOrReadOnly permission class implementation
- car model updated with published_by foreign key
- serializers enhanced with user context

## [1.3.0] - 2025-10-27

### added
- complete Japanese theme redesign across all pages
- glass morphism UI effects with backdrop blur
- japanese typography (Noto Sans JP) implementation
- car dealership background imagery
- pagination system for car listings (10 per page)
- URL parameter-based filtering system

### enhanced
- expanded car database from 5 to 27 vehicles
- added 33 comprehensive automotive features
- intelligent feature assignment based on car price
- diverse vehicle collection (JDM, luxury, utility, supercars)

### fixed
- user session persistence across page navigation
- authentication context state management
- pagination calculation and display logic
- features grid layout and responsive behavior
- CSS class naming inconsistencies

### improved
- centered information card layouts
- mobile-responsive design optimization
- hover effects and animations
- component styling consistency

## [1.2.0] - 2025-10-26

### added
- professional home page design with hero section
- animated feature highlights and category showcases
- car dealership-inspired professional styling
- image display with proper fallback handling
- responsive grid layouts for car listings

### enhanced
- improved car detail views with comprehensive information
- better navigation between pages
- enhanced UI components with smooth animations
- professional color scheme and typography

### fixed
- image upload and display functionality
- cors configuration for frontend-backend communication
- media file serving and static file handling

## [1.1.0] - 2025-10-25

### added
- JWT authentication system with login/logout
- user session management
- protected routes and authentication context
- navigation header with user status
- authentication API endpoints

### enhanced
- car listing page with search and filtering capabilities
- car detail pages with full vehicle information
- API endpoints with advanced filtering using django-filters
- frontend routing with React Router

### fixed
- API communication between frontend and backend
- token-based authentication flow
- CORS headers for cross-origin requests

## [1.0.0] - 2025-10-24

### added
- initial project setup with Django backend and React frontend
- car model with comprehensive fields (brand, model, year, price, mileage, fuel_type, prefecture)
- feature model for automotive features
- owner model for car ownership information
- django rest framework API endpoints
- basic react frontend with vite configuration
- image handling with pillow for car photos
- admin interface for car management
- basic car listing and detail views

### technical foundation
- django 4.2.16 with django rest framework
- react with vite for modern frontend development
- axios for API communication
- JWT authentication setup
- CORS configuration
- media file handling for car images
- database models with proper relationships
- RESTful API design principles