var mongoose = require('mongoose')

var cidadeSchema = new mongoose.Schema({
    id: String,
    nome : String,
    população : String,
    descrição : String,
    _id : String,
    distrito: String
})


module.exports = mongoose.model('cidades', cidadeSchema)