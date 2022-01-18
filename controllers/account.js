
const express = require('express');
const account = require('../models/account');
const accountsRouter = express.Router();
const Account = require('../models/account');
const acctSeed = require('../models/acctSeed.js');


// Seed


accountsRouter.get('/seed', async (req, res) => {
    // to remove any repeat instances of seed data
    await Account.deleteMany({});

    console.log('seed==', acctSeed[0])
    await Account.create(acctSeed, (error, data) => {
        res.redirect('/portfolio', {
            account
        });
    });
});

//INDEX

accountsRouter.get('/', (req, res) => {
    Account.find({}, (err, accounts) => {
        res.render('index', { accounts }); //
    });
});
//NEW

accountsRouter.get('/new', (req, res) => {
    res.render('new');
});

//DELETE 

accountsRouter.delete('/:id', (req, res) => {
    account.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/portfolio')
    });
});

//UPDATE
accountsRouter.put("/:id", (req, res) => {
    if (req.body.completed === "on") {
        req.body.completed = true
    } else {
        req.body.completed = false
    }
    // res.send(req.body)
    Account.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (error, updatedAccount)=>{
            res.redirect('/portfolio/')
        }
    )
})
//CREATE
accountsRouter.post('/', (req, res) => {
    req.body.completed = !!req.body.completed;
    Account.create(req.body, (err, createdAccount) => {
        res.redirect('/portfolio');
    });
});

//EDIT
accountsRouter.get("/:id/edit", async (req, res) => {
    const account = await Account.findOne({ investment: req.params.id })
    console.log('account===', account);
    res.render('edit', {
        account
    });
});

// SHOW
accountsRouter.get('/:id', async (req, res) => {
    const account = await Account.findOne({ id: req.params.id });
    res.render('show', {
        account
    });
});

module.exports = accountsRouter;

