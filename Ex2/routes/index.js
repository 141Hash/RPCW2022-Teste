var express = require('express');
var router = express.Router();
var axios = require('axios')

token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTRlY2VhNmI1ZDVjMjQ3NmNmMDhiMSIsImxldmVsIjozLjUsImVudGlkYWRlIjoiZW50X0EzRVMiLCJlbWFpbCI6InJwY3cyMDIyQGdtYWlsLmNvbSIsImlhdCI6MTY1NDAxNjM1MiwiZXhwIjoxNjU0MDQ1MTUyfQ.fbvoWSAx4pNbnZz1fVoGnVfw0AMa2evmOu68MGm7uI7UMBdjpyXx4lqgh2UU5ux_n08DPdVvlMS6YaenFTD5mkqDjpkiu6Hpzewa_pblRH-yO4lK_qJI2L7yvFNGGQVg1d6vtsh9Zev7o1BYGXGGp9248w_FRcpYBp6aX-1ZwTulgysonf7DnNWY5g9Xu_yQx9srvxUTWOQ9Ba2g70vM8yvoIoQ1S7e0r0ot5JTQ7DjyydlmDFgkLvrPG1biLPgbJTfdjRZzXCAFny-oz6h_dCrVSdDO-tVAGanmA8n0GsHz5jrKbYFqx86irynyGU7ufbASqDdYMNwRgAHerQV47g"

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.get('/classes', function(req, res, next) {
  axios.get("http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=" + token)
    .then(dadosClasses => {
      var listaClasses = dadosClasses.data
      res.render('classesN1', {classesN1: listaClasses})
      })
      .catch(function(erro){
        res.render('error', { erro: 'erro' });
      })
});

router.get('/classes/:codigo', function(req, res, next) {
  var codigo = req.params.codigo
  axios.get("http://clav-api.di.uminho.pt/v2/classes/c" + codigo + "?token=" + token)
    .then(dadosClasses => {
      var classe = dadosClasses.data
      res.render('classes', {classe: classe})
      })
      .catch(function(erro){
        res.render('error', { erro: 'erro' });
      })
});

router.get('/termosIndice', function(req, res, next) {
  axios.get("http://clav-api.di.uminho.pt/v2/termosIndice?token=" + token)
  .then(dadosClasses => {
    var termos = dadosClasses.data
    res.render('termos', {termos: termos})
    })
    .catch(function(erro){
      res.render('error', { erro: 'erro' });
    })
})

module.exports = router;
