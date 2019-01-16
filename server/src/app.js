const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const authRoutes = require('./routes/oauth')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const passportSetup = require('./config/passport-setup.js')
const cookieSession = require('cookie-session')
const passport = require('passport')
const path = require('path')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const mongodb_conn_module = require('./mongodbConnModule');
var db = mongodb_conn_module.connect();

var Post = require("../models/post");


app.use(cookieSession({
	maxAge: 7 * 24 * 60 * 60 * 1000,
	keys: [keys.session.cookieKey]
}))

app.use(passport.initialize());
app.use(passport.session());

const authCheck = (req, res, next) => {
	console.log("reeeee" + req.user)
	if(!req.user){
		res.redirect('http://localhost:9080/signout');
	} else {
		next()
	}
}


mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connect');
});

app.use('/auth', authRoutes)

app.post('/add_post', authCheck, (req, res) => {
	var db = req.db;
	var title = req.body.title;
	var description = req.body.description;
	var new_post = new Post({
		title: title,
		description: description
	})

	new_post.save(function (error) {
		if (error) {
			console.log(error)
		}
		res.send({
			success: true
		})
	})
})
app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/signout');
})

app.put('/posts/:id', authCheck, (req, res) => {
	var db = req.db;
	Post.findById(req.params.id, 'title description', function (error, post) {
	  if (error) { console.error(error); }

	  post.title = req.body.title
	  post.description = req.body.description
	  post.save(function (error) {
			if (error) {
				console.log(error)
			}
			res.send({
				success: true
			})
		})
	})
})

app.delete('/posts/:id', authCheck, (req, res) => {
	var db = req.db;
	Post.remove({
		_id: req.params.id
	}, function(err, post){
		if (err)
			res.send(err)
		res.send({
			success: true
		})
	})
})

app.get('/post/:id', authCheck, (req, res) => {
	var db = req.db;
	Post.findById(req.params.id, 'title description', function (error, post) {
	  if (error) { console.error(error); }
	  res.send(post)
	})
})

app.use( '/static', express.static( path.join( __dirname, '../../client/dist/static') ) );

app.get( '/', passport.authenticate('google', { scope: ['profile'] } ), ( req, res ) => {
	let filePath = path.join( __dirname, '../../client/dist/index.html' );
	res.sendFile( filePath );
});

app.get('/signout', (req, res) => {
	console.log(res.user)
	let filePath = path.join( __dirname, '../../client/dist/index.html' );
	res.sendFile( filePath );
})

app.get('/posts', authCheck, (req, res) => {
	console.log("new" + res.user)
  Post.find({}, 'title description', function (error, posts) {
	  if (error) { console.error(error); }
	  res.send({
			posts: posts
		})
	}).sort({_id:-1})
	console.log("re" + req.user)
})

app.listen(process.env.PORT || 9082)
