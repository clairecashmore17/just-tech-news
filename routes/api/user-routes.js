const router = require('express').Router();
const { User, Post, Vote, Comment } = require('../../models');


//GET /api/users
router.get('/', (req,res) => {
    //ACcess our User model and run .findAll() method
    // .findAll() -> This querys all of the users from our users table in the database, just like SELECT * FROM users
    User.findAll()
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//GET /api/users/1
router.get('/:id',(req,res)=> {
    //We can user findOne() instead to work with one parameter
    // findOne -> Just like SELECT * FROM users WHERE id = param;
    User.findOne({
        attributes: {exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_url', 'created_at']
              },
              // include the Comment model here:
              {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                  model: Post,
                  attributes: ['title']
                }
              },
              {
                model: Post,
                attributes: ['title'],
                through: Vote,
                as: 'voted_posts'
              }
          ]
    })
    .then( dbUserData => {
        if(!dbUserData){
            res.status(404).json({ message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch( err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// POST /api/users
router.post('/', (req,res) => {

    //expects {username: 'Claire', email: 'cbear5@live.com', password: 'password1234'}
    //.create() works like: INSERT INTO users (username, email, password) VALUES ('Claire', 'cbear5@live.com','password1234')
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then( dbUserData => res.json(dbUserData))
    .catch( err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// post to request login info
router.post('/login', (req, res) => {
    // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }
  
      const validPassword = dbUserData.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });

// PUT /api/users/1
router.put('/:id', (req,res) => {

    //expects {username: 'Claire2', email: 'cbear5@live.com2', password: '9assword1234'}
    
    //if req.body has exact key/value paris to match the mdoel, you can just use req.body instead
    /*
        .update() is like
        UPDATE users
        SET username = "Lernantino", email = "lernantino@gmail.com", password = "newPassword1234"
        WHERE id = 1;
    */
    User.update(req.body, {
        // We have this for the updated password query
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData[0]) {
            res.status(404).json({message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//DELETE /api/users/1
router.delete('/:id', (req,res) => {

    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;