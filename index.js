const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const User = require("./config"); // Changed from collection to User for clarity

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render("login");
});

app.get('/login', (req, res) => {
    res.render("login");
});

app.get('/signup', (req, res) => {
    res.render("signup");
});
app.get('/forgotpassword', (req, res) => {
    res.render("forgotpassword");
});

// app.get('/home', (req, res) => {
//     res.render("home"); // Render the home page
// });

// Dashboard routes
app.get('/Dashboard/mainpage', (req, res) => {
    res.render("Dashboard/mainpage"); // Render the mainpage in Dashboard
});
app.get('/Dashboard/mainpage.ejs', (req, res) => {
    res.render("Dashboard/mainpage"); // Render the mainpage in Dashboard
});

app.get('/Dashboard/defaulterreport.ejs', (req, res) => {
    res.render("Dashboard/defaulterreport"); // Render the defaulter report page
});

app.get('/Dashboard/mylist.ejs', (req, res) => {
    res.render("Dashboard/mylist"); // Render the my monitoring list page
});
app.get('/defaulterinfo/view.ejs', (req, res) => {
    res.render("defaulterinfo/view"); // Render the my monitoring list page
});

app.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const data = {
            email: email,
            password: hashedPassword
        };

        const existingUser = await User.findOne({ email: data.email });

        if (existingUser) {
            res.send("User already exists, try another email");
        } else {
            const userdata = await User.create(data);
            console.log(userdata);
            res.status(201).send('User created successfully');
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user');
    }
});

// Login route
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (user && await bcrypt.compare(password, user.password)) {
            res.redirect('/Dashboard/mainpage'); // Redirect to mainpage in Dashboard on successful login
        } else {
            res.send('Invalid email or password');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Error during login');
    }
});

// Forgot password route
app.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email });

        if (user) {
            // Placeholder for sending a password reset email
            res.send('Password reset link has been sent to your email');
        } else {
            res.send('Email not found');
        }
    } catch (error) {
        console.error('Error during forgot password:', error);
        res.status(500).send('Error during forgot password');
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
});
