import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    getSuppliers();
  }, []);

  const getSuppliers = async () => {
    const response = await axios.get("http://localhost:5000/suppliers");
    setSuppliers(response.data);
  };

  const deleteSupplier = async (supplierId) => {
    await axios.delete(`http://localhost:5000/suppliers/${supplierId}`);
    getSuppliers();
  };

  return (
    <div>
      <h1 className="title">Suppliers</h1>
      <h2 className="subtitle">List of suppliers</h2>
      <Link to="/suppliers/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Supplier Name</th>
            <th>PDV</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>Contact person</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier, index) => (
            <tr key={supplier.uuid}>
              <td>{index + 1}</td>
              <td>{supplier.name}</td>
              <td>{supplier.pdv}</td>
              <td>{supplier.email}</td>
              <td>{supplier.phoneNumber}</td>
              <td>{supplier.contactPerson}</td>
              <td>{supplier.user.name}</td>
              <td>
                <Link
                  to={`/suppliers/edit/${supplier.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteSupplier(supplier.uuid)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierList;
