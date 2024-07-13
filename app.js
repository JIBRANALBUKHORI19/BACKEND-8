const session = require('express-session');
const express = require('express');
const user = require('./controller/user');
const app = express();
const port = 5000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret: 'secret-key',
    resave : false,
    saveUninitialized: false,
    session:{

    }
}))

const authenticate = (req, res, next) => {
    if(req?.session.isAuthenticated) {
        next()
    }else {
        res.status(401).send('tidak ter authentikasi')
    }
}

app.post('/login', (req,res) => {
    const {username, password} = req.body
    if(username === 'admin' && password === 'admin'){
        req.session.isAuthenticated = true
        res.send('login sukses')
    } else {
        res.status(401).send('username atau password salah')
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err){
            console.log(err)
        }else{
            res.send('logout')
        }
    })
})

app.get('/ibnu', (req, res) => {
    res.send('anda masuk pada route (GET)')
})

app.get('/jibran', authenticate, (req, res) => {
    res.send('anda masuk pada route (GET)')
})

app.post('/jibran', authenticate, (req, res) => {
    res.send('anda masuk pada route (GET)')
})

app.put('/jibran', authenticate, (req, res) => {
    res.send('anda masuk pada route (GET)')
})

app.delete('/jibran', authenticate, (req, res) => {
    res.send('anda masuk pada route (GET)')
})

app.listen(port, () => {
    console.log(`server berjalan dengan localhost:${port}`);
})