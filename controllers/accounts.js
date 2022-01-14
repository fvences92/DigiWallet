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

//START ROUTE

accountsRouter.get('/', (req, res) => {
    Account.find({}, (err, accounts) => {
        res.render('login') //
    });
});


accountsRouter.get('/returning', (req, res) => {
    res.render('returning')
    
    //NEW
    accountsRouter.get('/portfolio', async (req, res) => {
        const account = await res.render('index'); {
            account
        }
    });
});
accountsRouter.get('/new', (req, res) => {
    res.render('new');
});


//DELETE
accountsRouter.delete("/:investment", async (req, res) => {
   const account= await Account.findByIdAndRemove({investment: req.params._investment});
      res.redirect("/portfolio", {
          account
      })
    })

//UPDATE
accountsRouter.post("/:investment", (req, res) => {
    // res.send(req.body)
    Account.findByIdAndUpdate(
        req.params.investment,
        req.body,
        {
            new: true,
        },
        (error, updatedAccount)=>{
            res.redirect(`/portfolio/${req.params.investment}`)
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