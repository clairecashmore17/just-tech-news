const router = require("express").Router();
//making sure we have the correct modules for retrieving our data
const sequelize = require("sequelize");
const { Post, Comment, User } = require("../models");

router.get("/", (req, res) => {
  Post.findAll({
    attributes: [
      "id",
      "post_url",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      // pass a single post object into the homepage template
      // console.log(dbPostData[0]);
      //dbPostData[0] returns the SEQUELIZE object, more info than we need
      // user .get() to fish out what we really want!
      //THIS line doesnt get us an array of all posts, only one. SO we do the next line
      // res.render("homepage", dbPostData[0].get({ plain: true }));
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("homepage", { posts });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  //This sent all of this information to the page, but it was rather messy
  //   res.render("homepage", {
  //     id: 1,
  //     post_url: "https://handlebarsjs.com/guide/",
  //     title: "Handlebars Docs",
  //     created_at: new Date(),
  //     vote_count: 10,
  //     comments: [{}, {}],
  //     user: {
  //       username: "test_user",
  //     },
  //   });
});

module.exports = router;
