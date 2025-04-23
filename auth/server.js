    const express = require('express');
    const cors = require('cors')
    const fs = require('fs');
    const path = require('path');
    const app = express();
    const PORT = 3000;

    // Middleware
    app.use(cors())
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.json());

    // Utility: Read users
    const readUsers = () => {
    const data = fs.readFileSync('users.json');
    return JSON.parse(data);
    };

    // Utility: Save users
    const saveUsers = (users) => {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    };

    // Signup route
    app.post('/signup', (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    const users = readUsers();

    // Validations
    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }

    if (users.find((u) => u.username === username)) {
        return res.status(400).json({ message: 'Username already exists.' });
    }

    // Save new user
    users.push({ username, email, password });
    saveUsers(users);

    res.json({ message: 'Signup successful!' });
    });

    // Login route
    app.post('/login', (req, res) => {
        const { email, password } = req.body;
        const users = readUsers();
      
        const user = users.find((u) => u.email === email && u.password === password);
      
        if (!user) {
          return res.status(401).json({ message: 'Invalid credentials.' });
        }
      
        res.json({ message: 'Loggedin successfully!', username: user.username });
      });
      

    app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    });
