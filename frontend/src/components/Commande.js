import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

function CommandeTable() {
  const navigate = useNavigate();
  const { id: clientId } = useParams();

  const [commandes, setCommandes] = useState([]);
  const [deleteMsg, setDeleteMsg] = useState(false);
  const [deletedCommandeId, setDeletedCommandeId] = useState("");

  useEffect(() => {
    if (clientId) {
      fetchCommandes(clientId);
    }
  }, [clientId]);


  const fetchCommandes = async (clientId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/commande/${clientId}`);
      const commandesWithArticleDetails = await Promise.all(response.data.map(async (commande) => {
        const articles = await fetchArticleDetails(commande.articles);
        const clientResponse = await axios.get(`http://localhost:3000/api/client/${commande.client}`);
        const clientName = clientResponse.data.name;
        return { ...commande, client: clientName, articles };
      }));
      const sortedCommandes = commandesWithArticleDetails.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setCommandes(sortedCommandes);
    } catch (error) {
      console.error("Error fetching commandes:", error);
    }
  };

  const handleDelete = async (commandeId) => {
    try {
      console.log(commandeId)
      await axios.delete(`http://localhost:3000/api/commande/${commandeId}`);
      if (clientId) {
        fetchCommandes(clientId);
      }
      setDeletedCommandeId(commandeId);
      setDeleteMsg(true);
    } catch (error) {
      console.error("Error deleting commande:", error);
    }
  };

  const fetchArticleDetails = async (articleIds) => {
    try {
      const articles = await Promise.all(articleIds.map(async (articleId) => {
        const response = await axios.get(`http://localhost:3000/api/article/${articleId}`);
        return response.data;
      }));
      return articles;
    } catch (error) {
      console.error("Error fetching article details:", error);
      return [];
    }
  };

  const handleAddCommande = () => {
    navigate(`/commande/${clientId}/add`);
  };

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-4">Liste des Commandes</h2>

        <button
          onClick={handleAddCommande}
          className="bg-blue-500 font-bold py-2 px-8 rounded shadow border-2 border-blue-500 
                     hover:bg-transparent hover:text-blue-500 
                     transition-all duration-300 mb-4"
        >
          Ajouter Commande
        </button>

        {deleteMsg && (
          <div style={{ backgroundColor: '#34cd60', color: '#fff', padding: '10px', borderRadius: '5px' }}>
            La commande avec l'ID {deletedCommandeId} a été supprimée avec succès
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="text-left border-b border-gray-300">
                <th className="px-4 py-2">Numéro Commande</th>
                <th className="px-4 py-2">Date Commande</th>
                <th className="px-4 py-2">Client</th>
                <th className="px-4 py-2">Articles</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {commandes.map((commande, index) => (
                <tr key={commande.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="border px-4 py-2">{commande.numeroCommande}</td>
                  <td className="border px-4 py-2">{new Date(commande.dateCommande).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{commande.client}</td>
                  <td className="border px-4 py-2">
                    <ul>
                      {commande.articles.map((article, idx) => (
                        <li key={idx}>{article.reference}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="border px-4 py-2">
                    <button onClick={() => handleDelete(commande._id)} className="text-red-500 hover:text-red-700 mr-2">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export default CommandeTable;
