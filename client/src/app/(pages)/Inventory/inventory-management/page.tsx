"use client";
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import axios from 'axios';
import { log } from 'console';
import { FaSearch } from 'react-icons/fa';

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
  const [showModalReport, setShowModalReport] = useState(false);
  const [showModalEstimation, setShowModalEstimation] = useState(false);

  const [createdItem, setCreatedItem] = useState<Partial<InventoryItem> | null>(null);

  const [fileUploaded, setFileUploaded] = useState(null);
  const [forecastFileUploaded, setForecastFileUploaded] = useState(null);
  
  const [estimatedMonth, setEstimatedMonth] = useState<Partial<InventoryItem> | null>(null);

  useEffect(() => {
    fetch('http://localhost:5500/api/v1/inventory')
      .then(response => response.json())
      .then(data => setInventory(data))
      .catch(error => console.error('Error fetching inventory:', error));
  }, []);

  const handleEditClick = (id) => {
    fetch(`http://localhost:5500/api/v1/inventory/get/${id}`)
      .then(response => response.json())
      .then(data => {
        setEditingItem(data);
        console.log(data);
        
        setShowModal(true);
      })
      .catch(error => console.error('Error fetching item data:', error));
  };

  const handleUpdate = async () => {
    
    if (!editingItem.product_name || !editingItem.category || editingItem.stock_level === undefined || editingItem.reorder_level === undefined || editingItem.price === undefined) {
      alert('All fields must be filled out');
      return;
    }
    
    try {
      if (!editingItem || !editingItem.id) {
        console.error('No item to edit or item ID is missing');
        return;
      }
  
      console.log('Editing item:', editingItem);
  
      const response = await axios.patch(
        `http://localhost:5500/api/v1/inventory/${editingItem.id}`,
        {
          product_name: editingItem.product_name,
          category: editingItem.category,
          stock_level: editingItem.stock_level,
          reorder_level: editingItem.reorder_level,
          price: editingItem.price,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Response:', response);
  
      const updatedItem = response.data;
      setInventory(prevInventory =>
        prevInventory.map(item => (item.id === updatedItem.id ? updatedItem : item))
      );
      setShowModal(false);
  
    } catch (error) {
      console.error('Error updating item:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
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
    // check here if created items fields are empty
    if (!createdItem || !createdItem.product_name || !createdItem.category || createdItem.stock_level === undefined || createdItem.reorder_level === undefined || createdItem.price === undefined) {
      alert('All fields must be filled out');
      return;
    }

    try {
      if (fileUploaded) {
        // console.log(fileUploaded);

        const formData = new FormData();
        formData.append('file', fileUploaded);

        const response = await axios.post(`http://localhost:5500/api/v1/inventory/bulk`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });

      } else {
        console.log(createdItem);
        
        const response = await axios.post(`http://localhost:5500/api/v1/inventory`, createdItem, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const cretedItem = response.data;

        // const inventoryResponse = await fetch('http://localhost:5500/api/v1/inventory');
        // const data = await inventoryResponse.json();
        // setInventory(data);

        // setShowModalCreate(false);
      }

      const inventoryResponse = await fetch('http://localhost:5500/api/v1/inventory');
      const data = await inventoryResponse.json();
      setInventory(data);
      
      setFileUploaded(null);
      setShowModalCreate(false);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };
  
  const handleForecasting = async () => {
    try {
      if (forecastFileUploaded) {
        console.log(forecastFileUploaded);

        const formData = new FormData();
        formData.append('file', forecastFileUploaded);

        const response = await axios.post(`http://localhost:5500/api/v1/sales-history/bulk`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });

        generateReport();

      }

      setShowModalEstimation(false);

    } catch (error) {
      console.error('Error adding forecasting:', error);
    }
  };

  const closeCreateModal = () => {
    setShowModalCreate(false);
    setShowModalEstimation(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    setShowModalReport(false);
  };

  const handleChangeInAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValue = e.target.type === "number" ? Number(value) : value;
    setCreatedItem({ ...createdItem, [name]: updatedValue });
  };

 const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = e.target.type === "number" ? Number(value) : value;
    setEditingItem({ ...editingItem, [name]: updatedValue });
  };

  const handleFileChange = (event) => {
    setFileUploaded(event.target.files[0]);
    console.log(event.target.files[0]);
    
  };
  
  const handleForecastFileChange = (event) => {
    setForecastFileUploaded(event.target.files[0]);
    console.log(event.target.files[0]);
    
  };
 
  const handleChangeEstimatedMonth = (e) => {
    const { name, value } = e.target;
    const updatedValue = e.target.type === "number" ? Number(value) : value;
    console.log(updatedValue);
    
    setEstimatedMonth({ ...estimatedMonth, [name]: updatedValue });
  };

  // const handleFileChange = (event) => {
  //   setFileUploaded(event.target.files[0]);
  //   console.log(event.target.files[0]);
    
  // };

  const [searchTerm, setSearchTerm] = useState('');

  const generateReport = async () => {
    try {
      const response = await fetch(`http://localhost:5500/api/v1/estimations/report`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'estimation_report.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  }

  const handleSearch = async (searchTerm: string) => {
    try {
      // console.log('Searching for:', searchTerm);
      
      const response = await fetch(`http://localhost:5500/api/v1/inventory/search?searchTerm=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setInventory(data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  }
  
  return (
    <div className={styles.inventoryContainer}>
      <h1 className={styles.h1}>Inventory Management</h1>
      <div className={styles.top}>
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search Product Name"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleSearch(e.target.value);
            }}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.topRight}>
          <button className={styles.buttonAdd} onClick={() => setShowModalCreate(true)}>
            + New Inventory
          </button>
          <button className={styles.buttonAdd} onClick={() => setShowModalEstimation(true)}>
            Calculate Estimations
          </button>
        </div>
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
              Upload Excel File:
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
              />
              </label>
              {!fileUploaded && (
              <>
                <label>
                Product Name:
                <input
                  type="text"
                  name="product_name"
                  onChange={handleChangeInAdd}
                  required
                />
                </label>
                <label>
                Category:
                <input
                  type="text"
                  name="category"
                  onChange={handleChangeInAdd}
                  required
                />
                </label>
                <label>
                Stock Level:
                <input
                  type="number"
                  name="stock_level"
                  onChange={handleChangeInAdd}
                  required
                  min={0}
                  max={100}
                />
                </label>
                <label>
                Reorder Level:
                <input
                  type="number"
                  name="reorder_level"
                  onChange={handleChangeInAdd}
                  required
                  min={0}
                  max={100}
                />
                </label>
                <label>
                Price:
                <input
                  type="number"
                  name="price"
                  onChange={handleChangeInAdd}
                  required
                  min={0}
                />
                </label>
              </>
              )}
            </form>
              <div className={styles.modalActions}>
                <button onClick={handleCreate} className={styles.button}>Add</button>
                <button onClick={closeCreateModal} className={styles.button}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      
      {/* Modal for estimations*/}
      {showModalEstimation && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Add Sales Forecasts</h2>
            <form>
              <label>
              Upload Forecast File:
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleForecastFileChange}
                required
              />
              </label>
              {fileUploaded && (
              <>
                
              </>
              )}
            </form>
              <div className={styles.modalActions}>
                <button onClick={handleForecasting} className={styles.button}>Add</button>
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
                    required
                  />
                </label>
                <label>
                  Category:
                  <input
                    type="text"
                    name="category"
                    value={editingItem.category}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Stock Level:
                  <input
                    type="number"
                    name="stock_level"
                    value={editingItem.stock_level}
                    onChange={handleChange}
                    required
                    min={0}
                    max={100}

                  />
                </label>
                <label>
                  Reorder Level:
                  <input
                    type="number"
                    name="reorder_level"
                    value={editingItem.reorder_level}
                    onChange={handleChange}
                    required
                    min={0}
                    max={100}
                  />
                </label>
                <label>
                  Price:
                  <input
                    type="number"
                    name="price"
                    value={editingItem.price}
                    onChange={handleChange}
                    required
                    min={0}
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
        {/* Modal for report generation */}
        {showModalReport && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Generate Report</h2>
              <form>
                <label>
                  Estimated Month:
                  <input
                    type="number"
                    name="estimated_month"
                    onChange={handleChangeEstimatedMonth}
                    required
                    min={1}
                    max={12}
                  />
                </label>
            </form>
            <div className={styles.modalActions}>
              <button onClick={generateReport} className={styles.button}>Generate</button>
              <button onClick={handleCancel} className={styles.button}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
