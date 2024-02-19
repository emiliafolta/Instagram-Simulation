import {
    login,
    handleIncomingRedirect,
    getDefaultSession,
    fetch
  } from "@inrupt/solid-client-authn-browser";

export default function Login() {
    

    // 1a. Start Login Process. Call login() function.
    function loginToSelectedIdP() {
        const SELECTED_IDP = "https://login.inrupt.com";
      
        return login({
          oidcIssuer: SELECTED_IDP,
          redirectUrl: new URL("/", window.location.href).toString(),
          clientName: "Getting started app"
        });
      }

    // 1b. Login Redirect. Call handleIncomingRedirect() function.
    // When redirected after login, finish the process by retrieving session information.
    async function handleRedirectAfterLogin() {
        await handleIncomingRedirect(); // no-op if not part of login redirect
    
        const session = getDefaultSession();
        if (session.info.isLoggedIn) {
        // Update the page with the status.
        console.log(session.info.webId)
        }
    }

    handleRedirectAfterLogin();

    return (
        <div>
            <label id="labelIdP">1. Select your Identity Provider: </label>
            <select id="select-idp" name="select-idp">
                <option value="">--Please select an Identity Provider (IdP)--</option>
                <option value="https://login.inrupt.com">https://login.inrupt.com (PodSpaces)</option>
            </select>
            <button name="btnLogin" id="btnLogin" onClick={loginToSelectedIdP}>Login</button>
        </div>
    );
  }