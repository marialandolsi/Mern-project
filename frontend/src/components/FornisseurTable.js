import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function TableFornisseur() {
  const navigate = useNavigate();

  const [fornisseurs, setFornisseurs] = useState([]);
  const [deleteMsg, setDeleteMsg] = useState(false);
  const [deletedFornisseurId, setDeletedFornisseurId] = useState("");

  useEffect(() => {
    fetchFornisseurs();
  }, []);

  const fetchFornisseurs = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/fornisseur");
      setFornisseurs(response.data);
    } catch (error) {
      console.error("Error fetching fornisseurs:", error);
    }
  };

  const handleDelete = async (fornisseurId) => {
    try {
      await axios.delete(`http://localhost:3000/api/fornisseur/${fornisseurId}`);
      fetchFornisseurs(); // Refresh the list after deletion
      setDeletedFornisseurId(fornisseurId);
      setDeleteMsg(true);
    } catch (error) {
      console.error("Error deleting fornisseur:", error);
    }
  };

  const handleAddFornisseur = () => {
    navigate("/fornisseur/create");
  };

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-4">Liste des Fournisseurs</h2>

        <button
          onClick={handleAddFornisseur}
          className="bg-blue-500 font-bold py-2 px-8 rounded shadow border-2 border-blue-500 
                     hover:bg-transparent hover:text-blue-500 
                     transition-all duration-300 mb-4"
        >
          Ajouter Fournisseur
        </button>

        {deleteMsg && (
          <div style={{ backgroundColor: '#34cd60', color: '#fff', padding: '10px', borderRadius: '5px' }}>
            Le fournisseur avec l'ID {deletedFornisseurId} a été supprimé avec succès
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="text-left border-b border-gray-300">
                <th className="px-4 py-2">Nom</th>
                <th className="px-4 py-2">Adresse</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Téléphone</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fornisseurs.map((fornisseur, index) => (
                <tr key={fornisseur.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="border px-4 py-2">{fornisseur.name}</td>
                  <td className="border px-4 py-2">{fornisseur.address}</td>
                  <td className="border px-4 py-2">{fornisseur.email}</td>
                  <td className="border px-4 py-2">{fornisseur.phone}</td>
                  <td className="border px-4 py-2">
                    <button onClick={() => handleDelete(fornisseur.id)} className="text-red-500 hover:text-red-700 mr-2">
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

export default TableFornisseur;
