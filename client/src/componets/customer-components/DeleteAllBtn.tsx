import React from 'react';

const DeleteAllBtn: React.FC<{ onDeleteSuccess: () => void }> = ({ onDeleteSuccess }) => {

  const deleteAllCustomers = async (): Promise<boolean> => {
    try {
      const response = await fetch(`http://localhost:5500/api/v1/customer-segment`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete all customer data');
      }

      return true; // Return true if deletion is successful
    } catch (error) {
      console.error('Error deleting all customers:', error);
      return false; // Return false in case of error
    }
  };

  const handleDeleteAll = async () => {
    const success = await deleteAllCustomers();
    if (success) {
      onDeleteSuccess(); // Call the success callback if deletion was successful
      // Optionally, show a success message
      alert('All customers deleted successfully!');
    } else {
      // Optionally, show an error message
      alert('Failed to delete all customers.');
    }
  };

  return (
    <button
      onClick={handleDeleteAll}
      className="py-3 px-10 bg-red-500 text-white rounded-lg" // Style for the delete button
    >
      Delete All
    </button>
  );
};

export default DeleteAllBtn;
