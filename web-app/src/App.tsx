import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import { BrowserSolidLdoProvider } from "@ldo/solid-react";

export default function App () {
  return (
    <div className="App">
      <BrowserSolidLdoProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/profile" element={<ProfilePage />} /> {/* currently not used */}
          </Routes>
        </BrowserRouter>
      </BrowserSolidLdoProvider>
    </div>
  );
}