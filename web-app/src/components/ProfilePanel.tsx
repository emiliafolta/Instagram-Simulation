import { FormEvent, FunctionComponent, useCallback, useEffect, useState } from "react";
import { LinkedDataObject } from "ldo";
import { SolidProfileShape } from "../ldo/solidProfile.typings";
import { SolidProfileShapeFactory } from "../ldo/solidProfile.ldoFactory";
import { fetch as solid_fetch } from "@inrupt/solid-client-authn-browser";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import config from "./config";
import { CategoryInteractions, IUserProfile, UserGender } from "./common";
import "./ProfilePanel.css";

const ProfilePanel: FunctionComponent<{ 
  webId: string,
  userProfile: IUserProfile,
  setUserProfile: React.Dispatch<React.SetStateAction<IUserProfile>>
}> = ({ webId, userProfile, setUserProfile }) => {

  const [solidProfile, setSolidProfile] = useState<LinkedDataObject<SolidProfileShape> | undefined>();
  const [categories, setCategories] = useState<string[]>([]);
  
  async function fetchCategories() {
    try {
      const response = await fetch(config.BACKEND_BASE_URL + "/categories");
      const categories = await response.json();
      setCategories(categories);

    } catch (error) {
      console.log(error)
    }
  };

  // fetch the categories when the app is opened
  useEffect(() => { fetchCategories() }, []);

  // fetch the solid profile data from 
  async function fetchProfile() {
    const rawProfile = await (
      await solid_fetch(webId)
    ).text();
    const solidProfile = await SolidProfileShapeFactory.parse(
      webId,
      rawProfile,
      { baseIRI: webId }
    );
    setSolidProfile(solidProfile);
    setUserProfile({
      ...userProfile,
      age: solidProfile.age,
      gender: solidProfile.gender,
      location: solidProfile.location,
      selectedCategories: solidProfile.userSelectedCategories ? solidProfile.userSelectedCategories : [],
    })
  }

  // update the solid profile with new data
  async function updateProfile() {
    if (solidProfile) {
      const modifiedProfile = solidProfile.$clone();
      modifiedProfile.age = userProfile.age;
      modifiedProfile.gender = userProfile.gender;
      modifiedProfile.location = userProfile.location;
      modifiedProfile.userSelectedCategories = userProfile.selectedCategories;
      const response = await solid_fetch(webId, {
        method: "PATCH",
        body: await modifiedProfile.$toSparqlUpdate(),
        headers: {
          "Content-Type": "application/sparql-update"
        }
      });
      if (response.status === 200) {
        setSolidProfile(modifiedProfile);
      }
      fetchProfile();
    }
  }

  // fetch the solid profile when webId becomes available
  useEffect(() => {
    fetchProfile();
  }, [webId]);

  function selectCategory(cat: string) {
    const categoryIndex = userProfile.selectedCategories.findIndex((c) => c === cat);
    if (categoryIndex !== -1) {
      // Category exists, remove it
      const updatedCategories = [...userProfile.selectedCategories];
      updatedCategories.splice(categoryIndex, 1);
      setUserProfile({
        ...userProfile,
        selectedCategories: updatedCategories,
      })
    } else {
      // Category does not exist, add it
      const updatedCategories = userProfile.selectedCategories.concat([cat]);
      setUserProfile({
        ...userProfile,
        selectedCategories: updatedCategories,
      });
    }
  }

  return (
    <Box>
      <FormGroup>
        {categories.map(category => (
             <FormControlLabel 
              control={<Checkbox />} 
              label={category} 
              checked={userProfile.selectedCategories.includes(category[0])}
              onClick={() => selectCategory(category[0])}
            />
            ))}
        <TextField
            value={userProfile.location}
            label="Enter your location"
            onChange={(e) => {
              setUserProfile({
                ...userProfile,
                location: e.target.value
              })
            }}
        />
        <TextField
            value={userProfile.age}
            label="Enter your age"
            onChange={(e) => {
                setUserProfile({
                  ...userProfile,
                  age: +e.target.value
                })
            }}
        />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Enter your gender</InputLabel>
          <Select
            value={userProfile.gender}
            label="Select your gender"
          >
            <MenuItem key={UserGender.MALE} value={UserGender.MALE} onClick={() => setUserProfile({...userProfile, gender: UserGender.MALE})}>Male</MenuItem>
            <MenuItem key={UserGender.FEMALE} value={UserGender.FEMALE} onClick={() => setUserProfile({...userProfile, gender: UserGender.FEMALE})}>Female</MenuItem>
            <MenuItem key={UserGender.OTHER} value={UserGender.OTHER} onClick={() => setUserProfile({...userProfile, gender: UserGender.OTHER})}>Other</MenuItem>
            <MenuItem key={UserGender.NOT_SPECIFIED} value={UserGender.NOT_SPECIFIED} onClick={() => setUserProfile({...userProfile, gender: UserGender.NOT_SPECIFIED})}>Not specified</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={updateProfile}>
          Submit
        </Button>
      </FormGroup>
    </Box>
  );
}

export default ProfilePanel;