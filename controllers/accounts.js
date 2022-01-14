const express = require('express');
const accountsRouter = express.Router();
const Account = require('../models/account');
const acctSeed = require('../models/acctSeed.js');


// Seed


accountsRouter.get('/seed', async (req, res) => {
    // to remove any repeat instances of seed data
    await Account.deleteMany({});

    console.log('seed==', acctSeed[0])
    await Account.create(acctSeed, (error, data) => {
        res.redirect('/portfolio');
    });
});

//INDEX


accountsRouter.get('/', (req, res) => {
    Account.find({}, (err, accounts) => {
        res.render('index', { accounts }); //
    });
});

accountsRouter.get ('/login', (req, res) => {
    res.render('login.ejs');
});

//NEW
accountsRouter.get('/new', (req, res) => {
    res.render('new');
});

// DELETE

accountsRouter.delete("/portfolio/:id", (req, res) => {
    Account.findByIdAndRemove(req.params.id, (err, data) => {
      res.redirect("/portfolio")
    });
});
//UPDATE

accountsRouter.put("/portfolio/:id", (req, res) => {
    if (req.body.com === "on") {
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
        (error, ccount)=>{
            res.redirect(`/portfolio/${req.params.id}`)
        }
        )
    })
    
//CREATE
accountsRouter.post('/', (req, res) => {
    req.body.id = !!req.body.id;
    Account.create(req.body, (err, account) => {
        res.redirect('/portfolio');
    });
});



    
//EDIT
accountsRouter.get("/:id/edit", async (req, res) => {
   const account = await Account.findOne({investment: req.params.id})
   console.log('account===', account); 
   res.render('edit', { 
       account
    });
});

// SHOW
accountsRouter.get('/:investment', async (req, res) => {
    // Account.findById(req.params.id, (err, foundAccount) => {
    //     res.render('show', {
    //         account: foundAccount,
    //     });
    // });
    const account = await Account.findOne({investment: req.params.investment});
    res.render('show', {
        account
    })
});

module.exports = accountsRouter;