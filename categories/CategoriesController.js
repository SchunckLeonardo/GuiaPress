const express = require('express')
const router = express.Router()
const Category = require('./Category')
const Article = require('../articles/Article')
const adminAuth = require('../middlewares/adminAuth')

router.get('/admin/categories/new', adminAuth , (req, res) => {
    res.render('admin/categories/new')
})

router.post('/categories/save', adminAuth , (req, res) => {
    let title = req.body.title
    let slug = title.split(" ").join("-")
    if (title != undefined) {
        Category.create({
            title,
            slug
        }).then(() => {
            res.redirect('/admin/categories')
        })
    } else {
        res.redirect('/admin/categories/new')
    }
})

router.get('/admin/categories', adminAuth , (req, res) => {
    Category.findAll({
        raw: true
    }).then(categories => {
        res.render('admin/categories/index', { categories })
    })
})

router.post('/categories/delete', adminAuth, (req, res) => {
    let id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {
            Article.destroy({
                where: {
                    categoryId: id
                }
            }).then(() => {
                Category.destroy({
                    where: {
                        id
                    }
                }).then(() => {
                    res.redirect('/admin/categories');
                }).catch(err => {
                    res.redirect('/admin/categories');
                });
            }).catch(err => {
                res.redirect('/admin/categories');
            });
        } else {
            res.redirect('/admin/categories');
        }
    } else {
        res.redirect('/admin/categories');
    }
});


router.get('/admin/categories/edit/:id', adminAuth, (req, res) => {
    let id = req.params.id
    if (isNaN(id)) {
        res.redirect('/admin/categories')
    }

    Category.findByPk(id).then(category => {
        if (category != undefined) {
            res.render('admin/categories/edit', { category })
        } else {
            res.redirect('/admin/categories')
        }
    }).catch(err => {
        res.redirect('/admin/categories')
    })
})

router.post('/categories/update', adminAuth, (req, res) => {
    let id = req.body.id
    let title = req.body.title
    let slug = title.split(" ").join('-')
    Category.update({
        title,
        slug
    }, {
        where: {
            id
        }
    }).then(() => {
        res.redirect('/admin/categories')
    }).catch(err => res.redirect('/admin/categories'))
})

module.exports = router