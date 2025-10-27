Technologies Used:

1. Backend / Server
Node.js – JavaScript runtime environment for building the server.
Express.js – Web framework for Node.js, used to handle routes and APIs.
2. Database
MongoDB – NoSQL database to store reminders (email, message, time, status).
Mongoose – ODM (Object Data Modeling) library for Node.js, makes MongoDB operations easier.
3. Email Service
Nodemailer – Node.js module to send emails automatically.
Gmail SMTP – Email server for sending emails.
4. Task Scheduling
Node-Cron – To schedule reminders at specific times.
5. Environment Configuration
dotenv – Loads sensitive information (like email and password) from .env file.
6. Optional / Extras
Git & GitHub – Version control and project repository.
Postman / MongoDB Compass – For testing APIs and database.

How It Is Work:
1. User Creates a Reminder
You insert a reminder in the database with fields like:
email – recipient’s email
message – content of the reminder
time – scheduled time for sending
sent – status (false initially)
2. Server and Database Connection
Node.js + Express.js server runs and connects to MongoDB using Mongoose.
Server continuously listens for requests and handles scheduling tasks.
3. Scheduling Reminders
Node-Cron is used to check the database every minute or at a set interval.
It looks for reminders where:
time ≤ current time
sent = false
4. Sending Email
If a reminder is due, the server uses Nodemailer to send an email through Gmail SMTP:
to = reminder email
subject = “Reminder”
5. Updating Status
After sending the email successfully, the sent field in the reminder document is updated to true.
This prevents sending duplicate emails.
6. Repeat
Node-Cron keeps running in the background, checking for new reminders continuously.
