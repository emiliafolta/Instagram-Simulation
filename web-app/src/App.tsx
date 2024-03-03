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
import { LinkedDataObject } from "ldo";
import { SolidProfileShape } from "./ldo/solidProfile.typings";
import { SolidProfileShapeFactory } from "./ldo/solidProfile.ldoFactory";
import { fetch as solid_fetch } from "@inrupt/solid-client-authn-browser";

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
  allowLearning: true
}

export default function App () {

  const [userProfile, setUserProfile] = useState<IUserProfile>(initialUserProfile);
  // const [categories, setCategories] = useState<string[]>([]);
  
  // async function fetchCategories() {
  //   try {
  //     const response = await fetch(config.BACKEND_BASE_URL + "/categories");
  //     const categories = await response.json();
  //     setCategories(categories);

  //   } catch (error) {
  //     console.log(error)
  //   }
  // };

  // // fetch the categories when the app is opened
  // useEffect(() => { fetchCategories() }, []);

  useEffect(() => {
    console.log(userProfile) 
    const interactions: number[] = []
    userProfile.categoryInteractions?.forEach(cat =>{interactions.push(cat.likes)})
    console.log(interactions)
  }, [userProfile])

  useEffect(() => {
    handleIncomingRedirect().then((sessionInfo) => {
      if(sessionInfo?.webId) fetchProfile(sessionInfo.webId)
    })
  }, []);

  // fetch the solid profile data from 
  async function fetchProfile(webId: string) {
    const rawProfile = await (
      await solid_fetch(webId)
    ).text();
    const solidProfile = await SolidProfileShapeFactory.parse(
      webId,
      rawProfile,
      { baseIRI: webId }
    );
    setUserProfile({
      ...userProfile,
      age: solidProfile.age,
      gender: solidProfile.gender,
      location: solidProfile.location,
      selectedCategories: solidProfile.userSelectedCategories ? solidProfile.userSelectedCategories : [],
      webId: webId,
      isLoggedIn: true,
    })
  }

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