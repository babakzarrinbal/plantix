import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListPage from "./views/sensors/list";
import CreatePage from './views/sensors/create';
import DetailPage from './views/sensors/detail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/create" element={<CreatePage />} />
         <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;


