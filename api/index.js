const express = require('express');
const router = express.Router();

router.get('/post', function(req, res){
  console.log(111)
  res.send({ id: 1 })
})

module.exports = router;