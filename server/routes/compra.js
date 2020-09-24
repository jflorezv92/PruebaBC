const express = require('express');

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let app = express();

let Compra = require('../models/compra');

// ============================
// Crear nueva compra
// ============================
app.post('/compra', verificaToken, (req, res) => {
    // regresa la nueva compra
    // req.usuario._id
    let body = req.body;

    let compra = new Compra({
        fecha: body.fecha,
        usuario: req.usuario._id,
        productos: body.productos
    });


    compra.save((err, compraDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!compraDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            compra: compraDB
        });


    });


});

// ============================
// Mostrar compras por Usuario
// ============================
app.get('/compra/compras', verificaToken, (req, res) => {
    // Categoria.findById(....);

    

    Compra.find({usuario: req.usuario._id}, (err, compraDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!compraDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El Usuario no es correcto'
                }
            });
        }


        res.json({
            ok: true,
            compra: compraDB
        });

    });


});


module.exports = app;
