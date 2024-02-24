import InfiniteScroll from 'react-infinite-scroll-component';
import { IMediaType, IPost } from "./common";
import React, { useState, useEffect, useRef } from 'react';
import Post from './Post';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import "./Feed.css";
import { useSolidAuth } from "@ldo/solid-react";
import config from "./config"

const examplePost: IPost = {
    id:0, 
    category: "cat0", 
    caption:'caption caption caption',
    like_count: 10,
    media_type:IMediaType.IMAGE, 
    media_url:'images/jk-placeholder-image.jpg', 
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
      console.log(postData)
      const data : IPost[] = postData.map((post : any[]) => mapArrayToPostObject(post))
      console.log(data)

      
      // const data: IPost[] = await fetch_data();
  
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