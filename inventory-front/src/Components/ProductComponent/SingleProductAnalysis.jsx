import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../LoginView.css";
import { Line } from "react-chartjs-2";
import { getAllProducts } from "../../Services/ProductService";
import { getDemandByProduct } from "../../Services/TransactionService";
import {getUserRole} from '../../Services/LoginService';

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const SingleProductAnalysis = () => {
  const navigate = useNavigate();
 const [role,setRole] =useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [demandData, setDemandData] = useState([]);

  const fetchAllProducts = () => {
    getAllProducts().then((response) => {
      setProducts(response.data);
    });
  };
   const setUserRole=()=>{
            getUserRole().then( response => {
                setRole(response.data);
           })
        }
  const fetchProductDemand = (productId) => {
    if (!productId) return;
    getDemandByProduct(productId).then((response) => {
      setDemandData(response.data);
    });
  };

  useEffect(() => {
    fetchAllProducts();
    setUserRole();
  }, []);

  const handleProductChange = (e) => {
    const productId = e.target.value;
    setSelectedProduct(productId);
    fetchProductDemand(productId);
  };
  const chartData = {
    labels: demandData.map((_, i) => i + 1), 
    datasets: [
      {
        label: "Product Demand",
        data: demandData,
        borderColor: "#006400", 
        backgroundColor: "#006400",
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "#003300",
        pointBorderColor: "#ffffff",
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#000",
          font: { size: 14, weight: "bold" },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: { display: true, text: "Transaction", color: "#000", font: { size: 14 } },
        ticks: { color: "#000", font: { size: 13 } },
        grid: { color: "rgba(0, 0, 0, 0.1)" },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Demand Value", color: "#000", font: { size: 14 } },
        ticks: { color: "#000", font: { size: 13 } },
        grid: { color: "rgba(0, 0, 0, 0.1)" },
      },
    },
  };

  const returnBack = () => {
     if(role==="Admin")
            navigate('/AdminMenu');
        else if(role==="Manager")
            navigate('/ManagerMenu');
  };

  return (
    <div className="max-w-xl mx-auto">
      <h3 className="mb-4 p-3 color text-center">Product Demand Trend</h3>

      <div className="text-center mb-4">
        <label className="form-label fw-bold me-2">Select Product: </label>
        <select
          value={selectedProduct}
          onChange={handleProductChange}
          className="form-select d-inline-block w-auto"
        >
          <option value="">-- Select --</option>
          {products.map((prod) => (
            <option key={prod.productId} value={prod.productId}>
              {prod.productName}
            </option>
          ))}
        </select>
      </div>

      {selectedProduct && demandData.length > 0 ? (
        <div className="text-center mt-4">
          <h5>
            <b>Demand Over Time</b>
          </h5>
          <div style={{ width: "700px", margin: "auto" }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      ) : (
        selectedProduct && (
          <p className="text-center mt-3 text-muted">
            No demand data found for this product.
          </p>
        )
      )}

      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={returnBack} className="btn btn-danger">
          Return
        </button>
      </div>
      <br />
    </div>
  );
};

export default SingleProductAnalysis;
