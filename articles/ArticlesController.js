const express = require('express')
const router = express.Router()
const Category = require('../categories/Category')
const Article = require('./Article')
const adminAuth = require('../middlewares/adminAuth')
const slugify = require('slugify')

router.get('/admin/articles', adminAuth , (req, res) => {
    Article.findAll({
        include: [{
            model: Category
        }]
    }).then(articles => {
        res.render('admin/articles/index', {articles})
    })
})

router.get('/admin/articles/new', adminAuth , (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/articles/new', { categories })
    })
})

router.post('/articles/save', adminAuth , (req, res) => {
    let title = req.body.title
    let body = req.body.bodyText
    let slug = slugify(title)
    let category = req.body.category

    Article.create({
        title,
        slug,
        body,
        categoryId: category
    }).then(() => {
        res.redirect('/admin/articles')
    })
})

router.post('/articles/delete', adminAuth , (req, res) => {
    let id = req.body.id
    if (id != undefined) {
        if (!isNaN(id)) {
            Article.destroy({
                where: {
                    id
                }
            }).then(() => res.redirect('/admin/articles'))
        } else {
            res.redirect('/admin/articles')
        }
    } else {
        res.redirect('/admin/articles')
    }
})

router.get('/admin/articles/edit/:id', adminAuth , (req, res) => {
    let id = req.params.id
    if(isNaN(id)) {
        res.redirect('/admin/articles')
    }

    Article.findByPk(id).then(article => {
        if(article != undefined) {
            Category.findAll().then(categories => {
                res.render('admin/articles/edit', {article, categories})
            })
        } else {
            res.redirect('/admin/articles')
        }
    }).catch(err => res.redirect('/admin/articles'))
})

router.post('/articles/update', adminAuth , (req, res) => {
    let id = req.body.id
    let title = req.body.title
    let slug = slugify(title)
    let body = req.body.bodyText
    let categoryId = req.body.category

    Article.update({
        title,
        slug,
        body,
        categoryId
    },{
       
        where: {
            id
        }
        
    }).then(() => {
        res.redirect('/admin/articles')
    })
})

router.get('/articles/page/:num', (req, res) => {
    let page = req.params.num
    let offset = 0

    if(isNaN(page)) {
        offset = 0
        page = 0
    } else {
        offset = parseInt(page) * 4
    }
    
    Article.findAndCountAll({
        limit: 4,
        offset,
        include: [{model: Category}],
        order: [
            ["id", "DESC"]
        ]
    }).then(articles => {
        let next;
        
        if(offset + 4 >= articles.count) {
            next = false
        } else {
            next = true
        }

        let result = {
            page: parseInt(page),
            next,
            articles
        }

        res.render("admin/articles/page", {result})
    })
})

module.exports = router