const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const session = require('express-session')

const categoriesController = require('./categories/CategoriesController')
const articlesController = require('./articles/ArticlesController')
const usersController = require('./user/userController')

const Category = require('./categories/Category')
const Article = require('./articles/Article')
const User = require('./user/User')

// Database
connection.authenticate()
    .then(() => console.log('Connected with database'))
    .catch(err => console.log(err))

// View engine
app.set('view engine', 'ejs')

// Sessions
app.use(session({
    secret: "qualquercoisa",
    cookie: {
        maxAge: 30000000
    }
}))

// Static Files
app.use(express.static('public'))

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', categoriesController)
app.use('/', articlesController)
app.use('/', usersController)

app.get('/categories', (req, res) => {
    Category.findAll().then(categories => {
        res.render('category', {categories})
    })
})

app.get('/categories/:slug', (req, res) => {
    let slug = req.params.slug
    Category.findOne({
        where: {slug}
    }).then(category => {
        if(category != undefined) {
            Article.findAll({
                where: {
                    categoryId: category.id
                }
            }).then(articles => {
                res.render('categoryArticle', {category, articles})
            })
        } else {
            res.redirect('/categories')
        }
    })
    }
)

app.get('/:slug', (req, res) => {
    let slug = req.params.slug
    Article.findOne({
        where: {
            slug
        }
    }).then(article => {
        if(article != undefined) {
            res.render('article', {article})
        } else {
            res.redirect('/')
        }
    }).catch(err => {
        res.redirect('/')
    })
})

app.get('/', (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4,
        include: [{model: Category}]
    }).then(articles => {
        res.render('index', {articles})
    })
})

app.listen(8080, () => {
    console.log('Starting server')
})