# Car Rental System

Welcome to the Car Rental System! This repository contains a full-stack web application where clients can easily rent cars by selecting their preferred country, pickup location, return location, dates, and more. The system also provides comprehensive management functionalities for administrators.

## Features

### Client Side
- **Sign Up / Login:** Clients can create an account and log in to the system.
- **Country Selection:** Choose the country where they want to rent a car.
- **Location and Dates:** Specify pickup and return locations and dates.
- **Browse Cars:** View available cars based on the selected criteria.
- **Reservation:** Confirm the reservation, view the total amount, and make the payment.
- **Booking History:** View past and upcoming bookings.

### Admin Side
- **Admin Login:** Access the admin portal at `/admin`.
- **Manage Cars:** Add, view, and manage the fleet of cars.
- **Manage Locations:** Add, view, and manage pickup and return locations.
- **Reservations:** View and confirm client reservations.
- **Admin Management:** Root admin can add and remove other admins.

## Technologies Used

### Frontend
- **Create React App (TypeScript):** A simple and robust way to create React applications.
- **React & React Router:** For building and managing the user interface.
- **Stripe.js & react-stripe:** For handling payments.

### Backend
- **Node.js & Express:** For creating the server and APIs.
- **TypeScript:** For type-safe JavaScript.
- **MySQL:** Database management using mysql2 package.
- **bcrypt:** For password hashing.
- **db-migrate:** For database migration.
- **jsonwebtoken:** For JWT-based authentication.
- **nodemailer:** For sending emails using Mailpit as a fake SMTP server.
- **Stripe:** For payment integration.

## Installation and Setup

### Frontend
1. Navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```
2. Install the required packages:
    ```bash
    npm install
    ```
3. Start the React app:
    ```bash
    npm start
    ```

### Backend
1. Navigate to the `backend` folder:
    ```bash
    cd backend
    ```
2. Install the required packages:
    ```bash
    npm install
    ```
3. Run database migrations:
    ```bash
    db-migrate up
    ```
4. Start the server:
    ```bash
    npm start
    ```

## Admin Credentials
A root admin is created automatically with the following credentials:
- **Email:** gasser@gmail.com
- **Password:** Gasser123

The root admin has the ability to add and remove other admins.

## Usage

### Client Usage
1. **Sign Up / Login:** Clients create an account or log in.
2. **Select Country & Locations:** Choose the desired country, pickup, and return locations.
3. **Choose Dates:** Specify the pickup and return dates.
4. **Browse Cars:** View available cars and select one.
5. **Reservation:** Confirm the reservation, view the total amount, and pay using Stripe.
6. **Booking History:** View all bookings in the bookings page.

### Admin Usage
1. **Admin Login:** Log in at `/admin`.
2. **Manage Cars & Locations:** Add, view, and manage cars and locations.
3. **Reservations:** View and confirm reservations.
4. **Admin Management:** Root admin can add or remove other admins.

## Testing

- **Emails:** Use Mailpit for testing email functionalities.
- **Payments:** Use Stripe in test mode for payment integrations.