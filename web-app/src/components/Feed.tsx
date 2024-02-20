import InfiniteScroll from 'react-infinite-scroll-component';
import { ICategory, IMediaType, IPost } from "./common";
import React, { useState, useEffect, useRef } from 'react';
import Post from './Post';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import "./Feed.css";
import { useSolidAuth } from "@ldo/solid-react";

const exampleCategory: ICategory = {id:0, name:"cat0", image:"url"}
const examplePost: IPost = {id:0, 
    category:exampleCategory, 
    media_type:IMediaType.IMAGE, 
    media_url:'images/jk-placeholder-image.jpg', 
    caption:'caption caption caption'}

const Feed = () => {
  const { session } = useSolidAuth();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  async function fetch() : Promise<IPost[]> {
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
    //   const response = await fetch(`https://api.example.com/items?page=${page}`);
    //   const data = await response.json();
      
      const data: IPost[] = await fetch();
  
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
        <Post id={examplePost.id} category={examplePost.category} media_type={examplePost.media_type} media_url={examplePost.media_url} caption={examplePost.caption}/>
        ))}
      </InfiniteScroll>
      {error && <p>Error: cannot fetch data</p>}
    </div>
  );
};

export default Feed;