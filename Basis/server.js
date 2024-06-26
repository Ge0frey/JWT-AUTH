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

app.get('/posts', authenticateToken,(req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

app.post ('/login', (req, res) => {
    //Authenticate the user

    const username = req.body.username;
    const user = {name: username}

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({accessToken: accessToken})
})

function authenticateToken (req, res, next) {
    const authHeader = req.headers['Authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if ( token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen (3000);