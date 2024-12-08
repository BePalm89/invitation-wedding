import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home/Home";
import { ChakraProvider } from "@chakra-ui/react";
import { Header } from "./components/Header/Header";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { Choices } from "./pages/Choices/Choices";

function App() {
  return (
    <ChakraProvider>
      <Router>
      <ScrollToTop />
        <div className="App">
          <Header />
            <div className="img-container">
            <img src="/img/boda.jpg" alt="boda" className="boda"/>
            </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/choices" element={<Choices />} />
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
