import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditSupplier = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pdv, setPdv] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getSupplierById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/suppliers/${id}`
        );
        setName(response.data.name);
        setPdv(response.data.pdv);
        setEmail(response.data.email);
        setPhoneNumber(response.data.phoneNumber);
        setContactPerson(response.data.contactPerson);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getSupplierById();
  }, [id]);

  const updateSupplier = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/suppliers/${id}`, {
        name: name,
        pdv: pdv,
        email: email,
        phoneNumber: phoneNumber,
        contactPerson: contactPerson,
      });
      navigate("/suppliers");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Suppliers</h1>
      <h2 className="subtitle">Edit Supplier</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateSupplier}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Supplier Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">PDV</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={pdv}
                    onChange={(e) => setPdv(e.target.value)}
                    placeholder="Pdv"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    type="email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Phone number</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone number"
                  />
                </div>
              </div>
              
              <div className="field">
                <label className="label">Phone number</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Contact person"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditSupplier;
