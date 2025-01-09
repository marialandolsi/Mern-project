const slugify = require('slugify');
const db = require('../../database/db.config');
const Fornisseur = db.fornisseur;
//create a new post
exports.create=(req, res)=> {
    //recuperation des données
    const {name, address, email, phone} = req.body;
    if(!name || !address || !email || !phone){
        return res.status(400).send({
            message : 'content can not be empty '
        })
    }
const newFornisseur = new Fornisseur({
    name: name,
    address: address,
    email: email,
    phone: phone

});
newFornisseur.save().then((data) => {
    res.status(200).send({
        message: 'Successfully created Fornisseur'
    });
}).catch(err => {
    console.log(err);
});

};

exports.findAll = (req, res) => {
    Fornisseur.find({

    }).then((data)=> {
        res.send(data);
    }).catch((err)=> {
        console.log(err);
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: "Content is required" });
    }

    Fornisseur.findById(id) 
        .then((data) => {
            if (!data) {
                return res.status(404).send({ message: "Fornisseur not found" });
            }
            res.send(data); 
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({ message: "Internal server error" });
        });
};

exports.delete = (req, res)=> {
    const id = req.params.id;
    if(!id) {
        res.status(400).send({message:"content is required"});
    }
    Fornisseur.findByIdAndDelete(id).then((data)=>{
        if(!data){
            res.status(404).send({message:"Fornisseur not found"});
        }
        res.status(200).send({message: "Fornisseur was successfull deleted"});
    })
};

