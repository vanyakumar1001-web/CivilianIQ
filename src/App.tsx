import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/lib/LanguageContext';
import HomePage from '@/pages/HomePage';
import RecordPage from '@/pages/RecordPage';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/record" element={<RecordPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
