require('dotenv').config();
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const Reminder = require("./models/Reminder");

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✔ Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Node-Cron job runs every minute
cron.schedule('* * * * *', async () => {
  const now = new Date();
  const reminders = await Reminder.find({ sent: false, time: { $lte: now } });

  reminders.forEach(reminder => {
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: reminder.email,
      subject: "Reminder Notification",
      text: reminder.message
    }, async (err, info) => {
      if(err) {
        console.log("❌ Error sending email:", err);
      } else {
        console.log(`📧 Reminder sent to ${reminder.email}`);
        reminder.sent = true;
        await reminder.save();
      }
    });
  });
});


const PORT = process.env.PORT || 3000;
console.log(`🚀 Server running on port ${PORT}`);
transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: "jenistajones2006@gmail.com",
  subject: "Test Reminder",
  text: "This is a test",
}, (err, info) => {
  if (err) console.log(err);
  else console.log("Test email sent:", info.response);
});