var Complete = require('../lib/mongo.js').Complete;

module.exports = {
	getComplete: function getComplete(){
		return Complete
		.find({})
		.exec();
	},
	create: function create(complete){
		var complete = new Complete({
			_id: complete._id,
			content: complete.content
		});

		return complete.save();
	},
	deleteComplete: function deleteComplete(id){
		return Complete
		.findOneAndRemove({ _id: id })
		.exec();
	}
}