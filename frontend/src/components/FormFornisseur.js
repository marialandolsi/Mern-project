import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FormAddFornisseur() {
  const navigate = useNavigate();

  const [newFornisseur, setNewFornisseur] = useState({
    name: "",
    address: "",
    email: "",
    phone: ""
  });

  const handleChange = (e) => {
    setNewFornisseur({ ...newFornisseur, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/fornisseur", newFornisseur);
      navigate('/fornisseur');
    } catch (error) {
      console.error("Error creating fornisseur:", error);
    }
  }

  return (
    <>
      <main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white rounded shadow">
        <div className="flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="md:grid grid-cols-1 gap-10">
            <div className="flex flex-col">
              <label htmlFor="name">Nom du Fournisseur</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Nom du fournisseur"
                autoComplete="off"
                value={newFornisseur.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="address">Adresse du Fournisseur</label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Adresse du fournisseur"
                autoComplete="off"
                value={newFornisseur.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email">Email du Fournisseur</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email du fournisseur"
                autoComplete="off"
                value={newFornisseur.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone">Téléphone du Fournisseur</label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Téléphone du fournisseur"
                autoComplete="off"
                value={newFornisseur.phone}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-yellow-500 font-bold py-2 px-8 rounded shadow border-2 border-yellow-500 
              hover:bg-transparent hover:text-yellow-500 
              transition-all duration-300"
            >
              Ajouter Fournisseur
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default FormAddFornisseur;
