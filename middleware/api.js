module.exports = function (){
  return function(req, res, next){
    const resBody = res.body;
    if(resBody !== undefined){
      res.send({ status: 'SUCCESS', message: resBody })
    }else{
      res.send({ status: 'FAILED', message: 'error' })
    }
  }
}