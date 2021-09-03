//--Variables
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const msg = `Welcome to our schedule website!`
//--Destructuring in declaring variables referencing data which has users and schedules
const { users, schedules } = require('./data')
const path = require('path')

// -------Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// -------Get request router for the home page
app.get("/", (req, res) => {
    res.send(msg)
    // can’t write any stmts after a response is sent back
})

// -------Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// -------Get all the users --route handler
app.get("/users", (req, res) => {
    res.json(users)
})

// -------Get all the schedules --route handler
app.get("/schedules", (req, res) => {
    res.json(schedules)
})

// --------Get specific user data
app.get("/users/:id", (req, res) => {
    let user = [];
    const user_found = users.some((user, index) => index === parseInt(req.params.id))
    //Flag to check if the entry exists
    console.log(user_found)
    if (user_found) {
        for (let index = 0; index < users.length; index++) {
            console.log(index)
            if (index === parseInt(req.params.id)) {
                user.push(users[index]);
                // return res.json(user)
                res.json(user);
            }
        }
    } else {

        return res.status(400).json({ msg: `There is no user found with id: ${parseInt(req.params.id)}` })
    }
});

// ---------Create a new user
app.post('/users', (res, req) => {
    // {'firstname', 'lastname', 'email','password'}
    res.json(req.body)
})

// ---------Get specific schedules data
app.get("/users/:id/schedules", (req, res) => {
    //Flag to check if the entry exists    
    const user_found = schedules.some(schedule => schedule.user_id === parseInt(req.params.id))
    console.log(user_found)
    if (user_found) {
        res.json(schedules.filter(schedule => schedule.user_id === parseInt(req.params.id)))
    }
    else {
        res.status(400).json({ msg: `There are no schedules for the user id: ${parseInt(req.params.id)}` })
    }
})

// PORT 
app.listen(PORT, () => {
    console.log(`Hello Guys http://localhost:${PORT}`)
})
