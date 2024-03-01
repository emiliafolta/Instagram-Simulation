import InfiniteScroll from 'react-infinite-scroll-component';
import { MediaType, IPost, IUserProfile, CategoryMomentum } from "./common";
import React, { useState, useEffect, useRef, FunctionComponent } from 'react';
import Post from './Post';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import "./Feed.css";
import { useSolidAuth } from "@ldo/solid-react";
import config from "./config";
import { LinkedDataObject } from "ldo";
import { SolidProfileShape } from "../ldo/solidProfile.typings";
import { SolidProfileShapeFactory } from "../ldo/solidProfile.ldoFactory";
import { fetch as solid_fetch } from "@inrupt/solid-client-authn-browser";

const Feed: FunctionComponent<{
  userProfile: IUserProfile,
  setUserProfile: React.Dispatch<React.SetStateAction<IUserProfile>>
}> = ({ userProfile, setUserProfile}) => {
  
  const { session } = useSolidAuth();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  

  const dataToSend = {
    categories: [['fashion', 3], ['sports', 4]],
    gender: 'male',
    age: 30,
    location: 'Oxford',
    exclude: [13456234, 82354236, 439857948]
  };
  
  async function automaticFetch() {
    fetch(config.BACKEND_BASE_URL + '/send-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    }).then(response => {
      // Handle response
      console.log(response)
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  const mapArrayToPostObject = (postArray : any[]) => {
    const post: IPost = {
      id: postArray[0], 
      category: postArray[1], 
      caption: postArray[2],
      like_count: postArray[3],
      media_type: postArray[4], 
      media_url: config.BACKEND_BASE_URL + '/images/'+ postArray[5], 
      location: postArray[6],
    }
    return post
  }

  const fetchData = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await fetch(config.BACKEND_BASE_URL + "/posts");
      const postData = await response.json();
      const data : IPost[] = postData.map((post : any[]) => mapArrayToPostObject(post))
  
      setPosts([...posts, ...data]);
    } catch (error) {
      setError(true)
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  async function initialiseMomentum() {
    const initMomentum: CategoryMomentum[] = [];
    categories.forEach((categoryName: string) => {
      const newMomentum = {categoryName: categoryName, momentum: 0};
      initMomentum.push(newMomentum);
    })
    setUserProfile({
      ...userProfile,
      categoryMomentum: initMomentum
    })
  }

  // use fetchData initially
  useEffect(() => {
    // // fetch interaction data from solid into userProfile
    // fetchInteractions().then(()=>{
    //   // then initialise the momentum in userProfile
    //   initialiseMomentum().then(()=>{
    //     // then fetch the post data
    //     fetchData();
    //   })
    // })
    fetchData();
  }, []);

  
  // fetch the interaction data from solid profile and initialise the momentum array
  async function fetchInteractions() {
    const webId = userProfile.webId? userProfile.webId : "";
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
      categoryInteractions: solidProfile.likedCategories ? solidProfile.likedCategories : []
    })
  }

  // update the solid profile with new data
  async function updateSolidProfile() {
    if (solidProfile) {
      const webId = userProfile.webId? userProfile.webId : "";
      const modifiedProfile = solidProfile.$clone();
      modifiedProfile.likedCategories = userProfile.categoryInteractions;
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
    }
  }

  // use fetchData initially
  useEffect(() => {
    automaticFetch();
  }, []);

  // solid profile to get the existing interaction data from and update it when fetching new data
  const [solidProfile, setSolidProfile] = useState<LinkedDataObject<SolidProfileShape> | undefined>();
  const [categories, setCategories] = useState<string[]>([]);
  
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

  

  // we will assume each post updates the userProfile interactions and momentum 
  // on each fetchData we will use the current data in userProfile and upload the interactions to solid profile
  // we will also clear the momentum which will be on a fetch-based basis

  if (!session.isLoggedIn) return <div>No blog available. Log in first.</div>;
  else return (
    <div>
      {!error &&
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchData}
          hasMore={true} // Replace with a condition based on your data source
          loader={<Box className='feedLoader'>
                  <CircularProgress className='circularProgress'/>
              </Box>}
          endMessage={<div>Yay! You have seen it all!</div>}
          
        >
          {posts.map(post => (
            <Post id={post.id} category={post.category} media_type={post.media_type} media_url={post.media_url} caption={post.caption} like_count={post.like_count} location={post.location} />
          ))}
        </InfiniteScroll>
      }
      {error && <div>Error: cannot fetch data</div>}
    </div>
  );
};

export default Feed;