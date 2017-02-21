var PostModel = require('../models/post.js');
var TemporaryModel = require('../models/temporary.js');
var CompleteModel = require('../models/complete.js');

module.exports = function(app){
	app.get('/',function(req,res){
	})

	app.post('/',function(req,res){
		
		if(req.body.index == 0){
			var post = {
				content: req.body.content
			};

			PostModel.create(post)
			.then(function (result){
				res.json({ 'data': result.id} );
			})
		}else if(req.body.index == 1){
			var data = {}
			PostModel.getPost()
			.then(function (result){
				Array.prototype.push.call(data,result);
				TemporaryModel.getTemporary()
				.then(function (result){
					Array.prototype.push.call(data,result);
					CompleteModel.getComplete()
					.then(function (result){
						Array.prototype.push.call(data,result);
						res.json({ 'data': data} );
					})
				})
			})
		}else if(req.body.index == 2){
			PostModel.deletePost(req.body.id)
			.then(function (result){
				TemporaryModel.create(result)
				.then(function (result){
					console.log('success');
				})
			})
		}else if(req.body.index == 3){
			TemporaryModel.deleteTemporary(req.body.id)
			.then(function (result){
				PostModel.create(result)
				.then(function (result){
					console.log('success');
				})
			})
		}else if(req.body.index == 4){
			TemporaryModel.deleteTemporary(req.body.id)
			.then(function (result){
				CompleteModel.create(result)
				.then(function (result){
					console.log('success');
				})
			})
		}else if(req.body.index == 5){
			CompleteModel.deleteComplete(req.body.id)
			.then(function (result){
				TemporaryModel.create(result)
				.then(function (result){
					console.log('success');
				})
			})
		}
	})
}