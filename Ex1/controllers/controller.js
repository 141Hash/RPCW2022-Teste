var Cidade = require('../models/cidade')
var Ligacao = require('../models/ligacao')

module.exports.listaCidade = () => {
    return Cidade.find({}, {_id: 0, id: 1, nome: 1, distrito: 1}).exec()
}

module.exports.listaCidadeDistrito = distrito =>  {
    var d = new RegExp(distrito + "$")
    return Cidade.find({distrito: d}).exec()
}

module.exports.lookUpCidade = id => {
    return Cidade.findOne({id : id}).exec()
}

module.exports.listaLigacao = () => {
    return Ligacao.find().exec()
}

module.exports.lookUpLigacao = id => {
    return Ligacao.findOne({id : id}).exec()
}

module.exports.listaLigacaoOrigem = origem =>  {
    var o = new RegExp(origem + "$")
    return Ligacao.find({origem: o}).exec()
}



