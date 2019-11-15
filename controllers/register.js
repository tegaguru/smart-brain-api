const handleRegister = (req, res, db, bcrypts) =>{
    const {name, email, password} = req.body;
    if(!email || !name || !password){
        return res.status(400).json('incorrect form submissions')
    }
    var hash = bcrypt.hashSync(password, 1);
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user =>{
                        res.json(user[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
    .catch(err=> res.status(400).json('unable to register'))
}


module.exports = {
    handleRegister: handleRegister
};
