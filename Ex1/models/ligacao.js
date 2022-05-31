var mongoose = require('mongoose')

var cidadeSchema = new mongoose.Schema({
    id: String,
    origem : String,
    destino : String,
    distância : Number,
    _id : String,
})


module.exports = mongoose.model('ligacoes', cidadeSchema)