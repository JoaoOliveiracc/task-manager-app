import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import UserRegistrationPage from "./pages/UserRegistration";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/user-registration" element={<UserRegistrationPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default App;
