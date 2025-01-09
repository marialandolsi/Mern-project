const slugify = require('slugify');
const db = require('../../database/db.config');
const cmd = require('../models/commande.model')

//create a new post
exports.create = async (req, res) => {
    const { idclient } = req.params
    // Récupération des données
    const { numeroCommande, dateCommande, articles } = req.body;
    console.log("Données reçues depuis le frontend : ", req.body);

    // Vérification si des données requises sont manquantes
    if (!numeroCommande || !dateCommande || !idclient || !articles) {
        return res.status(400).send({
            message: 'Les champs ne peuvent pas être vides'
        });
    } 
      const  client = idclient
    // Sauvegarde de la nouvelle instance dans la base de données
    const Commande = await cmd.create({numeroCommande,dateCommande,client,articles})
        .then(data => {
            res.status(200).send({
                message: 'Commande créée avec succès'
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({
                message: 'Une erreur est survenue lors de la création de la commande'
            });
        });
};


exports.findAll = (req, res) => {
    cmd.find({

    }).then((data)=> {
        res.send(data);
    }).catch((err)=> {
        console.log(err);
    });
};

exports.delete = (req, res)=> {
    const id = req.params.id;
    if(!id) {
        res.status(400).send({message:"content is required"});
    }
    cmd.findByIdAndDelete(id).then((data)=>{
        if(!data){
            res.status(404).send({message:"Commande not found"});
        }
        res.status(200).send({message: "Commande was successfull deleted"});
    })
};

exports.findOne = (req, res) => {
    const client = req.params.id;
    if(!client) {
        res.status(400).send({message: "content is required"});
    }
    cmd.find({client}).then((data) => {
        res.send(data);
    }).catch((err)=> {
        console.log(err);
    })
};

exports.update =(req, res) =>{
    const id = req.params.id;
    const {numeroCommande, dateCommande, client, article} = req.body;
    if(!id || !numeroCommande || !dateCommande || !client || !article) {
    res.status(400).send({ message: "content is required "});
    }
    cmd.findByIdAndUpdate(id,
    {numeroCommande: numeroCommande, dateCommande: dateCommande, client: client, article: article},
    {useFindAndModify: false}).then((data) =>{
        if(!data){
            res.status(404).send({ message: `Can not update Commande with
            
            id=${id}`});
            }
            res.status(200).send({ message: `Commande was successfully updated`});
            }).catch((err) =>{
            console.log(err);
            });
            }