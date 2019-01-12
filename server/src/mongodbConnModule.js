
//	mongoose.connect('mongodb://vue-practice:practice-vue1@ds245234.mlab.com:45234/vue-practice');
var mongoose = require('mongoose');

module.exports.connect = function() {
	mongoose.connect('mongodb://vue-practice:practice-vue1@ds245234.mlab.com:45234/vue-practice');
	var db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error"));
	db.once("open", function(callback){
	  console.log("Connection Succeeded");
	});
	return db;
}