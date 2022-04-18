import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import RegistrationForm from "./pages/RegistrationForm/RegistrationForm";

const Router = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route element={<Home />} index />
            <Route path="/create_appointment" element={<RegistrationForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default Router;