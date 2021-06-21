const config = require("../config/auth.config");
const db = require("../models");
const Post = db.post;

exports.all = (req, res) => {
    Post.find()
    .sort( { published: -1 } )
    .exec()
    .then(data=>{
        console.log(data);
        res.status(200).json(data)
    })
    .catch(err=>{console.log(err);})
};
exports.get = (id, req, res) => {
    Post.find({"_id":id})
    .exec()
    .then(data=>{
        console.log(data);
        res.status(200).json(data)
    })
    .catch(err=>{console.log(err);})
}

exports.add = (req, res) => {
    // Get values
	const { authorId, title, content } = req.body

	if ( authorId === '' || authorId == null) {
		res.status(422).json({
			'error': 'Not connected'
		}).end()
	} else if ( title === '' || title == null ) {
		res.status(422).json({
			'error': 'Need title'
		}).end()
	} else if ( content === '' || content == null ) {
		res.status(422).json({
			'error': 'Need content'
		}).end()
	}else {
		const post = new Post({ authorId, title, content})
		post.save()
			.then(() => {
				res.status(200).json({
					'msg': 'Data entered successfuly.'
				}).end()
			})
			.catch(() => {
				res.status(500).json({
					'msg': 'Error while saving data to database. Please try again later.'
				}).end()
			})		
	}
};



