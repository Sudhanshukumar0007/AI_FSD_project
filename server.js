const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Signup = require('./models/signup.models');

const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect(process.env.MONGO_DB_URL)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/signup', async (req, res) => {
    try {
        const users = await Signup.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await Signup.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const newUser = new Signup({ name, email, password });
        await newUser.save();

        res.status(201).json(newUser);

    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
