const express = require('express');
const cors = require('cors')
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '..')));
app.use(express.json());

const readUsers = () => {
const data = fs.readFileSync('users.json');
return JSON.parse(data);
};


const saveUsers = (users) => {
fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
};

app.post('/signup', (req, res) => {
const { username, email, password, confirmPassword } = req.body;
const users = readUsers();

// Validations
if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required.' });
}


if (!/^[A-Za-z][A-Za-z0-9_]{2,19}$/.test(username)) {
    return res.status(400).json({ message: 'Username must start with a letter.' });
}


if (!/^[A-Za-z][A-Za-z0-9_.+-]*@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
}
if(password.length < 8 ){
    return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
}

if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
}

if (users.find((u) => u.username === username)) {
    return res.status(400).json({ message: 'Username already exists.' });
}
if(users.find((u) => u.email === email)) {
    return res.status(400).json({ message: 'Email already exists.' });
}

// Save 
users.push({ username, email, password });
saveUsers(users);

res.json({ message: 'Signup successful!' });
});


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
