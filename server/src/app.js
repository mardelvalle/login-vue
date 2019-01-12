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

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const mongodb_conn_module = require('./mongodbConnModule');
var db = mongodb_conn_module.connect();

var Post = require("../models/post");


const authCheck = (req, res, next) => {
	if(!req.user){
		res.redirect('http://localhost:9082/signout');
	} else {
		next()
	}
}

app.use(cookieSession({
	maxAge: 7 * 24 * 60 * 60 * 1000,
	keys: [keys.session.cookieKey]
}))

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connect');
});

app.use('/auth', authRoutes)

app.get('/signout', (req, res) => {
	res.send(
		[{
		  title: "Hello World!",
		  description: "Hi there! How are you?",
		  authentication: false
		}]
	  )
})


app.get('/posts', (req, res) => {
  Post.find({}, 'title description', function (error, posts) {
	  if (error) { console.error(error); }
	  res.send({
			posts: posts
		})
	}).sort({_id:-1})
})

app.post('/add_post', (req, res) => {
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
app.get('/loggin', authCheck, (req, res) => {
	res.send(
		[{
		  title: "Hello World!",
		  description: "Hi there! How are you?"
		}]
	  )
})

app.put('/posts/:id', (req, res) => {
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

app.delete('/posts/:id', (req, res) => {
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

app.get('/post/:id', (req, res) => {
	var db = req.db;
	Post.findById(req.params.id, 'title description', function (error, post) {
	  if (error) { console.error(error); }
	  res.send(post)
	})
})

app.listen(process.env.PORT || 9082)
