const db = require('../../database/db.config');
const Article = require('../models/article.model');


// Create a new article
exports.create = (req, res) => {
    const { reference, prix, quantite, fournisseur } = req.body;
    if (!reference || !prix || !quantite) {
        return res.status(400).send({
            message: 'Reference, prix, and quantite are required'
        });
    }



    const newArticle = new Article({
        reference,
        prix,
        quantite,
        fournisseur
    });

    newArticle.save()
        .then(data => {
            res.status(201).send({
                message: 'Successfully created Article',
                data
            });
        })
        .catch(err => {
            console.error('Error creating Article:', err);
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Article.'
            });
        });
};

// Retrieve all articles
exports.findAll = (req, res) => {
    Article.find({

    }).then((data)=> {
        res.send(data);
    }).catch((err)=> {
        console.log(err);
    });
};
// Retrieve a single article by ID
exports.findOne = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ message: 'ID is required' });
    }
    try {
        const article = await Article.findById(id);
  
        return res.status(200).send( article );
      } catch (error) {
        console.log('Error fetching articl by ID:', error.message);
        throw error; // Throw error to be caught by GraphQL and returned in the response
      }
};

// Update an article by ID
exports.update = (req, res) => {
    const { id } = req.params;
    const { reference, prix, quantite, fournisseur } = req.body;

    if (!id) {
        return res.status(400).send({ message: 'ID is required' });
    }
    if (!reference || !prix || !quantite) {
        return res.status(400).send({ message: 'Reference, prix, and quantite are required' });
    }

    Article.findByIdAndUpdate(id, { reference, prix, quantite, fournisseur }, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({ message: `Cannot update article with id=${id}` });
            }
            res.status(200).send({ message: 'Article was successfully updated', data });
        })
        .catch(err => {
            console.error('Error updating Article:', err);
            res.status(500).send({ message: 'Error updating Article' });
        });
};

// Delete an article by ID
exports.delete = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).send({ message: 'ID is required' });
    }

    Article.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({ message: 'Article not found' });
            }
            res.status(200).send({ message: 'Article was successfully deleted' });
        })
       
};
