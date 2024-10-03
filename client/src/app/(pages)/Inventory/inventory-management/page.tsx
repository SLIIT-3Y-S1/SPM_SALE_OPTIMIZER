"use client";
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import axios from 'axios';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  
  const [editingItem, setEditingItem] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [createdItem, setCreatedItem] = useState(null); 

  useEffect(() => {
    fetch('http://localhost:5500/inventory')
      .then(response => response.json())
      .then(data => setInventory(data))
      .catch(error => console.error('Error fetching inventory:', error));
  }, []);

  const handleEditClick = (id) => {
    fetch(`http://localhost:5500/inventory/${id}`)
      .then(response => response.json())
      .then(data => {
        setEditingItem(data);
        console.log(data);
        
        setShowModal(true);
      })
      .catch(error => console.error('Error fetching item data:', error));
  };

  const handleUpdate = async () => {
    try {
      console.log(editingItem);  
      
      const response = await axios.patch(`http://localhost:5500/inventory/${editingItem.id}`, editingItem, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const updatedItem = response.data;

      // Update the inventory state if needed
      setInventory(prevInventory => 
        prevInventory.map(item => item.id === updatedItem.id ? updatedItem : item)
      );

      setShowModal(false);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };


  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
  
    if (!isConfirmed) return;
  
    try {
      const response = await fetch(`http://localhost:5500/inventory/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete item with id ${id}`);
      }
  
      setInventory(prevInventory => prevInventory.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  
  const handleCreate = async () => {
    try {
      console.log(createdItem);
      
      const response = await axios.post(`http://localhost:5500/inventory`, createdItem, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const cretedItem = response.data;

      const inventoryResponse = await fetch('http://localhost:5500/inventory');
      const data = await inventoryResponse.json();
      setInventory(data);

      setShowModalCreate(false);
  
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };
  
  const closeCreateModal = () => {
    setShowModalCreate(false);
  };
  

  const handleCancel = () => {
    setShowModal(false); 
  };

  const handleChangeInAdd = (e) => {
    const { name, value } = e.target;
  
    // Check if the input type is number and convert the value accordingly
    const updatedValue = e.target.type === "number" ? Number(value) : value;
  
    setCreatedItem({ ...createdItem, [name]: updatedValue });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Check if the input type is number and convert the value accordingly
    const updatedValue = e.target.type === "number" ? Number(value) : value;
  
    setEditingItem({ ...editingItem, [name]: updatedValue });
  };
  

  return (
    <div className={styles.inventoryContainer}>
      <div className={styles.top}>
        <h1 className={styles.h1}>Inventory Management</h1>
        <button className={styles.buttonAdd} onClick={() => setShowModalCreate(true)}>
          + New Inventory
        </button>
      </div>
      <table className={styles.inventoryTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Stock Level</th>
            <th>Reorder Level</th>
            <th>Price</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.product_name}</td>
              <td>{item.category}</td>
              <td>{item.stock_level}</td>
              <td>{item.reorder_level}</td>
              <td className={styles.priceRow}>{item.price}.00</td>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
              <td>
                <button
                  className={styles.button}
                  onClick={() => handleEditClick(item.id)}
                >
                  Edit
                </button>
                <button className={styles.button}
                onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Creating Item */}
      {showModalCreate && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Add Inventory Item</h2>
            <form>
              <label>
                Product Name:
                <input
                  type="text"
                  name="product_name"
                  onChange={handleChangeInAdd}
                />
              </label>
              <label>
                Category:
                <input
                  type="text"
                  name="category"
                  onChange={handleChangeInAdd}
                />
              </label>
              <label>
                Stock Level:
                <input
                  type="number"
                  name="stock_level"
                  onChange={handleChangeInAdd}
                />
              </label>
              <label>
                Reorder Level:
                <input
                  type="number"
                  name="reorder_level"
                  onChange={handleChangeInAdd}
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  onChange={handleChangeInAdd}
                />
              </label>
            </form>
            <div className={styles.modalActions}>
              <button onClick={handleCreate} className={styles.button}>Add</button>
              <button onClick={closeCreateModal} className={styles.button}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal for Editing Item */}
      {showModal && editingItem && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Edit Inventory Item</h2>
            <form>
              <label>
                Product Name:
                <input
                  type="text"
                  name="product_name"
                  value={editingItem.product_name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Category:
                <input
                  type="text"
                  name="category"
                  value={editingItem.category}
                  onChange={handleChange}
                />
              </label>
              <label>
                Stock Level:
                <input
                  type="number"
                  name="stock_level"
                  value={editingItem.stock_level}
                  onChange={handleChange}
                />
              </label>
              <label>
                Reorder Level:
                <input
                  type="number"
                  name="reorder_level"
                  value={editingItem.reorder_level}
                  onChange={handleChange}
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  value={editingItem.price}
                  onChange={handleChange}
                />
              </label>
            </form>
            <div className={styles.modalActions}>
              <button onClick={handleUpdate} className={styles.button}>Update</button>
              <button onClick={handleCancel} className={styles.button}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
