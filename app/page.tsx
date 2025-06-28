"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Homepage from "../components/Homepage"
import BookPage from "../components/BookPage"
import IndustryPage from "../components/IndustryPage"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/industries/healthcare" element={<IndustryPage industry="healthcare" />} />
        <Route path="/industries/construction" element={<IndustryPage industry="construction" />} />
        <Route path="/industries/real-estate" element={<IndustryPage industry="real-estate" />} />
        <Route path="/industries/home-services" element={<IndustryPage industry="home-services" />} />
        <Route path="/industries/manufacturing" element={<IndustryPage industry="manufacturing" />} />
        <Route path="/industries/automotive" element={<IndustryPage industry="automotive" />} />
      </Routes>
    </Router>
  )
}
