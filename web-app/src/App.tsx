import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import { BrowserSolidLdoProvider } from "@ldo/solid-react";
import {
  handleIncomingRedirect,
  ISessionInfo
} from '@inrupt/solid-client-authn-browser';
import { useEffect, useState } from "react";
import { CategoryInteractions, CategoryMomentum, IUserProfile, UserGender, categoryNames } from "./components/common";
import config from "./components/config";

const initialUserProfile: IUserProfile = {
  webId: undefined,
  isLoggedIn: false,
  name: "",
  selectedCategories: [],
  categoryInteractions: [],
  categoryMomentum: [],
  gender: UserGender.NOT_SPECIFIED,
  age: undefined,
  location: undefined, 
}

export default function App () {

  const [userProfile, setUserProfile] = useState<IUserProfile>(initialUserProfile);

  useEffect(() => {
    console.log(userProfile) 
    const interactions: number[] = []
    userProfile.categoryInteractions?.forEach(cat =>{interactions.push(cat.likes)})
    console.log(interactions)
  }, [userProfile])

  useEffect(() => {
    handleIncomingRedirect().then((sessionInfo) => {
      setUserProfile({
        ...userProfile,
        webId: sessionInfo?.webId,
        isLoggedIn: sessionInfo?.isLoggedIn
      })
    })
  }, []);

  return (
    <div className="App">
      <BrowserSolidLdoProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage userProfile={userProfile} setUserProfile={setUserProfile}/>}/>
            <Route path="/profile" element={<ProfilePage />} /> {/* currently not used */}
          </Routes>
        </BrowserRouter>
      </BrowserSolidLdoProvider>
    </div>
  );
}