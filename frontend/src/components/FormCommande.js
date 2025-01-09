import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function CommandeForm() {
  const navigate = useNavigate();
  const { id: clientId } = useParams(); // Get clientId from URL parameters

  const [newCommande, setNewCommande] = useState({
    articles: [],
    client: clientId,
    dateCommande: new Date().toISOString().slice(0, 10), // Default to current date
    numeroCommande: "", // This should be generated or input by the user
  });
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/article");
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const handleChange = (e) => {
    setNewCommande({ ...newCommande, [e.target.name]: e.target.value });
  };

  const handleArticleChange = (e) => {
    const selectedArticles = Array.from(e.target.selectedOptions, option => option.value);
    // Update the selected articles directly with their references
    setNewCommande({ ...newCommande, articles: selectedArticles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/api/commande/${clientId}`, newCommande);
      navigate(`/commande/${clientId}`); // Navigate to commandes list page or relevant page
    } catch (error) {
      console.error("Error creating commande:", error);
    }
  };

  return (
    <>
      <main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white rounded shadow">
        <div className="flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="md:grid grid-cols-1 gap-10">
            <div className="flex flex-col">
              <label htmlFor="dateCommande">Date de la Commande</label>
              <input
                type="date"
                name="dateCommande"
                id="dateCommande"
                value={newCommande.dateCommande}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="numeroCommande">Numéro de la Commande</label>
              <input
                type="number"
                name="numeroCommande"
                id="numeroCommande"
                placeholder="Numéro de la commande"
                value={newCommande.numeroCommande}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="articles">Articles</label>
              <select
                name="articles"
                id="articles"
                multiple
                value={newCommande.articles}
                onChange={handleArticleChange}
                required
              >
                {articles.map(article => (
                  <option key={article.id} value={article.id}>
                    {article.reference}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="bg-yellow-500 font-bold py-2 px-8 rounded shadow border-2 border-yellow-500 
              hover:bg-transparent hover:text-yellow-500 
              transition-all duration-300"
            >
              Ajouter Commande
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default CommandeForm;
