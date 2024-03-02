import { FormEvent, FunctionComponent, useCallback, useEffect, useState } from "react";
import { LinkedDataObject } from "ldo";
import { SolidProfileShape } from "../ldo/solidProfile.typings";
import { SolidProfileShapeFactory } from "../ldo/solidProfile.ldoFactory";
import { fetch as solid_fetch } from "@inrupt/solid-client-authn-browser";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Switch, TextField, Typography } from "@mui/material";
import config from "./config";
import { CategoryInteractions, IUserProfile, UserGender, categoryNames } from "./common";
import "./ProfilePanel.css";

const ProfilePanel: FunctionComponent<{ 
  webId: string,
  onClose: () => void,
  userProfile: IUserProfile,
  setUserProfile: React.Dispatch<React.SetStateAction<IUserProfile>>
}> = ({ webId, onClose, userProfile, setUserProfile }) => {

  const [solidProfile, setSolidProfile] = useState<LinkedDataObject<SolidProfileShape> | undefined>();

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
    <Box className="profilePanelContainer">
      <FormGroup>
        <Typography className="panelSectionHeader">Your interests</Typography>
        <Box className="categoriesContainer">
        {categoryNames.map(category => (
             <FormControlLabel 
              className="categoryCheckboxAndLabel"
              control={<Checkbox className="categoryCheckbox"/>} 
              label={category} 
              checked={userProfile.selectedCategories.includes(category)}
              onClick={() => selectCategory(category)}
            />
            ))}
          <Box className="learningInputBox">
            <Typography className="learningLabel">Learn my interests from interactions:</Typography>
            <Switch 
              className="learningInput"
              checked={userProfile.allowLearning}
              onChange={(e) => {
                  const newBool = !userProfile.allowLearning
                  setUserProfile({
                    ...userProfile,
                    allowLearning: newBool
                  })
              }}
            />
          </Box>
        </Box>
        <Typography className="panelSectionHeader">Your details</Typography>
        <Box className="dataContainer">
          <Box className="dataInputBox">
            <Typography className="dataLabel">Location:</Typography>
            <TextField
                className="dataInput"
                value={userProfile.location}
                label="Enter your location"
                onChange={(e) => {
                  setUserProfile({
                    ...userProfile,
                    location: e.target.value
                  })
                }}
            />
          </Box>
          <Box className="dataInputBox">
            <Typography className="dataLabel">Gender:</Typography>
            <FormControl 
              variant="standard" 
              sx={{ m: 1, minWidth: 210 }}
              className="dataInput"
            >
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
          </Box>
          <Box className="dataInputBox">
            <Typography className="dataLabel">Age:</Typography>
            <TextField
              className="dataInput"
              value={userProfile.age}
              label="Enter your age"
              onChange={(e) => {
                  setUserProfile({
                    ...userProfile,
                    age: +e.target.value
                  })
              }}
            />
          </Box>
        </Box>   
        <Box className="submitButtonBox">
          <Button 
            className="submitButton"
            onClick={() => {
              updateProfile();
              onClose();
            }}
          >
            Submit
          </Button>
        </Box>     
      </FormGroup>
    </Box>
  );
}

export default ProfilePanel;