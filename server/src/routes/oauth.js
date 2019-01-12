const router = require('express').Router();
const passport = require('passport');

router.get('/register', (req, res) => {
    console.log("testing")
    res.send(
        [{
            title: "Hello World?",
            description: "Hi there! How are you?"
        }]
    )
})

router.get('/logout', (req,res) => {
    res.send('logging out')
})

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send('you reached the redirect URI');
});


module.exports = router;