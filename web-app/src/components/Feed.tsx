import InfiniteScroll from 'react-infinite-scroll-component';
import { ICategory, IMediaType, IPost } from "./common";
import React, { useState, useEffect, useRef } from 'react';
import Post from './Post';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import "./Feed.css";
import { useSolidAuth } from "@ldo/solid-react";
import config from "./config"

const exampleCategory: ICategory = {id:0, name:"cat0", image:"url"}
const examplePost: IPost = {
    id:0, 
    category:exampleCategory, 
    caption:'caption caption caption',
    like_count: 10,
    media_type:IMediaType.IMAGE, 
    media_name:'images/jk-placeholder-image.jpg', 
    location: "Oxford",
}

const Feed = () => {
  const { session } = useSolidAuth();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  async function fetch_data() : Promise<IPost[]> {
    return new Promise((resolve) => {
      // Simulate an asynchronous operation (e.g., fetching data from an API)
      setTimeout(() => {
        const data = [examplePost, examplePost, examplePost, examplePost, examplePost];
        resolve(data);
      }, 500); // 1000 milliseconds = 1 second
    });
  }

  const fetchData = async () => {
    setIsLoading(true);
    setError(false);
  
    try {
      const response = await fetch(config.BACKEND_BASE_URL + "/posts");
      const postData: IPost[] = await response.json();
      console.log(postData)

      
      const data: IPost[] = await fetch_data();
  
      setPosts([...posts, ...data]);
    } catch (error) {
      setError(true)
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  // use fetchData initially
  useEffect(() => {
    fetchData();
  }, []);

  if (!session.isLoggedIn) return <p>No blog available. Log in first.</p>;
  else return (
    <div>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchData}
        hasMore={true} // Replace with a condition based on your data source
        loader={<Box className='feedLoader'>
                <CircularProgress className='circularProgress'/>
            </Box>}
        endMessage={<p>Yay! You have seen it all!</p>}
      >
        {posts.map(post => (
        <Post id={examplePost.id} category={examplePost.category} media_type={examplePost.media_type} media_name={examplePost.media_name} caption={examplePost.caption} like_count={examplePost.like_count} location={examplePost.location} />
        ))}
      </InfiniteScroll>
      {error && <p>Error: cannot fetch data</p>}
    </div>
  );
};

export default Feed;