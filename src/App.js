// main
import { BrowserRouter } from "react-router-dom";
import RouteX from "./routes/routes";

import { AuthProvider } from "./context/authcontext";

import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RouteX />
      </AuthProvider>
    </BrowserRouter>
  );
}