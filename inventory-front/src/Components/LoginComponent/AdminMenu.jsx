import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const AdminMenu=()=>{


    return(
    <div className=".container">
        <div  align="center">
        <h1 className = "text-center color p-2">Inventory Admin Menu</h1>
        </div>
        <Navbar expand="lg" bg="dark">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="SKU" menuVariant="dark">
                <NavDropdown.Item href="SkuRepo">SKU List</NavDropdown.Item>
                <NavDropdown.Item href="/SkuAdd">SKU Addition</NavDropdown.Item>
             </NavDropdown>
             <NavDropdown title="Product" menuVariant="dark">
                <NavDropdown.Item href="ProAdd">Product Addition</NavDropdown.Item>
                <NavDropdown.Item href="ProductRepo">Product List</NavDropdown.Item>
                <NavDropdown title="Analysis" menuVariant="dark">
                  <NavDropdown.Item href="/analysis/all">Product Sales</NavDropdown.Item>
                   <NavDropdown.Item href="/analysis/single">Product Demand</NavDropdown.Item>
                </NavDropdown>
              </NavDropdown>
              <NavDropdown title="Transaction" menuVariant="dark">
                <NavDropdown.Item href='/trans-repo/OUT'>Out Transaction Report</NavDropdown.Item>
                <NavDropdown.Item href="/trans-repo/IN">In Transaction Report</NavDropdown.Item>
              </NavDropdown>
                <Nav.Link href="/"><b>Logout</b></Nav.Link>
           </Nav>
         </Navbar.Collapse>
        </Navbar>
    </div>
 
    );
};


export default AdminMenu;
