const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize');
const usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
sequelize.sync();  

//GET Retorna usuarios com paginação e ordenação
router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    sequelize.query(`SELECT * FROM usuarios`
    )
        .then(([results, metadata]) => {
            res.json(results);
        }).catch((error) => {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        });
});

//GET Consulta um usuario pelo ID
router.get('/:id', async (req, res) => {
    sequelize.query(`SELECT * FROM usuarios WHERE idusuarios = ?`, { replacements: [req.params.id] })
        .then(([results, metadata]) => {
            if (results.length === 0) {
                res.status(404).json({
                    success: false,
                    message: "Tarefa não encontrada",
                });
            } else {
                res.json({
                    success: true,
                    usuarios: results[0],
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        });
});

//POST Cria um usuario
router.post('/', async (req, res) => {
    try {
        // Encriptar a senha
        const senhaEncriptada = await bcrypt.hash(req.body.senha, 10); // 10 é o número de rounds para gerar o salt
    sequelize.query(`INSERT INTO usuarios (nome, email, senha, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`, 
    
        { replacements: [req.body.nome, req.body.email, senhaEncriptada,new Date(), new Date() ] }
    )
    
        res.status(201).json({
            success: true,
            message: "usuario criado com sucesso",
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


//PUT Atualiza um usuario pelo ID
router.put('/:id', async (req, res) => {
    sequelize.query(`UPDATE usuarios SET nome = ? WHERE idusuarios = ?`,
        { replacements: [req.body.nome, req.params.id] }
    )
        .then(([results, metadata]) => {
            if (metadata.affectedRows === 0) {
                res.status(404).json({
                    success: false,
                    message: "tarefa não encontrada",
                });
            } else {
                res.json({
                    success: true,
                    message: "Tarefa atualizada com sucesso",
                });
            }
        }).catch((error) => {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        });
});

//DELETE Deleta um usuario pelo ID
router.delete('/:id', async (req, res) => {
    sequelize.query(`DELETE FROM usuarios WHERE idusuarios = ?`, { replacements: [req.params.id] })
        .then(([results, metadata]) => {
            if (metadata.affectedRows === 0) {
                res.status(404).json({
                    success: false,
                    message: "tarefa não encontrada",
                });
            } else {
                res.json({
                    success: true,
                    message: "Tarefa deletada com sucesso",
                });
            }
        }).catch((error) => {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        });
});

module.exports = router;