const express = require('express');
const router = express.Router();
const login= "admin";
const password= "admin";


router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});


router.get('/login', (req, res) => {
  res.render('login', { title: 'Logowanie' });
});

router.post('/login', (req, res) => {

  if(req.body.login === login && req.body.password === password)
  {
    req.session.admin = 1;
    res.redirect("/admin");
    console.log("Poprawnie zalogowano");
  }
  else{
    res.redirect("/login");
    console.log("Wpisano błędne hasło lub login");
  }
  
  
});

module.exports = router;
