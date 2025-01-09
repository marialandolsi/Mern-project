const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Article Schema
const ArticleSchema = new Schema({
    reference: { type: String, required: true },
    prix: { type: Number, required: true },
    quantite: { type: Number, required: true },
    fournisseur: [{ type: Schema.Types.ObjectId, ref: 'Fournisseur', required: false }]
}, {
    timestamps: true
});

// Define toJSON method
ArticleSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

// Define the Article model
const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
