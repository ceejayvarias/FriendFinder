var friendData = require('../data/friends.js');

module.exports = function (app) {

	//JSON that stores all friends
	app.get('/api/friends', function (req, res) {
		res.json(friendData);
	});

	//runs code that checks score and returns the best match
	app.post('/api/friends', function (req, res) {
		var match = 0;
		var bestMatch = {};
		for (var i = 0; i < friendData.length; i++) {
			var difference = 0;
			for (var j = 0; j < req.body.scores.length; j++) {
				difference = difference + Math.abs(req.body.scores[j] - friendData[i].scores[j]);
			}
			if (i == 0) {
				match = difference;
				bestMatch = JSON.parse(JSON.stringify(friendData[i]));
			}
			else if (difference < match) {
				match = difference;
				bestMatch = JSON.parse(JSON.stringify(friendData[i]));
			}
		}
		console.log(bestMatch.name);
		console.log(bestMatch.photo);
		friendData.push(req.body);
		res.json(bestMatch);
	});

};