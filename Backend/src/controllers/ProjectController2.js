const cnn = require('../repository/connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();


const addProject = async (req, res) => {
    try{
        const { title, link, tags, description, coverphoto, fk_iduser} = req.body
        
        if(!title || !link || !tags || !description){
            return res.status(401).json({ mensagem: "Todos os dados precisam ser preenchidos para criar projeto!" });
        }

        const newUser = await cnn.query('INSERT INTO project (title, link, tags, description, coverphoto, fk_iduser) VALUES (:title, :link, :tags, :description, :coverphoto, :fk_iduser)', {
            replacements: { title, link, tags, description, coverphoto, fk_iduser },
            type: cnn.QueryTypes.INSERT
        });

        return res.status(201).json({newUser, mensagem: "usuario criado"})
    }
    catch(error){
        console.log(error);
        return res.status(500).send(error)
    }
}

const readProject = async (req,res) => {
    try{
        // **Capturando o valor do parâmetro :id**
    const fk_iduser = req.params.id;

    // **Consultando o projeto no banco de dados**
    const project = await cnn.query('SELECT * FROM project WHERE fk_iduser = :fk_iduser', {
      replacements: { fk_iduser },
      type: cnn.QueryTypes.SELECT,
    });

    // **Verificando se o projeto foi encontrado**
    if (!project) {
      return res.status(404).json({ mensagem: "Projeto não encontrado" });
    }

    // **Retornando o projeto encontrado**
    return res.status(200).json(project);
  } catch (error) {
    res.json(error);
  }
        return res.status(201).json({newUser, mensagem: "usuarios carregados"})
}
module.exports = {
    
    addProject,
    readProject
}