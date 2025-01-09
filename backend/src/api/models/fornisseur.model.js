module.exports = mongoose => {
    const Schema = mongoose.Schema;
    let FornisseurSchema = new Schema({
        name: { type: String, required: true },
        address: { type: String, required: true },
        email: { type: String, required: true },
        phone: {type: Number, required: true}
    }, {
        timestamps: true
    });

    // Définir la méthode toJSON pour le schéma
    FornisseurSchema.method('toJSON', function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Fornisseur = mongoose.model('Fornisseur', FornisseurSchema);

    // Ajouter la méthode findByIdAndUpdate au modèle
    FornisseurSchema.statics.findByIdAndUpdate = function(id, update, options) {
        return this.findOneAndUpdate({ _id: id }, update, options);
    };
    

    return Fornisseur;
}
