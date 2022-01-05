const express = require('express');
const router = express.Router();
const Quiz = require("../models/quizSchema");


router.get('/', (req, res) => {

  const show = !req.session.vote;

  Quiz.find({}, (err, data)=> {
    
    //Obliczanie sumy głosów
    let sum = 0;
    data.forEach((item) => {
      sum = sum + item.vote;
    });

    res.render('quiz', { title: 'Quiz' , data, show, sum});
  })

});

router.post('/', (req, res) => {

  const id = req.body.quiz;

  Quiz.findOne({_id: id}, (err, data)=> {
    data.vote = data.vote + 1;

    data.save(()=> {
      req.session.vote = 1;
      res.redirect("/quiz");
    });

  })

});

module.exports = router;
