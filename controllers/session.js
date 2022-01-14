
app.get('/any', (req, res) => {
    req.session.anyProperty = 'any value';
    res.send('This is the route that sets the value of req.session.anyProperty');
});

app.get('/retrieve', (req, res) => {
    if (req.session.anyProperty === 'something you want it to') {
        //test to see if that value exists
        //do something if it's a match
        res.send('it matches! cool');
    } else {
        //do something else if it's not
        res.send('nope, not a match');
    }
});

// Routes / Controllers
app.get('/destroy', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.send(error);
        } else {
            res.send({
                success: true,
            });
        }
    });
});

app.get('/hashed', (req, res) => {
    const hashedString = bcrypt.hashSync('example', bcrypt.genSaltSync(10));
    res.send(hashedString);
})

// Routes / Controllers
app.get('/compare', (req, res) => {
	const hashedString = bcrypt.hashSync('example', bcrypt.genSaltSync(10));
	const isSameString = bcrypt.compareSync('yourGuessHere', hashedString);
	res.send(isSameString);
});