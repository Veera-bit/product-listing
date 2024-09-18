# React Vite Application with Clerk Authentication

This project is a React Vite application that integrates authentication using [Clerk](https://clerk.com/). Clerk offers easy-to-use authentication and user management features, allowing developers to quickly add authentication functionality to their applications. This `README` will guide you through setting up the project, integrating Clerk authentication, and configuring your Clerk account.

## Getting Started

### 1. Installation

Follow these steps to set up the project locally:

- **Clone the repository:**

  First, clone the repository to your local machine using the following command:

  ```bash
  git clone https://github.com/Veera-bit/product-listing.git
  ```

- **Navigate into the project directory**:

  ```
  cd product-listing
  ```

- **Install Dependencies:**
  ```
  npm install
  ```

## 2. Clerk Setup

- Create a Clerk Account:
  Go to Clerk and sign up for an account if you don’t have one.
- Create a Clerk Application:
  After signing in, head over to the Clerk Dashboard and create a new application by clicking the Create Application button. Follow the instructions to set up your app.
- Obtain the API Key:
  Once the application is created, navigate to the API Keys section in your Clerk dashboard. Copy the Frontend API Key provided.
- Set Up Environment Variables:
  In the root of the project, create a .env file if it doesn’t exist already. Add the following environment variable .env file:

  ```
    VITE_CLERK_FRONTEND_API=<your-frontend-api-key>
  ```

## 3. Running The Application

Once Clerk is set up and dependencies are installed, follow these steps to run the application:

- **Run the development server**:
  ```
  npm run dev
  ```
- The application will be hosted at:
  ```
  http://localhost:5173/
  ```

## 4. Application Screenshots

1. Home
   ![Alt Text](/screenshots/Screenshot%202024-09-18%20at%201.35.10 PM.png)

2. Filter
   ![Alt Text](/screenshots/Screenshot%202024-09-18%20at%201.35.18 PM.png)

3. Search
   ![Alt Text](/screenshots/Screenshot%202024-09-18%20at%201.35.28 PM.png)

4. Create Product
   ![Alt Text](/screenshots//Screenshot%202024-09-18%20at%201.32.50 PM.png)
