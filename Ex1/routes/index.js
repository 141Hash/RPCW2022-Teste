var express = require('express');
var router = express.Router();
var Controller = require('../controllers/controller')

function devolveCidade(idCidade){
  return Controller.lookUpCidade(idCidade)
            .then(dados => {
              return dados.nome
            })
            .catch(e => {
              res.status(505).jsonp({erro: e})
            })
}

/* GET home page. */
router.get('/cidades', function(req, res, next) {
  if(req.query['distrito'] != undefined){
    var distrito = req.query['distrito']
    Controller.listaCidadeDistrito(distrito)
              .then(dados => {
                lista = []
                dados.forEach(d => {
                   var objeto = {id: d.id, nome: d.nome}
                   lista.push(objeto)
                })
                res.status(200).jsonp(lista)
              })
              .catch(e => {
                res.status(500).jsonp({erro: e})
              })
  }
  else {
    Controller.listaCidade()
              .then(dados => {
                res.status(200).jsonp(dados)
              })
              .catch(e => {
                res.status(501).jsonp({erro: e})
              })
  }
});

router.get('/cidades/nomes', function(req, res, next){
  Controller.listaCidade()
            .then(dados => {
              listaNomes = []
              dados.forEach(d => {
                listaNomes.push(d.nome)
              })
              listaNomes.sort()
              res.status(200).jsonp(listaNomes)
            })
            .catch(e => {
              res.status(502).jsonp({erro: e})
            })

});

router.get('/cidades/:id', function(req, res, next) {
  Controller.lookUpCidade(req.params.id)
         .then(dados => {
          res.status(200).jsonp(dados)
         })
         .catch(e => {
           res.status(503).jsonp({erro: e})
         })
});

router.get('/distritos', function(req, res, next) {
  Controller.listaCidade()
            .then(dados => {
              distritos = {}
              dados.forEach(d => {
                if(distritos[d.distrito] == undefined){
                  distritos[d.distrito] = [{id: d.id, nome: d.nome}]
                }
                else{
                  lista = distritos[d.distrito]
                  lista.push({id: d.id, nome: d.nome})
                  distritos[d.distrito] = lista
                }
              })
              res.status(200).jsonp(distritos)
            })
            .catch(e => {
              res.status(504).jsonp({erro: e})
            })
});

router.get('/ligacoes', function(req, res, next){
  if(req.query['origem'] != undefined){
    var origem = req.query['origem']
    Controller.listaCidade()
              .then(dados => {
                var cidadesNomes = {}
                dados.forEach(d => {
                  cidadesNomes[d.id] = d.nome
                })
                Controller.listaLigacaoOrigem(origem)
                          .then(dadosLigacao => {
                            var listaOrigens = []
                            dadosLigacao.forEach(dl => {
                              var objeto = {id: dl.id, destino: dl.destino, nome: cidadesNomes[dl.destino]}
                              listaOrigens.push(objeto)
                            })
                            res.status(200).jsonp(listaOrigens)
                          })
                          .catch(e => {
                            res.status(505).jsonp({erro: e})
                          })
              })
              .catch(e => {
                res.status(505).jsonp({erro: e})
              })
  }

  else if(req.query['dist'] != undefined){
    var dist = req.query['dist']
    Controller.listaCidade()
              .then(dados => {
                var cidadesNomes = {}
                dados.forEach(d => {
                  cidadesNomes[d.id] = d.nome
                })
                Controller.listaLigacao()
                          .then(dadosLigacao => {
                            var listaDistancias = []
                            dadosLigacao.forEach(dl => {
                              if(dl.distância >= dist){
                                var objeto = {
                                  id: dl.id, 
                                  idOrigem: dl.origem,
                                  origem: cidadesNomes[dl.origem],
                                  idDestino: dl.destino, 
                                  destino: cidadesNomes[dl.destino]
                                }
                                listaDistancias.push(objeto)
                              }
                            })
                            res.status(200).jsonp(listaDistancias)
                          })
                          .catch(e => {
                            res.status(506).jsonp({erro: e})
                          })
              })
              .catch(e => {
                res.status(506).jsonp({erro: e})
              })
  }
})

module.exports = router;
