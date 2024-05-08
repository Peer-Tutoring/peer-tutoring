## Requirements

Before you begin the setup, make sure to install the following tools:

- [XAMPP](https://www.apachefriends.org/index.html) - PHP development environment.
- [Composer](https://getcomposer.org/) - A dependency manager for PHP.
- [Node.js](https://nodejs.org/en/) - JavaScript runtime.
- [PNPM](https://pnpm.io/) - Install using Node.js with the command in your terminal:
  ```bash
  npm install -g pnpm
  ```

## First Time Setup Instructions (Only Once)

1. **Move Project Folder:**

   - Move the `peer-tutoring` folder to the root directory of the XAMPP folder.

2. **Configure Environment Files:**

   - In both the `frontend` and `backend` folders, rename the `.env.example` file to `.env`.

3. **Install Backend Dependencies:**

   - Navigate to the `backend` folder and run the following command:
     ```bash
     composer install
     ```

4. **Install Frontend Dependencies:**
   - Navigate to the `frontend` folder and run the following command:
     ```bash
     pnpm install
     ```
5. **Import Database:**
   - Launch phpMyAdmin from XAMPP's control panel.
   - Create a new database and name it according to the database name specified in the backend .env file.
   - Select the database, and then click on the "Import" tab to import the tables.
   - Choose the SQL file provided (peer_tutoring.sql) and start the import process.

## Running the Project

1. **Start XAMPP Services:**

   - Run XAMPP and start both the Apache and MySQL services.

2. **Launch Frontend Development Server:**
   - Navigate to the `frontend` folder and run the following command:
     ```bash
     pnpm dev
     ```
     - This command will start the development server and output a URL that you can open in your browser to view the webiste (typically `http://localhost:5173/`).
