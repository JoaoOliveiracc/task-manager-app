import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import UserRegistrationPage from "./pages/UserRegistration";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/user-registration" element={<UserRegistrationPage />} />
    </Routes>
  );
}

export default App;
