const express = require('express');
const res = require('express/lib/response');
const News = require("../models/newsSchema");
const router = express.Router();


//Sprawdzenie czy istnieje sesja admina
router.all("*", (req, res, next)=>{
  if(!req.session.admin){
    res.redirect("login")
    return;
  }
  next();
});

/* GET home page. */
router.get('/', (req, res) => {
  //console.log(req.session.admin);

  const data = News.find({}, (err, data)=>{
    console.log(data);
    res.render('admin/admin', { title: 'Admin', data });
  });
  
});

router.get("/news/add" , (req, res)=>{
  res.render("admin/news-form", {title: "Dodaj Artykuł",body: {},  errors: {} })
});

router.post("/news/add" , (req, res)=>{

  //Przejmujemy dane z formularza
  const body = req.body;

  //Tworzymy obiekt modelu i przesyłamy do niego dane
  const newsData = new News(body);
  //Sprawdzamy czy są jakieś błędy
  const errors = newsData.validateSync();

  console.log("Błędy: ", errors);

  
  //Zapisujemy dane do bazy danych
  newsData.save((err) => { 
    if(err){
      //Jezeli wystapi blad przy zapisie renderujemy od nowa formularz oraz przesylamy bledy
      res.render("admin/news-form", {title: "Dodaj Artykuł",  errors , body});
      console.log("Błąd przy zapisie");
    }
    else{
      console.log("Przekierowuje do /admin")
      res.redirect("/admin")
    }
  });

  //res.render("admin/news-form", {title: "Dodaj Artykuł", body, errors })
});

//Usuwanie
router.get("/news/delete/:id" , (req, res)=>{
  News.findByIdAndDelete(req.params.id, (err)=>{
    res.redirect("/admin");
  })
});


module.exports = router;
