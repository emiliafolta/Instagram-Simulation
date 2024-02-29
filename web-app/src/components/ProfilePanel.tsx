import { FormEvent, FunctionComponent, useCallback, useEffect, useState } from "react";
import { LinkedDataObject } from "ldo";
import { SolidProfileShape } from "../ldo/solidProfile.typings";
import { SolidProfileShapeFactory } from "../ldo/solidProfile.ldoFactory";
import { fetch as solid_fetch } from "@inrupt/solid-client-authn-browser";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import config from "./config";
import { UserGender } from "./common";
import "./ProfilePanel.css";

const ProfilePanel: FunctionComponent<{ webId: string }> = ({ webId }) => {
  const [profile, setProfile] = useState<LinkedDataObject<SolidProfileShape> | undefined>();
  const [nameField, setNameField] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [gender, setGender] = useState<UserGender>(UserGender.NOT_SPECIFIED);
  const [age, setAge] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  // function to fetch the available categories
  async function fetchCategories() {
    try {
      const response = await fetch(config.BACKEND_BASE_URL + "/categories");
      const data = await response.json();
      setCategories(data)
    } catch (error) {
      console.log(error)
    }
  };

  // fetch the categories when the app is opened
  useEffect(() => { fetchCategories() }, []);

  useEffect(() => {
    console.log("selected categories update:");
    console.log(selectedCategories);
  }, [selectedCategories]);

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
    setProfile(solidProfile);
    setNameField(solidProfile.name || "");
    if(solidProfile.age) setAge(solidProfile.age.toString());
    if(solidProfile.gender) setGender(solidProfile.gender);
    if(solidProfile.location) setLocation(solidProfile.location);
    if(solidProfile.userSelectedCategories) setSelectedCategories(solidProfile.userSelectedCategories)
  }

  // update the solid profile with new data
  async function updateProfile() {
    if (profile) {
      const modifiedProfile = profile.$clone();
      modifiedProfile.age = +age;
      modifiedProfile.gender = gender;
      modifiedProfile.location = location;
      modifiedProfile.userSelectedCategories = selectedCategories;
      const response = await solid_fetch(webId, {
        method: "PATCH",
        body: await modifiedProfile.$toSparqlUpdate(),
        headers: {
          "Content-Type": "application/sparql-update"
        }
      });
      if (response.status === 200) {
        setProfile(modifiedProfile);
      }
      fetchProfile();
    }
  }

  // fetch the solid profile when webId becomes available
  useEffect(() => {
    fetchProfile();
  }, [webId]);

  function selectCategory(cat: string) {
    const categoryIndex = selectedCategories.findIndex((c) => c === cat);
    if (categoryIndex !== -1) {
      // Category exists, remove it
      const updatedCategories = [...selectedCategories];
      updatedCategories.splice(categoryIndex, 1);
      setSelectedCategories(updatedCategories);
    } else {
      // Category does not exist, add it
      const updatedCategories = selectedCategories.concat([cat])
      setSelectedCategories(updatedCategories);
    }
  }

  return (
    <Box>
      <FormGroup>
        {categories.map(category => (
             <FormControlLabel 
              control={<Checkbox />} 
              label={category} 
              checked={selectedCategories.includes(category[0])}
              onClick={() => selectCategory(category[0])}
            />
            ))}
        <TextField
            value={location}
            label="Enter your location"
            onChange={(e) => {
                setLocation(e.target.value);
            }}
        />
        <TextField
            value={age}
            label="Enter your age"
            onChange={(e) => {
                setAge(e.target.value);
            }}
        />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Enter your gender</InputLabel>
          <Select
            value={gender}
            label="Select your gender"
          >
            <MenuItem key={UserGender.MALE} value={UserGender.MALE} onClick={() => setGender(UserGender.MALE)}>Male</MenuItem>
            <MenuItem key={UserGender.FEMALE} value={UserGender.FEMALE} onClick={() => setGender(UserGender.FEMALE)}>Female</MenuItem>
            <MenuItem key={UserGender.OTHER} value={UserGender.OTHER} onClick={() => setGender(UserGender.OTHER)}>Other</MenuItem>
            <MenuItem key={UserGender.NOT_SPECIFIED} value={UserGender.NOT_SPECIFIED} onClick={() => setGender(UserGender.NOT_SPECIFIED)}>Not specified</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={updateProfile}>
          Submit
        </Button>
      </FormGroup>
        {/* {profile ? (
          <Box>
            <Box>
              {profile.name}
            </Box>
            <TextField
                value={nameField}
                label="Enter your name"
                onChange={(e) => {
                    setNameField(e.target.value);
                }}
            />
            <Button onClick={updateProfile}>
                Submit
            </Button>
          </Box>
          ) : undefined} */}
    </Box>
  );
}

export default ProfilePanel;