const User = require('./User');
//import our Post model
const Post = require('./Post');

//Create our model associations
//Note: User to Post is one to Many
User.hasMany(Post, {
    foreignKey: 'user_id'
});

//Make reverse assocation to ensure Post cant belong to any others
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Post };