import React, {useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import { Pie } from "react-chartjs-2";
import {getUserRole} from '../../Services/LoginService';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const ProductAnalysis = () => {
    let navigate=useNavigate();
     const [role,setRole] =useState("");
    const [productSale, setProductSale] = useState([]);
    const setProductSalesData=()=>{
        fetch("http://localhost:9898/inventory/analysis")
        .then((res) => res.json())
        .then((data) => {
        const formatted = Object.entries(data).map(([productName,totalSalesValue]) => ({
            productName,
            totalSalesValue,
        }));
   setProductSale(formatted);
 });
 }
  const setUserRole=()=>{
             getUserRole().then( response => {
                 setRole(response.data);
            })
         }
 useEffect(() => {
    setProductSalesData();
    setUserRole();
     }, []);
 const chartData = {
       labels: productSale.map((p) => p.productName),
       datasets: [
         {
           data: productSale.map((p) => p.totalSalesValue),
           backgroundColor: [
                  "#3B82F6", // Blue
                  "#22C55E", // Green
                  "#EAB308", // Yellow
                  "#EF4444", // Red
                  "#A855F7", // Purple
                  "#06B6D4", // Cyan
                  "#F97316", // Orange
                  "#64748B", // Slate
                ],
                borderColor: "rgba(81, 75, 75, 0.8)",
                borderWidth: 1,
                hoverOffset: 8,
                hoverBorderColor: "#FFFFFF",
                hoverBorderWidth: 2,
         },
       ],
     };
    const chartOptions = {
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "rgba(0, 0, 0, 0.9)", 
              font: {
                size: 13,
                weight: "500",
              },
            },
          },
        },
      };
    
    const returnBack=()=>{
       if(role==="Admin")
            navigate('/AdminMenu');
        else if(role==="Manager")
            navigate('/ManagerMenu'); 
  }

    return(
    <div className="max-w-xl mx-auto">
        <h3 className="mb-4 p-3 color text-center">Product Sales Dashboard</h3>
        <div align="left">
        <table className="table m-auto w-50 text-center border mb-6">
        <thead>
            <tr className="table-dark">
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">Sales Amount</th>
            </tr>
        </thead>
        <tbody className="table-secondary">
            {productSale.map((p, i) => (
            <tr key={i} className="text-center">
                <td className="border px-4 py-2">{p.productName}</td>
                <td className="border px-4 py-2">{p.totalSalesValue.toFixed(2)}</td>
            </tr>
            ))}
        </tbody>
        </table>
        </div>
        <div className="text-center mt-4">
         <h5><b>Total Sale per Product</b></h5>
         <div style={{width:"500px",alignContent:"center",justifyContent:"center",margin:"auto"}}>
          <Pie data={chartData} options={chartOptions}/>
          </div>
          </div>
          <br />
          <div style={{display:"flex",justifyContent:"center"}}>
          <button onClick={()=>returnBack()} className="btn btn-danger">Return</button>    
          </div>
          <br />
    </div>
    );
}

export default ProductAnalysis