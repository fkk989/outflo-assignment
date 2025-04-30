import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CampaignsPage from "./pages/CampaignsPage";
import MessageGeneratorPage from "./pages/MessageGeneratorPage";
import { ScrapedDataPage } from "./pages/ScrapedData";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-6">
          <Routes>
            <Route path="/" element={<CampaignsPage />} />
            <Route
              path="/message-generator"
              element={<MessageGeneratorPage />}
            />
            <Route path="/scraped-data" element={<ScrapedDataPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
