import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserProfile.css";
import "bootstrap/dist/css/bootstrap.min.css";

function UserProfile() {
  const [userData, setUserData] = useState({});
  const [companyData, setCompanyData] = useState({});
  const [creditCardData, setCreditCardData] = useState({});
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    // Fetch user data from the API
    axios
      .get(
        "https://fakerapi.it/api/v1/persons?_quantity=1&_gender=male&_birthday_start=2005-01-01"
      )
      .then((response) => {
        setUserData(response.data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    // Fetch company data from the API
    axios
      .get("https://fakerapi.it/api/v1/companies?_quantity=1")
      .then((response) => {
        setCompanyData(response.data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching company data:", error);
      });

    // Fetch credit card data from the API
    axios
      .get("https://fakerapi.it/api/v1/credit_cards?_quantity=1")
      .then((response) => {
        setCreditCardData(response.data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching credit card data:", error);
      });

    // Fetch products data from the API
    axios
      .get(
        "https://fakerapi.it/api/v1/products?_quantity=3&_taxes=1&_categories_type=uuid"
      )
      .then((response) => {
        setProductsData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching products data:", error);
      });
  }, []);

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="profile-title">
        {" "}
        <h2>Profile</h2>{" "}
      </div>
      <hr />
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              width="150px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            />
            <span className="font-weight-bold">
              Name : {userData.firstname} {userData.lastname}
            </span>
            <span className="font-weight-bold">Email : {userData.email}</span>
            <span className="font-weight-bold">Phone : {userData.phone}</span>
          </div>
        </div>
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <hr />
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Company Details</h4>
            </div>
            <div className="row mt-2">
              <p>Company Name: {companyData.name}</p>
              <p>Email: {companyData.email}</p>
              <p>VAT: {companyData.vat}</p>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Credit Card Information</h4>
            </div>
            <div className="row mt-2">
              <p>Type: {creditCardData.type}</p>
              <p>Number: {creditCardData.number}</p>
              <p>Expiration: {creditCardData.expiration}</p>
              <p>Owner: {creditCardData.owner}</p>
            </div>
            <hr />
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center experience">
              <h4 className="text-right">Previously Bought Products</h4>
            </div>
            <br />
            <div className="col-md-12">
              {productsData.map((product) => (
                <div key={product.id} className="product">
                  <div className="card mb-3" style={{ maxWidth: 540 }}>
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{product.name}</h5>
                          <p className="card-text">{product.description}</p>
                          <p className="card-text">
                            <small className="text-body-secondary">
                              Price : {product.price}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
