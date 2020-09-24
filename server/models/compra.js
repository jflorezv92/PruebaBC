const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let compraSchema = new Schema({
    fecha: { type:String },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    productos: []
});

module.exports = mongoose.model('compra', compraSchema);