import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Users from "./components/Users";
import Messages from "./components/Messages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Users />} />
        <Route path="/messages/:userId" element={<Messages />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
