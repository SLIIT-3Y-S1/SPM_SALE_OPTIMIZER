"use client";
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import axios from 'axios';

interface InventoryItem {
  id: string;
  product_name: string;
  category: string;
  stock_level: number;
  reorder_level: number;
  price: number;
  createdAt: string;
}

const InventoryManagement = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]); // Ensure inventory is initialized as an empty array
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [createdItem, setCreatedItem] = useState<Partial<InventoryItem> | null>(null);

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const fetchInventoryData = async () => {
    try {
      const response = await fetch('http://localhost:5500/api/v1/inventory');
      const data = await response.json();

      // Ensure data is an array
      if (Array.isArray(data)) {
        setInventory(data);
      } else {
        console.error("Inventory data is not an array:", data);
        setInventory([]);
      }
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const handleEditClick = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5500/api/v1/inventory/${id}`);
      const data = await response.json();
      setEditingItem(data);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching item data:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (!editingItem) return;
  
      // Prepare the updated data, ensuring correct types
      const { createdAt, id, ...updatedData } = editingItem;
  
      // console.log("Sending data to update item:", updatedData);
  
      const response = await axios.patch(`http://localhost:5500/api/v1/inventory/${editingItem.id}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const updatedItem = response.data;
  
      setInventory(prevInventory =>
        prevInventory.map(item => item.id === updatedItem.id ? updatedItem : item)
      );
  
      setShowModal(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error updating item:', error.response ? error.response.data : error.message);
      } else {
        console.error('Error updating item:', error);
      }
    }
  };
  

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (!isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:5500/api/v1/inventory/${id}`, {
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
      if (!createdItem) return;

      const response = await axios.post('http://localhost:5500/api/v1/inventory', createdItem, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const newItem = response.data;
      setInventory(prevInventory => [...prevInventory, newItem]);

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

  const handleChangeInAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValue = e.target.type === "number" ? Number(value) : value;
    setCreatedItem({ ...createdItem, [name]: updatedValue });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingItem) return;
    const { name, value } = e.target;
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

      {Array.isArray(inventory) && inventory.length > 0 ? (
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
                  <button className={styles.button} onClick={() => handleEditClick(item.id)}>
                    Edit
                  </button>
                  <button className={styles.button} onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No inventory items available.</p>
      )}

      {/* Modal for Creating Item */}
      {showModalCreate && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Add Inventory Item</h2>
            <form>
              <label>
                Product Name:
                <input type="text" name="product_name" onChange={handleChangeInAdd} />
              </label>
              <label>
                Category:
                <input type="text" name="category" onChange={handleChangeInAdd} />
              </label>
              <label>
                Stock Level:
                <input type="number" name="stock_level" onChange={handleChangeInAdd} />
              </label>
              <label>
                Reorder Level:
                <input type="number" name="reorder_level" onChange={handleChangeInAdd} />
              </label>
              <label>
                Price:
                <input type="number" name="price" onChange={handleChangeInAdd} />
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
                <input type="text" name="product_name" value={editingItem.product_name} onChange={handleChange} />
              </label>
              <label>
                Category:
                <input type="text" name="category" value={editingItem.category} onChange={handleChange} />
              </label>
              <label>
                Stock Level:
                <input type="number" name="stock_level" value={editingItem.stock_level} onChange={handleChange} />
              </label>
              <label>
                Reorder Level:
                <input type="number" name="reorder_level" value={editingItem.reorder_level} onChange={handleChange} />
              </label>
              <label>
                Price:
                <input type="number" name="price" value={editingItem.price} onChange={handleChange} />
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
