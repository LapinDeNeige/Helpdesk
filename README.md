# Helpdesk 
A lightweight, feature-rich helpdesk system designed to streamline ticket management, enhance communication, and improve support workflow.

# Features

* ~~Mailing Client After Sending Ticket~~ 
* ~~Automatically sends email notifications to clients once their ticket is submitted, ensuring prompt communication and acknowledgment.~~ 
* ~~File Uploading~~ 
* Notifications
* Keep users updated with real-time notifications for ticket updates, comments, and status changes.
* Admin Panel
* A centralized dashboard for administrators to manage tickets
* Status Coloring
* Tickets are visually categorized using color-coded statuses for quick identification and prioritization.
* Status Changing
* Admins and support agents can update ticket statuses (e.g., Open, In Progress, Resolved), triggering 	notifications and workflow updates.
* Notifications Read
* Reading from log file
* Track which notifications have been read to ensure no update or important information is missed.
* Logging important actions and errors to a file for auditing and debugging.
* Reading database and server port and IP from configuration file
* Problem Statistics Generate statistics on problems types to identify trends and optimize support.

# API Routes/Endpoints
* ``` GET / ``` - Get main index page
* ``` GET /index ``` - Get main index page
* ``` POST / ``` - Add new ticket
* ``` POST /tickets ``` - Get tickets list
* ``` POST /removeTicket ``` - Remove ticket
* ``` GET  /searchTickets ``` - Search tickets by value
* ``` GET  /version ``` - Get current version of Helpdesk
* ``` GET  /updateStatus ``` - Update ticket's status
* ~~```POST  /upload  - Upload``` file to server~~
* ``` GET  /statProblem ``` - Getting problem's stats 
* ``` GET  /stat ``` - Getting stat
* ``` GET  /moderator ``` - Moderator page
* ``` GET  /checkNotify ``` - Check new notifications 	
* ``` GET  /getNotify ``` - Get notifications
* ``` POST /readNotify ``` - Change notifications status to read 
* ``` POST /delNotify ``` - Delete notifications   
* ``` GET /isAuth ``` - Get user's auth status (if user authenticated)
* ``` GET /tickets ``` - Get tickets page 
* ``` GET /log ``` - Get logs messages 
* ``` GET /support ``` - Get support form page 	
* ``` GET /registration ``` - Get registration page
* ``` POST /registration ``` - Sign up new user
* ``` GET /login ``` - Get login page
* ``` POST /login ``` - Sign in user
* ``` POST /logout``` - Log out user 
# Installation
Clone the repository:

```
git clone https://github.com/LapinDeNeige/Helpdesk.git
```
Install dependencies:
```bash
npm install
```
Configure variables for email notifications, database, and file storage in ```/config``` directory.
Configure variables for server's IP and PORT   in ```.env``` file.

To migrate database Don't forget to pass your database name , login and password to knex.js file
```bash
npx knex migrate:latest
```

Run the application:

```bash
node app.js

```
# Docker installation
Clone the repository:
```
git clone https://github.com/LapinDeNeige/Helpdesk.git
```
Run
```bash
docker-compose up -d 
```
To stop project

```bash
docker compose down
```

# Usage
* Users can submit tickets through the client interface.
* Administrators manage and track tickets through the admin panel.
* ~~Status updates and notifications are automatically sent to the relevant users.~~
* ~~Files can be uploaded and attached to tickets for context.~~

# Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements, bug fixes, or new features.

# License

This project is licensed under the MIT License. 
