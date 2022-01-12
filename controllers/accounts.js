const express = require('express');
const accountsRouter = express.Router();
const Account = require('../models/accounts');
const acctSeed = require('../models/acctSeed.js');


// Seed


accountsRouter.get('/seed', (req, res) => {
    // to remove any repeat instances of seed data
    Account.deleteMany({}, (error, allAccounts) => { });

    Account.create(acctSeed, (error, data) => {
        res.redirect('/portfolio');
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
accountsRouter.delete("/:id", (req, res) => {

    // original test to see if route was working
    //  res.send("deleting...")
    Account.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect("/portfolio")
    })

})

//UPDATE
accountsRouter.put("/:id", (req, res) => {
    if (req.body.completed === "on") {
        req.body.completed = true
    } else {
        req.body.completed = false
    }
    // res.send(req.body)
    Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (error, updatedAccount)=>{
            res.redirect(`/portfolio/${req.params.id}`)
        }
    )
})

//CREATE
accountsRouter.post('/', (req, res) => {
    req.body.completed = !!req.body.completed;
    Account.create(req.body, (err, account) => {
        res.redirect('/portfolio');
    });
});

//EDIT
accountsRouter.get("/:id/edit", (req, res) => {
    Account.findById(req.params.id, (error, foundAccount) => {
        res.render("edit.ejs", {
            account: foundAccount,
        })
    })
})

// SHOW
accountsRouter.get('/:id', (req, res) => {
    Account.findById(req.params.id, (err, foundBook) => {
        res.render('show.ejs', {
            account: foundAccount,
        });
    });
});

module.exports = accountRouter;