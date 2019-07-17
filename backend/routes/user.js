const router = require('express').Router();
let User = require('../models/user.model');


router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: '+ err));
});
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    
    const newUser = new User({
        username,
        password,
        email,
    });

    newUser.save()
        .then(() => res.json('New User added!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/login').post((req, res) => {
    User.findOne({email:req.body.email})
        .then(user => { 
            if(user) {
                if(req.body.password == user.password){
                    const payload = {_id: user._id,
                        username: user.username,
                        email: user.email};
                    res.send(payload);
                }else{
                    res.status(400).json({ error: 'Wrong user password' })
                }
                
            } else {
                res.status(400).json({ error: 'User does not exist' });
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then((users) => { 
            users.username = req.body.username;
            users.email = req.body.email;
            users.save()
                .then(() => res.json('User updated'))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;