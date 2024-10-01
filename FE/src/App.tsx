import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home/Home";
import { ChakraProvider } from "@chakra-ui/react";
import { Form } from "./pages/Form/Form";
import { Header } from "./components/Header/Header";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";

function App() {
  return (
    <ChakraProvider>
      <Router>
      <ScrollToTop />
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<Form />} />
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
