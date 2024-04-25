import dotenv from 'dotenv';
dotenv.config();
import express, { urlencoded } from 'express';
import jwt from 'jsonwebtoken'

const app = express();

app.use (express.json());
app.use (urlencoded({extended: false}))

const posts = [
    {
        username: 'Geofrey',
        title:'Post 1'
    },
    {
        username: 'Kimani',
        title:'Post 2'
    }
]

app.get('/posts', (req, res) => {
    res.json(posts)
})

app.post ('/login', (req, res) => {
    //Authenticate the user

    const username = req.body.username;
    const user = {name: username}

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({accessToken: accessToken})
})

app.listen (3000);