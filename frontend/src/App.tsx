import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PropertyList from './pages/PropertyList';
import PropertyDetail from './pages/PropertyDetail';
import PropertyForm from './pages/PropertyForm';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PropertyList />} />
        <Route path="/properties/:id" element={<PropertyForm />} />
        <Route path="/properties/:id/detail" element={<PropertyDetail />} />
      </Routes>
    </BrowserRouter>
  );
}