import React, { useState } from "react";

function EditArticleForm({ onSubmit, articleData }) {
  const [editedArticle, setEditedArticle] = useState(articleData);

  const handleChange = (e) => {
    setEditedArticle({ ...editedArticle, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editedArticle);
  };

  return (
    <form onSubmit={handleSubmit} className="md:grid grid-cols-1 gap-10">
      <div className="flex flex-col">
        <label htmlFor="reference">Reference</label>
        <input
          type="text"
          name="reference"
          id="reference"
          placeholder="Reference"
          autoComplete="off"
          value={editedArticle.reference}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="prix">Prix</label>
        <input
          type="text"
          name="prix"
          id="prix"
          placeholder="Prix"
          autoComplete="off"
          value={editedArticle.prix}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="quantite">Quantite</label>
        <input
          type="number"
          name="quantite"
          id="quantite"
          placeholder="Quantite"
          autoComplete="off"
          value={editedArticle.quantite}
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-yellow-500 font-bold py-2 px-8 rounded shadow border-2 border-yellow-500 hover:bg-transparent hover:text-yellow-500 transition-all duration-300"
      >
        Save Changes
      </button>
    </form>
  );
}

export default EditArticleForm;
