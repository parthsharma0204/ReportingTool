// Import mongoose
const mongoose = require('mongoose');

// MongoDB connection URI (replace 'newdb' with your database name)
const mongoURI = 'mongodb://localhost:27017/login';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define Schema
const logisticSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create Model
const User = mongoose.model('users', logisticSchema);

module.exports = User;
