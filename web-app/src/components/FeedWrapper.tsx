import InfiniteScroll from 'react-infinite-scroll-component';
import { MediaType, IPost, IUserProfile, CategoryMomentum } from "./common";
import React, { useState, useEffect, useRef, FunctionComponent } from 'react';
import Post from './Post';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import "./Feed.css";
import Feed from './Feed';

const FeedWrapper: FunctionComponent<{
  userProfile: IUserProfile,
  setUserProfile: React.Dispatch<React.SetStateAction<IUserProfile>>
}> = ({ userProfile, setUserProfile}) => {
  
  return (
    <div>
        {(userProfile.isLoggedIn && userProfile.webId) 
          ?
            <Feed webId={userProfile.webId} userProfile={userProfile} setUserProfile={setUserProfile}/>
          :
            <div className="settings-dialog-container">
              No feed available. Log in first.
            </div>
        }
    </div>
  );
};

export default FeedWrapper;