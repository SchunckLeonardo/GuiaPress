const express = require('express')
const router = express.Router()
const User = require('./User')
const bcrypty = require('bcryptjs')
const adminAuth = require('../middlewares/adminAuth')

router.get('/admin/users', adminAuth , (req, res) => {
    User.findAll().then(users => {
        res.render('admin/users/index', { users })
    })
})

router.get('/admin/users/create', adminAuth , (req, res) => {
    User.findAll().then(users => {
        res.render('admin/users/create', {users, error:false})
    })
})

router.post('/users/create', adminAuth , (req, res) => {
    let email = req.body.email
    let password = req.body.password

    User.findOne({ where: { email } }).then(user => {
        if(user == undefined) {
            let salt = bcrypty.genSaltSync(10)
            let hash = bcrypty.hashSync(password, salt)
        
            User.create({
                email,
                password: hash
            }).then(() => {
                res.redirect('/admin/users')
            }).catch(err => {
                res.redirect('/admin/users/create')
            })
        } else {
            res.render('admin/users/create', {error: true})
        }
    })
})

router.post('/users/delete', adminAuth , (req, res) => {
    let id = req.body.id

    User.destroy({
        where: {id}
    }).then(() => {
        res.redirect('/admin/users')
    })
})

router.get('/login', (req, res) => {
    if(req.session.user == undefined || req.session.user == "") {
        res.render('login', {error: false})
    } else {
        res.redirect('/admin/articles')
    }
})

router.post('/authenticate', (req, res) => {
    let email = req.body.email
    let password = req.body.password

    User.findOne({
        where: {email}
    }).then(user => {
        if(user != undefined) {
            let correct = bcrypty.compareSync(password, user.password)
            if(correct) {
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect('/admin/articles')
            } else {
                res.render('login', {error: true})
            }
        } else {
            res.render('login', {error: true})
        }
    })
})

router.get("/logout", (req, res) => {
    req.session.user = ""
    res.redirect('/')
})

module.exports = router