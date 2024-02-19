import Footer from "./components/Footer";
import Login from "./components/Login";
import { LoginButton } from "@inrupt/solid-ui-react";
import {  login, getDefaultSession } from '@inrupt/solid-client-authn-browser'



export default function App() {
  return (
    <main>
        <p>App</p>
        <Footer />
        <Login />
    </main>
  );
}