import React, { useState, useEffect } from "react";
import axios from "axios";
import EditArticleForm from "./EditArticleForm";
import { useNavigate, useParams } from "react-router-dom";

function EditArticlePage() {
  const [editingArticle, setEditingArticle] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/article/${id}`);
        setEditingArticle(response.data);
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    };

    fetchArticleData();
  }, [id]);

  const handleEditSubmit = async (formData) => {
    try {
      await axios.put(`http://localhost:3000/api/article/${editingArticle.id}`, formData);
      
      // Redirect to the article list page after saving the modifications
      navigate("/article");
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">Edit Article</h2>
      {editingArticle && <EditArticleForm onSubmit={handleEditSubmit} articleData={editingArticle} />}
    </div>
  );
}

export default EditArticlePage;
