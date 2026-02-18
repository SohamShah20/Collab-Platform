const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

console.log("Testing connection to:", mongoURI.replace(/:([^:@]{1,})@/, ":****@")); // Hide password in logs

mongoose.connect(mongoURI)
    .then(() => {
        console.log("MongoDB Connection Successful!");
        process.exit(0);
    })
    .catch(err => {
        console.error(" MongoDB Connection Failed:");
        console.error(err);
        process.exit(1);
    });
