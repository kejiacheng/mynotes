var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mynotes');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
	content: String
});

var Post = mongoose.model('unknown', PostSchema);

exports.Post = Post;

var TemporarySchema = new Schema({
	content: String
});

var Temporary = mongoose.model('temporary', TemporarySchema);

exports.Temporary = Temporary;

var CompleteSchema = new Schema({
	content: String
});

var Complete = mongoose.model('complete', CompleteSchema);

exports.Complete = Complete;
