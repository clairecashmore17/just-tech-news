const router = require('express').Router();
const { Post,User } = require('../../models');

//create a route to retrieve all the posts on the database
router.get('/', (req,res)=> {
    console.log("=================");
    Post.findAll({
        //Query Config
        attributes: ['id', 'post_url', 'title', 'created_at'],
        // this shows our posts in most recent order
        order: [['created_at', 'DESC']],
        //performing the JOIN with include
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    //create a promise that captures response from database call
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Create a route to retrieve a single post
router.get('/:id', (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post_url', 'title', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ messgage: 'No post found with this id '});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//create a route to create posts
router.post('/', (req,res) => {
    //expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.body.user_id
    })
    .then( dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

//create a route to UPDATE posts
router.put('/:id', (req,res)=> {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//create a route to DELETE posts
router.delete('/:id', (req,res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({ messgage: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;