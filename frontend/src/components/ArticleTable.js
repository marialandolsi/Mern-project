import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './ClientTable.css';

function ArticleTable() {
  const [articles, setArticles] = useState([]);
  const [deleteMsg, setDeleteMsg] = useState(false);
  const [deletedArticle, setDeletedArticle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/article");
      const sortedArticles = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setArticles(sortedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const handleEdit = (articleId) => {
    navigate(`/article/${articleId}/edit`);
  };

  const handleDelete = async (articleId, ref) => {
    try {
      await axios.delete(`http://localhost:3000/api/article/${articleId}`);
      fetchArticles();
      setDeletedArticle(ref);
      setDeleteMsg(true);
      setTimeout(() => setDeleteMsg(false), 3000);
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">Liste des articles</h2>
      <button className="bg-blue-500 font-bold py-2 px-8 rounded shadow border-2 border-blue-500 
                        hover:bg-transparent hover:text-blue-500 
                        transition-all duration-300 text-left">
        <Link to='/article/create'>Ajouter Article</Link>
      </button>
      {deleteMsg && 
      <div style={{backgroundColor: '#34cd60', color: '#fff', padding:'10px', borderRadius: '5px'}}>
        L'article {deletedArticle} est supprimé avec succès
      </div>}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="text-left border-b border-gray-300">
              <th className="px-4 py-2">Reference</th>
              <th className="px-4 py-2">Prix</th>
              <th className="px-4 py-2">Quantité</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr key={article.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="border px-4 py-2">{article.reference}</td>
                <td className="border px-4 py-2">{article.prix}</td>
                <td className="border px-4 py-2">{article.quantite}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleEdit(article.id)} 
                    className="bg-green-500 font-bold py-2 px-8 rounded shadow border-2 border-green-500 
                    hover:bg-transparent hover:text-green-500 
                    transition-all duration-300 mr-2"
                  >
                    Modifier
                  </button>
                  <button onClick={() => handleDelete(article.id, article.reference)} 
                    className="bg-red-500 font-bold py-2 px-8 rounded shadow border-2 border-red-500 
                    hover:bg-transparent hover:text-red-500 
                    transition-all duration-300"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default ArticleTable;
