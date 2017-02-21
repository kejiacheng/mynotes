var Temporary = require('../lib/mongo.js').Temporary;

module.exports = {
	getTemporary: function getTemporary(){
		return Temporary
		.find({})
		.exec();
	},
	create: function create(temporary){
		var temporary = new Temporary({
			_id: temporary._id,
			content: temporary.content
		});

		return temporary.save();
	},
	deleteTemporary: function deleteTemporary(id){
		return Temporary
		.findOneAndRemove({ _id: id })
		.exec();
	}
}