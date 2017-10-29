var express = require('express');
var router = express.Router();
var Diamond = require('../models/diamond');
var http=require('http');
var fx = require("money");



router.post('/getDiamondsCurrency', function (req, response, next) {

  var contnet = req.body.cur;
    var url = 'http://api.fixer.io/latest';
    
          http.get(url, function(res){
              var body = '';
    
              res.on('data', function(chunk){
                  body += chunk;
              });
    
              res.on('end', function(){
                 var res = JSON.parse(body);
                  fx.rates = res.rates;
                  var rate = fx(1).from("USD").to(contnet);                
                  return response.status(201).json({
                    message: 'get',
                    val:rate
                      });
    
    
              });
          }).on('error', function(e){
            return response.status(500).json({
              title: 'An error occurred',
              error: e
          });          });

  })


router.post('/add-diamond', function (req, response, next) {
  var newDiamond=req.body;
 // console.log(newDiamond);

  Diamond.addDiamond(newDiamond,function(err, res) {

        if (err) {
          console.log(err);
          return response.status(500).json({
              title: 'An error occurred',
              error: err
          });
      }
    return response.status(201).json({
        message: 'saved to database'
          });
    });

})

router.post('/getDiamondsByDate', function (req, res, next) {
  
    var contnet = req.body;
    Diamond.getDiamondsFilter(contnet,function(err, diamonds) {
      
      var avg= this.getAvgPrice(diamonds);
      var min=this.getMinPrice(diamonds);

      if (err) {
                  console.log(err);
                  return res.status(500).json({
                      title: 'An error occurred',
                      error: err
                  });
              }
      return res.status(201).json({
          message: 'get diamonds',
          val: diamonds,
          avg:avg,
          min:min
        });
        
        
      });
});
  

router.get('/getDiamonds', function (req, res, next) {

  Diamond.getDiamonds(function(err, diamonds) {
    
    if (err) {
                console.log(err);
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
    return res.status(201).json({
        message: 'get diamonds',
        val: diamonds
          });
      
      
          });
  });


  getAvgPrice=function(diamonds)
  {
    var sum=0;
    for(var i=0; i<diamonds.length;i++)
         sum+=parseInt(diamonds[i].priceList);
      
      return  sum/diamonds.length;
  }
  
  getMinPrice=function(diamonds)
  {
  
   var min= Math.min.apply(Math,diamonds.map(function(d){
        return d.priceList;
     }));
  
      return min;
  }



module.exports = router;
