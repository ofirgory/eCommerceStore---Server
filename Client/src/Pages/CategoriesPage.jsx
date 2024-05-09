import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../redux/slices/categorySlice";
import "../css/categories.css";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(
    (state) => state.categories
  );
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [editStatus, setEditStatus] = useState({});

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllCategories());
    }
  }, [status, dispatch]);

  const handleAddCategory = () => {
    if (newCategoryName && newCategoryDescription) {
      dispatch(
        addCategory({
          name: newCategoryName,
          description: newCategoryDescription,
        })
      );
      setNewCategoryName("");
      setNewCategoryDescription("");
    }
  };

  const handleUpdateCategory = (id) => {
    const { name, description } = editStatus[id] || {};
    if (name && description) {
      dispatch(updateCategory({ id, updateData: { name, description } }));
      setEditStatus((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
  };

  const toggleEdit = (id) => {
    const category = categories.find((c) => c._id === id);
    if (editStatus[id]) {
      handleUpdateCategory(id);
    } else {
      setEditStatus({
        ...editStatus,
        [id]: { name: category.name, description: category.description },
      });
    }
  };

  const handleChange = (id, changes) => {
    setEditStatus((prev) => ({ ...prev, [id]: { ...prev[id], ...changes } }));
  };

  const renderCategories = () => {
    return categories.map((category) => (
      <div key={category._id} className="category-item">
        {editStatus[category._id] ? (
          <>
            <input
              className="category-input"
              type="text"
              value={editStatus[category._id].name}
              onChange={(e) =>
                handleChange(category._id, { name: e.target.value })
              }
            />
            <textarea
              className="category-textarea"
              value={editStatus[category._id].description}
              onChange={(e) =>
                handleChange(category._id, { description: e.target.value })
              }
            />
          </>
        ) : (
          <>
            <span>{category.name}</span>
            <p>{category.description}</p>
          </>
        )}
        <button
          className="edit-button"
          onClick={() => toggleEdit(category._id)}
        >
          {editStatus[category._id] ? "Save" : "Edit"}
        </button>
        <button
          className="delete-button"
          onClick={() => handleDeleteCategory(category._id)}
        >
          Delete
        </button>
      </div>
    ));
  };

  return (
    <div className="container">
      <h1 className="header">Category Management</h1>
      {status === "loading" && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="category-form">
        <input
          className="category-input"
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New category name"
        />
        <textarea
          className="category-textarea"
          value={newCategoryDescription}
          onChange={(e) => setNewCategoryDescription(e.target.value)}
          placeholder="Category description"
        />
        <button className="add-button" onClick={handleAddCategory}>
          Add Category
        </button>
      </div>
      <div className="category-list">{renderCategories()}</div>
    </div>
  );
};

export default CategoriesPage;
