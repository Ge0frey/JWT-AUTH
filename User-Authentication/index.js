import express, { urlencoded } from 'express';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());
app.use(urlencoded({extended: false}))

const users = []

app.get('/users', (req,res) => {
    res.json(users);
});

app.post ('/users', async (req, res) => {

    try {
        console.log("Received request body:", req.body);

        const salt = await bcrypt.genSalt(10);
        console.log("Generated salt:", salt);

        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        console.log("Generated Hashedpassword:", hashedPassword);


        const {name, password} = req.body
        const user = {
            name,
            password: hashedPassword
        }
        users.push(user);
        res.json(users)
    }
    catch (error) {
        console.error(error)
    }

})

app.post('/users/login', async (req, res) => {
    const user = users.find (user => user.name === req.body.name)
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('success')
        }  else {
            res.send('Not allowed')
        }
    } catch (error) {
        res.status(500).send()
    }
})

app.listen (3001, () => {
    console.log(`App listening at port 3001`);
});