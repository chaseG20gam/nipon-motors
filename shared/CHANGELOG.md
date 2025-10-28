# changelog

## [1.4.0] - 2025-10-28

### added
- japanese-style floating side panels with glass morphism effects
- user car management system with CRUD operations
- background image integration in promotional panels
- add car functionality with feature selection
- edit car functionality with ownership validation
- delete car capability restricted to car owners
- colorful text styling with CSS outlines for image overlays
- published by field linking cars to their creators

### enhanced
- text readability over background images with vibrant colors
- floating panels positioning closer to header
- font sizes increased for better visibility
- CSS text-stroke effects for improved contrast
- panel content with Japanese/English bilingual text
- user authentication context with car ownership checks

### improved
- API endpoints with proper ownership permissions
- paginated responses for features and car data
- FormData handling for image uploads
- error handling with content-type validation
- CSS styling with reduced outline thickness
- responsive panel layout and positioning

### technical
- IsOwnerOrReadOnly permission class implementation
- car model updated with published_by foreign key
- serializers enhanced with user context
- database migrations for ownership tracking
- japanese typography and design elements integration

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