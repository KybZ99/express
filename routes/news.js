const express = require('express');
const router = express.Router();
const News = require("../models/newsSchema");

/* GET home page. */
router.get('/', (req, res) => {

  //console.log(req.query);
  const search = req.query.search || "";

  const findNews = News
    .find({title: new RegExp(search.trim(), "i")})
    .sort({created: -1});

  findNews.exec((err, data)=> {
    console.log(data);

    res.render('news', { title: 'News' , data, search});
  })
  //res.render('news', { title: 'News' });
});

module.exports = router;
