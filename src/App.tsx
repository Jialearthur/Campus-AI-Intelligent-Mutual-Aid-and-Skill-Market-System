import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Quiz from "@/pages/Quiz";
import BlindBox from "@/pages/BlindBox";
import Chemistry from "@/pages/Chemistry";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/blindbox" element={<BlindBox />} />
        <Route path="/chemistry" element={<Chemistry />} />
      </Routes>
    </Router>
  );
}
