import {FC, useState} from "react";
import "./Post.css"
import {Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography} from "@mui/material";
import { IPost, MediaType, dislikeWeight, likeWeight } from "./common";

// import icons for like/dislike buttons
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import Avatar from '@mui/material/Avatar';

const Post: FC<IPost> = ({id, category, caption, like_count, media_type, media_url, location, userProfile, setUserProfile, selected}) => {

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    // add the score points to interactions and momentum for this category
    const onCategoryInteraction = (categoryName: string, like: boolean) => {
        const updatedInteractions = userProfile.categoryInteractions;
        const updatedMomentum = userProfile.categoryMomentum;
        // find the index of the correct category-likes object
        const categoryIndexInteractions = userProfile.categoryInteractions.findIndex(cat => cat.categoryName === categoryName);
        // we can assume each category is already in the 
        if (categoryIndexInteractions !== -1) {
            console.log(updatedInteractions[categoryIndexInteractions].likes)
            updatedInteractions[categoryIndexInteractions].likes += (like ? likeWeight : dislikeWeight);
            console.log(updatedInteractions[categoryIndexInteractions].likes)
        } else {
            console.log(`Category '${categoryName}' not found.`);
        }
        // find the index of the correct category-likes object
        const categoryIndexMomentum = userProfile.categoryMomentum.findIndex(cat => cat.categoryName === categoryName);
        // we can assume each category is already in the 
        if (categoryIndexMomentum !== -1) {
            updatedMomentum[categoryIndexMomentum].momentum += (like ? likeWeight : dislikeWeight);
        } else {
            console.log(`Category '${categoryName}' not found.`);
        }

        setUserProfile({
            ...userProfile,
            categoryInteractions: updatedInteractions,
            categoryMomentum: updatedMomentum,
          })
    }

    return(
        <Card className={selected ? "postContainerSelected" : "postContainer"} key={id}>
            <CardHeader
                className="postCategory"
                sx={{"MuiClassHeader-title": {fontSize: "1rem",} }}
                avatar={
                    <Avatar sx={{ bgcolor: "purple" }} className="postCategoryAvatar" >
                        {category.charAt(0)}
                    </Avatar>}
                title={category}
            />
            {(media_type == MediaType.VIDEO) ?
            <CardMedia
                component='video'
                className='postMedia'
                image={media_url}
                autoPlay
                muted={true}
            /> : 
            <CardMedia
                component='img'
                className='postMedia'
                image={media_url}
            />
            }
            <CardContent>
                <Typography className="postCaption">{caption}</Typography>
            </CardContent>
            <CardActions>
                <IconButton 
                    className="postLikeButton" 
                    aria-label="like" 
                    disabled={!userProfile.allowLearning}
                    onClick={() => {
                        setLiked(!liked);
                        if(userProfile.allowLearning) onCategoryInteraction(category, true);
                    }}
                >
                    {liked 
                    ? <FavoriteIcon className={userProfile.allowLearning ? "postButton" : "disabledButton"} /> 
                    : <FavoriteBorderIcon className={userProfile.allowLearning ? "postButton" : "disabledButton"}/>}
                </IconButton>
                <IconButton 
                    aria-label="dislike" 
                    disabled={!userProfile.allowLearning}
                    onClick={() => {
                        setDisliked(!disliked);
                        if(userProfile.allowLearning) onCategoryInteraction(category, false);
                    }}
                >
                    {disliked 
                    ? <ThumbDownAltIcon className={userProfile.allowLearning ? "postButton" : "disabledButton"}/> 
                    : <ThumbDownOffAltIcon className={userProfile.allowLearning ? "postButton" : "disabledButton"}/>}
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default Post