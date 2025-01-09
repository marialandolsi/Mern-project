import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormArticle() {
  const navigate = useNavigate();

  const [newArticle, setNewArticle] = useState({
    reference: "",
    prix: "",
    quantite: ""
  });

  const handleChange = (e) => {
    setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/article", newArticle);
      navigate('/article');
    } catch (error) {
      console.error("Error creating Article:", error);
    }
  }

  return (
    <main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white rounded shadow">
      <div className="flex flex-col justify-center">
        <form onSubmit={handleSubmit} className="md:grid grid-cols-1 gap-10">
          <div className="flex flex-col">
            <label htmlFor="reference"> Reference</label>
            <input
              type="text"
              name="reference"
              id="reference"
              placeholder="reference"
              autoComplete="off"
              value={newArticle.reference}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="prix"> Prix</label>
            <input
              type="text"
              name="prix"
              id="prix"
              placeholder="prix"
              autoComplete="off"
              value={newArticle.prix}
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
              placeholder="quantite"
              autoComplete="off"
              value={newArticle.quantite}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-500 font-bold py-2 px-8 rounded shadow border-2 border-yellow-500 hover:bg-transparent hover:text-yellow-500 transition-all duration-300"
          >
            Ajouter Article
          </button>
        </form>
      </div>
    </main>
  );
}

export default FormArticle;
