import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './Components/Products';
import IndividualProduct from './Components/IndividualProduct';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Products />} />
          <Route path="/product/:product_id/:variant_id" element={<IndividualProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
