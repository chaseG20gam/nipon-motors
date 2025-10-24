### IMPORTANT
this README is project-oriented, showcasing experiences and a roadmap for future development. *the README file refering to the exam school project is in the "shared" directory*

# nipon motors - car dealership platform

a modern car dealership web application built with django and react, designed to showcase and manage car inventory with a sleek, professional interface.

## what we have

this is a full-stack web application that brings together a powerful django backend with a beautiful react frontend to create a comprehensive car dealership platform. users can browse cars, view detailed information, and see high-quality images of vehicles.

## how it works

the application follows a modern api-first architecture where the frontend and backend communicate through rest api endpoints. when you visit the site, the react app makes requests to the django server to fetch car data, which gets displayed in an intuitive, user-friendly interface.

### backend (django)

our django backend serves as the data provider and includes:

- **rest api endpoints** for cars, features, and owners using django rest framework
- **car model** with comprehensive fields like brand, model, year, price, mileage, fuel type, and images
- **image handling** with pillow for car photos stored in media files
- **jwt authentication** for secure user sessions
- **advanced filtering** and search capabilities using django-filters
- **admin interface** for easy car management and image uploads
- **cors configuration** to allow frontend communication

the backend exposes api endpoints like `/cars/api/cars/` that return json data about all cars, including their images, features, and owner information.

### frontend (react)

our react frontend provides a modern, responsive user experience featuring:

- **stunning home page** with animated hero section, feature highlights, and category showcases
- **car listing page** with search, filtering, and grid layout
- **detailed car views** showing comprehensive vehicle information
- **image display** with proper fallback handling for missing photos
- **authentication system** with login/logout functionality
- **responsive design** that works on desktop and mobile
- **modern ui components** with smooth animations and professional styling

### how they talk to each other

the frontend and backend communicate through http requests:

1. **react app** makes api calls to django endpoints (e.g., `http://localhost:8000/cars/api/cars/`)
2. **django server** processes requests and returns json responses
3. **cors headers** allow cross-origin requests between react (port 5173) and django (port 8000)
4. **jwt tokens** handle authentication for protected operations
5. **media files** are served by django and displayed in react components

## current status

the application is fully functional with:
- ✅ complete backend api with car management
- ✅ working image upload and display
- ✅ beautiful, professional home page design
- ✅ car browsing and detailed views
- ✅ authentication system

**note**: the home page looks fancy and professional, but some advanced functionalities are still in progress. the core car browsing experience works perfectly, but features like user profiles, advanced filtering, and interactive elements are being developed.

## tech stack

**backend:**
- django 4.2.16
- django rest framework
- pillow for image processing
- jwt authentication
- cors headers for api access

**frontend:**
- react with vite
- axios for api communication
- react router for navigation
- modern css with animations and gradients

## getting started

### backend setup
```bash
cd backend
source venv/bin/activate
pip install -r ../shared/requirements.txt
python manage.py migrate
python manage.py runserver
```

### frontend setup
```bash
cd frontend
npm install
npm run dev
```

visit `http://localhost:5173` to see the application in action!

## future enhancements

we have exciting plans to make this platform even better:

### visual improvements
- dark/light mode toggle for user preference
- car image galleries with multiple photos per vehicle
- interactive map showing car locations by prefecture
- loading skeletons for better user experience
- advanced animations and micro-interactions

### functionality additions
- car comparison tool for side-by-side analysis
- favorites/wishlist system to save interesting cars
- advanced search with price ranges and location radius
- car recommendations based on user preferences
- contact owner messaging system
- review and rating system for cars and dealers
- financial calculator for loan estimates
- virtual 360° car tours
- test drive booking system
- price alerts for similar vehicles

### user experience
- user dashboard with saved searches and viewed cars
- social sharing capabilities
- mobile app version
- real-time notifications
- advanced filtering with sliders and multi-select
- infinite scroll pagination

### business features
- dealer inventory management
- market analytics and price trends
- admin dashboard with comprehensive metrics
- bulk car import/export
- automated price suggestions
- integration with external car databases

this project demonstrates modern web development practices with a clean separation between frontend and backend, making it scalable and maintainable for future growth.

### also important!
this is my biggest project so far, where i try to showcase my knowledge and the experience i got from trainees and studies. it's not perfect, but ive put a lot of work into it, investing a lot of time, nights of debugging and documentation and months developing a full-stack project all on my own. i hope it serves well as a demonstration of capabilities to others in search of talent, because it already served well as a personal goal.

### special thanks
to my teachers, Fer and Oscar for the trust, patience and investment. thanks for all the knowledge
to my friends, who helped me throughout the project with doubts, features and ideas
to all the anons on Reddit, StackOverflow, etc. who shared their knowledge and answered so many questions