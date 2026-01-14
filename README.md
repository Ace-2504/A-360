# A-360: Unified Relocation Platform

## Index

1. [Overview](#overview)
2. [Problem Statement](#problem-statement)
3. [Tech Stack](#tech-stack)
4. [Architecture](#architecture)
5. [Functional Requirements](#functional-requirements)
6. [Non-Functional Requirements](#non-functional-requirements)
7. [Repository Layout](#repository-layout)
8. [Installation and Setup](#installation-and-setup)
9. [Usage](#usage)
10. [API Endpoints](#api-endpoints)
11. [System Design and Request Flow](#system-design-and-request-flow)
12. [Future Features](#future-features)
13. [Contributing](#contributing)
14. [License](#license)
15. [Acknowledgements](#acknowledgements)

## Overview

A-360 is a unified relocation platform that brings together admin-approved rental homes, verified movers, and furniture/appliance rentals in one place. Users can complete their entire move—finding a home, moving belongings, and setting up the new place—without juggling multiple platforms or unreliable contacts. All services are admin-verified for trust and quality.

**Architecture:** Backend with clear separation of models, views, and routes (routes contain controller logic), using middleware-driven authentication, authorization, and centralized error handling.

## Problem Statement

Relocation is difficult because rental homes, movers, and furniture rentals exist on separate platforms. Users must coordinate between these services, often relying on outdated information and unverified providers. There is no single platform that supports the full relocation process, making moving stressful and inefficient.

A-360 solves this by connecting all three essential relocation services—housing, movement of belongings, and home setup—into one trusted, admin-verified system.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** Passport.js (local strategy)
- **File Uploads:** Multer with Cloudinary
- **Validation:** Joi
- **Templating:** EJS with ejs-mate
- **Session Management:** express-session, connect-flash
- **Other:** method-override, dotenv

## Architecture

A-360 uses a clear separation of concerns:

- **Models:** Mongoose schemas for properties, users, reviews, movers, and rentals
- **Routes:** Express route files that contain both routing and controller logic
- **Views:** EJS templates for server-side rendering
- **Middleware:** Authentication, authorization, validation, and error handling

Business rules and permission checks are enforced server-side for security and consistency. While the project does not have a dedicated controllers folder, route files handle both routing and business logic for simplicity.

## Functional Requirements

- **User Authentication:** Signup, login, logout with secure password handling
- **Property Listings:** Create, view, edit, and delete admin-approved rental listings
- **Movers & Packers:** Discover and connect with admin-verified movers
- **Furniture/Appliance Rentals:** Browse and select verified rental options for the new home
- **Image Uploads:** Upload and store images via Cloudinary
- **Reviews System:** Users can rate and review properties, movers, and rental providers
- **Responsive UI:** EJS templates and Bootstrap for mobile-friendly design

## Non-Functional Requirements

- **Security:** Server-side authorization, HttpOnly session cookies
- **Maintainability:** Clear folder structure, centralized logic, minimal duplication
- **Reliability:** External service failures do not break core flows; consistent error handling

## Repository Layout

- `app.js` — Main application entry point, middleware setup, and route mounting
- `init/` — Data initialization scripts
- `models/` — Mongoose schemas for Property, User, Review, etc.
- `routes/` — Express routers for properties, users, etc.
- `views/` — EJS templates for rendering pages
- `public/` — Static assets (CSS, JS, images)
- `middleware.js` — Custom middleware for authentication, validation, and ownership checks
- `cloudConfig.js` — Cloudinary configuration

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ace-2504/A-360.git
   cd A-360
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env` file and add your API keys and secrets (Cloudinary, Mapbox, MongoDB URI, etc.)
4. **Start MongoDB:**
   Ensure MongoDB is running locally or update your connection string for a remote instance.
5. **Run the application:**
   ```bash
   npm start
   # or
   node app.js
   ```
   For development with auto-restart:
   ```bash
   npm run dev
   ```
6. **Access the app:**
   Open `http://localhost:8080` in your browser.


## Usage

- **Signup/Login:** Create an account or log in to access relocation features
- **Browse Listings:** View all available rental homes
- **Find Movers & Rentals:** See verified movers and furniture/appliance rentals alongside properties
- **Create/Edit Listings:** Owners can add or modify their properties
- **Leave Reviews:** Authenticated users can rate and review services
- **Contact Owner:** Only logged-in users can view the owner's contact information (email and mobile) for a property. If a user is not logged in and tries to contact the owner, the backend returns a 401 Unauthorized for AJAX requests, and the frontend redirects the user to the login page. This prevents infinite login loops and ensures secure access to sensitive information.

## API Endpoints

- `GET /properties` — View all rental properties
- `POST /properties` — Create a new property (auth required)
- `GET /properties/:id` — View a specific property
- `PUT /properties/:id` — Update a property (owner only)
- `DELETE /properties/:id` — Delete a property (owner only)
- `GET /movers` — List all verified movers
- `GET /rentals` — List all furniture/appliance rentals
- `POST /properties/:id/reviews` — Add a review (auth required)
- `DELETE /properties/:id/reviews/:reviewId` — Delete a review (author only)
- `GET /signup`, `POST /signup` — User registration
- `GET /login`, `POST /login` — User login
- `GET /logout` — User logout

## System Design and Request Flow

A-360 ensures that all critical decisions and permission checks are handled on the server. The frontend focuses on user interaction and display, while the backend enforces business rules and security.

**Key design choices:**
- **Server-side rule checks:** Middleware for login and ownership checks. For AJAX/API requests (such as contacting the owner), unauthenticated users receive a 401 Unauthorized response instead of a redirect, and the frontend handles the redirect to the login page.
- **Ownership-based access:** Users can modify only their own listings and reviews
- **Server-driven UI:** The server determines allowed actions
- **Consistent request handling:** All requests follow a standard flow
- **Central error handling:** Shared logic for error management

## Future Features

- **Development of Movers and Appliance/Furniture Rentals**
- **Two-Factor Authentication (2FA)**
- **Booking System** for rentals and movers 
- **Payment Integration** (Stripe/PayPal)
- **Advanced Search & Filters**
- **React-based Frontend**
- **Email Notifications**
- **Real-time Chat**
- **Analytics and Reporting**

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request. For major changes, open an issue first to discuss your ideas.

## License

This project is licensed under the ISC License. See the LICENSE file for details.

## Acknowledgements

- Built as part of a learning project
- Inspired by real-world relocation challenges
- Thanks to the open-source community for libraries and tools
