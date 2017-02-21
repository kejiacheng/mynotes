var Post = require('../lib/mongo').Post;

module.exports = {
	create: function create(post){
		var post = new Post({
			content: post.content
		});

		return post.save();
	},
	getPost: function getPost(){
		return Post
		.find({})
		.exec();
	},
	deletePost: function deletePost(id){
		return Post
		.findOneAndRemove({ _id: id })
		.exec();
	}
}