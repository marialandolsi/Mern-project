const mongoose = require('mongoose');

const CommendeSchema = new mongoose.Schema(
  {
    articles: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article', 
      required: true
    }],
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',  
      required: true
    },
    dateCommande: {
      type: Date,
      required: true,
    },
    numeroCommande: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Commende = mongoose.model('Commende', CommendeSchema);
module.exports = Commende;
