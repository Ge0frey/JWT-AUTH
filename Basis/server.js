import express, { urlencoded } from 'express';
import jwt from 'jsonwebtoken'

app.use (express.json());

const app = express();

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

    jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
})

app.listen (3000);