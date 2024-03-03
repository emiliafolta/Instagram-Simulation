import InfiniteScroll from 'react-infinite-scroll-component';
import { MediaType, IPost, IUserProfile, CategoryMomentum, CategoryInteractions, UserGender, categoryNames, selectionWeight, categoryEncodingSeparator } from "./common";
import React, { useState, useEffect, useRef, FunctionComponent } from 'react';
import Post from './Post';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import "./Feed.css";
import { useSolidAuth } from "@ldo/solid-react";
import config from "./config";
import { LinkedDataObject } from "ldo";
import { CategoryLikes, SolidProfileShape } from "../ldo/solidProfile.typings";
import { SolidProfileShapeFactory } from "../ldo/solidProfile.ldoFactory";
import { fetch as solid_fetch } from "@inrupt/solid-client-authn-browser";

const Feed: FunctionComponent<{
  webId: string,
  userProfile: IUserProfile,
  setUserProfile: React.Dispatch<React.SetStateAction<IUserProfile>>
}> = ({ webId, userProfile, setUserProfile}) => {
  
  const [posts, setPosts] = useState<IPost[]>([]);
  const [error, setError] = useState(false);
  // solid profile to get the existing interaction data from and update it when fetching new data
  const [solidProfile, setSolidProfile] = useState<LinkedDataObject<SolidProfileShape> | undefined>();
  const [exclude, setExclude] = useState<any[]>([]);

  // fetch the solid profile data from 
  async function fetchInteractions() {
    const rawProfile = await (
      await solid_fetch(webId)
    ).text();
    const solidProfile = await SolidProfileShapeFactory.parse(
      webId,
      rawProfile,
      { baseIRI: webId }
    );
    setSolidProfile(solidProfile);
    // prepare initial interactions and momentum in case it's first profile load
    const initInteractions: CategoryInteractions[] = [];
    const initMomentum: CategoryMomentum[] = [];
    categoryNames.forEach((categoryName: string) => {
      const newInteraction = {categoryName: categoryName, likes: 0};
      initInteractions.push(newInteraction);
      const newMomentum = {categoryName: categoryName, momentum: 0};
      initMomentum.push(newMomentum);
    })
    if(solidProfile.categoryLikes && (solidProfile.categoryLikes.length > 0)){
      // we have some interactions to retrieve
      transformIntoInteractions(solidProfile.categoryLikes, initInteractions);
    } // otherwise go with the initialised one
    console.log(solidProfile.categoryLikes)
    setUserProfile({
      ...userProfile,
      age: solidProfile.age,
      gender: solidProfile.gender,
      location: solidProfile.location,
      selectedCategories: solidProfile.userSelectedCategories ? solidProfile.userSelectedCategories : [],
      categoryInteractions: initInteractions,
      categoryMomentum: initMomentum,
    })
  }

  function transformIntoInteractions(categoryLikes: string[], interactions: CategoryLikes[]) {
    // categoryLikes is of the form ["mental health and lifestyle%0", "sports%12", ...]
    categoryLikes.forEach((cat: string) => {
      const categorySplit = cat.split(categoryEncodingSeparator, 2);
      const categoryName = categorySplit[0];
      const categoryLikes = +categorySplit[1];
      const categoryIndex = interactions.findIndex(cat => cat.categoryName === categoryName);
      interactions[categoryIndex].likes = categoryLikes;
    })
  }


  // fetch the interaction data from solid profile into userProfile
  async function fetchLikes() {
    console.log(webId)
    const rawProfile = await (
      await solid_fetch(webId)
    ).text();
    const solidProfile = await SolidProfileShapeFactory.parse(
      webId,
      rawProfile,
      { baseIRI: webId }
    );
    // prepare initial interactions and momentum in case it's first profile load
    const initInteractions: CategoryInteractions[] = [];
    const initMomentum: CategoryMomentum[] = [];
    categoryNames.forEach((categoryName: string) => {
      const newInteraction = {categoryName: categoryName, likes: 0};
      initInteractions.push(newInteraction);
      const newMomentum = {categoryName: categoryName, momentum: 0};
      initMomentum.push(newMomentum);
    })

    setSolidProfile(solidProfile);
    // categoryInteractions should be initialised in the solid profile to [{cat_name, likes}, ...]
    if(solidProfile.categoryInteractions){
      const categoryInteractions = [...solidProfile.categoryInteractions];
      console.log(categoryInteractions)
      // if the categoryInteractions are there but not initialised - initialise them
      if(categoryInteractions.length == 0){
        console.log('if if')
        setUserProfile({
          ...userProfile,
          age: solidProfile.age,
          gender: solidProfile.gender,
          location: solidProfile.location,
          selectedCategories: solidProfile.userSelectedCategories ? solidProfile.userSelectedCategories : [],
          categoryInteractions: initInteractions,
          categoryMomentum: initMomentum,
        })
      } else { // otherwise get them from solid profile
        console.log('if eeelse')
        setUserProfile({
          ...userProfile,
          age: solidProfile.age,
          gender: solidProfile.gender,
          location: solidProfile.location,
          selectedCategories: solidProfile.userSelectedCategories ? solidProfile.userSelectedCategories : [],
          categoryInteractions: solidProfile.categoryInteractions,
          categoryMomentum: initMomentum,
        })
      }
    } else if(userProfile.categoryInteractions) { // interactions are not in solid but are here
      console.log('if else')
      setUserProfile({
        ...userProfile,
        age: solidProfile.age,
        gender: solidProfile.gender,
        location: solidProfile.location,
        selectedCategories: solidProfile.userSelectedCategories ? solidProfile.userSelectedCategories : [],
        categoryMomentum: initMomentum,
      })
    } else {
      console.log('else')
      setUserProfile({
        ...userProfile,
        age: solidProfile.age,
        gender: solidProfile.gender,
        location: solidProfile.location,
        selectedCategories: solidProfile.userSelectedCategories ? solidProfile.userSelectedCategories : [],
        categoryInteractions: initInteractions,
        categoryMomentum: initMomentum,
      })
    }
  }

  // initialise/clear the momentum in userProfile
  async function clearMomentum() {
    const initMomentum: CategoryMomentum[] = [];
    categoryNames.forEach((categoryName: string) => {
      const newMomentum = {categoryName: categoryName, momentum: 0};
      initMomentum.push(newMomentum);
    })
    setUserProfile({
      ...userProfile,
      categoryMomentum: initMomentum
    })
    console.log("clear momentum")
  }
  

  interface RequestBody {
    categories?: ((string|number)[])[],
    gender?: UserGender,
    age?: number,
    location?: string,
    exclude?: string[]
  }
  
  async function fetchData() {
    const requestBody: RequestBody = {}
    if(userProfile.gender == UserGender.MALE || userProfile.gender == UserGender.FEMALE) requestBody.gender = userProfile.gender
    if(userProfile.age) requestBody.age = userProfile.age
    if(userProfile.location) requestBody.location = userProfile.location
    requestBody.exclude = exclude
    requestBody.categories = []
    categoryNames.forEach((categoryName: string) => {
      // we can assume each category is already in both momentum and interactions
      const categoryIndexInteractions = userProfile.categoryInteractions.findIndex(cat => cat.categoryName === categoryName);
      const categoryIndexMomentum = userProfile.categoryMomentum.findIndex(cat => cat.categoryName === categoryName);
      const categoryIndexSelected = userProfile.selectedCategories.findIndex(cat => cat === categoryName);
      // interaction score is the number of likes plus the weight of user selection
      let interactionScore = 0
      if(categoryIndexInteractions !== -1) interactionScore += userProfile.categoryInteractions[categoryIndexInteractions].likes;
      if(categoryIndexSelected !== -1) interactionScore += selectionWeight
      let momentumScore = 0;
      if(categoryIndexMomentum !== -1) momentumScore += userProfile.categoryMomentum[categoryIndexMomentum].momentum;
      // momentum score is simply the momentum since last fetch
      const categoryScore = [categoryName, interactionScore, momentumScore]
      requestBody.categories?.push(categoryScore)
    })
    console.log(requestBody)
    try {
      // get the selected posts
      const responseSelected = await fetch(config.BACKEND_BASE_URL + '/posts_from_categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
      const postDataSelected = await responseSelected.json()
      const selectedData : IPost[] = postDataSelected.map((post : any[]) => mapArrayToPostObject(post, true))

      // get some random posts
      const responseRandom = await fetch(config.BACKEND_BASE_URL + '/posts')
      const postDataRandom = await responseRandom.json()
      const randomData : IPost[] = postDataRandom.map((post : any[]) => mapArrayToPostObject(post))

      const allData = selectedData.concat(randomData)
      updateExclude(allData)

      setPosts([...posts, ...allData]);
    } catch {
      setError(true)
      console.log(error)
    } finally {
      updateInteractions();
    }
    
  }

  function updateExclude(array: IPost[]){
    let newExclude = exclude
    array.forEach(post => {
      newExclude = newExclude.concat([post.id])
    })
    setExclude(newExclude)
  }

  // update the solid profile with new data
  async function updateInteractions() {
    console.log("update interactions")
    if (solidProfile) {
      const modifiedProfile = solidProfile.$clone();
      modifiedProfile.categoryLikes = userProfile.categoryInteractions.map((category, index) => {
        // merge the category name and likes into a single string
        const resultingString = category.categoryName + categoryEncodingSeparator + category.likes.toString()
        return resultingString
      });
      const response = await solid_fetch(webId, {
        method: "PATCH",
        body: await modifiedProfile.$toSparqlUpdate(),
        headers: {
          "Content-Type": "application/sparql-update"
        }

      }).then((response) => {
        console.log("GOT A RESPONSE");
        setSolidProfile(modifiedProfile);
        // fetchInteractions();
        // modifiedProfile.categoryInteractions?.forEach(cat =>{console.log(cat.categoryName), console.log(cat.likes)})
      })
      clearMomentum();
      // automaticFetch();
    }
  }

  const mapArrayToPostObject = (postArray : any[], selected: boolean = false) => {
    const post: IPost = {
      id: postArray[0], 
      category: postArray[1], 
      caption: postArray[2],
      like_count: postArray[3],
      media_type: postArray[4], 
      media_url: config.BACKEND_BASE_URL + '/images/'+ postArray[5], 
      location: postArray[6],
      userProfile: userProfile,
      setUserProfile: setUserProfile,
      selected: selected,
    }
    return post
  }

  // fetch data and interactions initially (first load)
  useEffect(() => {
    fetchInteractions();
    fetchData();
  }, []);
  
  // we will assume each post updates the userProfile interactions and momentum 
  // on each fetchData we will use the current data in userProfile and upload the interactions to solid profile
  // we will also clear the momentum which will be on a fetch-based basis

  return (
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
            <Post id={post.id} category={post.category} media_type={post.media_type} media_url={post.media_url} caption={post.caption} like_count={post.like_count} location={post.location} userProfile={userProfile} setUserProfile={setUserProfile} selected={post.selected}/>
          ))}
        </InfiniteScroll>
      }
      {error && <div>Error: cannot fetch data</div>}
    </div>
  );
};

export default Feed;