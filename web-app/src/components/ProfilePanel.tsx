import { FormEvent, FunctionComponent, useCallback, useEffect, useState } from "react";
import { LinkedDataObject } from "ldo";
import { SolidProfileShape } from "../ldo/solidProfile.typings";
import { SolidProfileShapeFactory } from "../ldo/solidProfile.ldoFactory";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { Box, Button, TextField } from "@mui/material";

const ProfilePanel: FunctionComponent<{ webId: string }> = ({ webId }) => {
  const [profile, setProfile] = useState<LinkedDataObject<SolidProfileShape> | undefined>();
  const [nameField, setNameField] = useState<string>("");

  async function fetchProfile() {
    const rawProfile = await (
      await fetch(webId)
    ).text();
    const solidProfile = await SolidProfileShapeFactory.parse(
      webId,
      rawProfile,
      { baseIRI: webId }
    );
    setProfile(solidProfile);
    setNameField(solidProfile.name || "");
  }

  async function updateProfile() {
    if (profile) {
      const modifiedProfile = profile.$clone();
      modifiedProfile.name = nameField;
      const response = await fetch(webId, {
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

  useEffect(() => {
    fetchProfile();
  }, [webId]);

  return (
    <Box>
        {profile ? (
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
          ) : undefined}
    </Box>
  );
}

export default ProfilePanel;