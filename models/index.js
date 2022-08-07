const User = require('./User');
//import our Post model
const Post = require('./Post');
//import our Vote model
const Vote = require('./Vote');
//Create our model associations
//Note: User to Post is one to Many
User.hasMany(Post, {
    foreignKey: 'user_id'
});

//Make reverse assocation to ensure Post cant belong to any others
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

//associating Vote with both User and Post
// Now we can query both User and Post to see their Vote data AKA how many votes a user has made OR how many votes a post has
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

//BUT what about the direct relationship between User - Vote and Post - Vote
// We should still include this >>
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
})

Post.hasMany(Vote, {
    foreignKey: 'post_id'
})

module.exports = { User, Post, Vote };