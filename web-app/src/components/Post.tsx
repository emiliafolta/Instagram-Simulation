import {FC, useState} from "react";
import "./Post.css"
import {Box, IconButton, Typography} from "@mui/material";
import { IPost } from "./common";

// import icons for like/dislike buttons
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import Avatar from '@mui/material/Avatar';

const Post: FC<IPost> = ({id, category, media_type, media_name, caption}) => {

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    return(
        <Box className="postContainer">
            <Box className="postCategory">
                <Avatar sx={{ bgcolor: "purple" }} className="postCategoryAvatar">{category.name.charAt(0)}</Avatar>
                <Typography>{category.name}</Typography>
            </Box>
            <img src={media_name} className="postMedia"/>
            <Box className="postButtons">
                <IconButton className="postLikeButton" aria-label="like" onClick={() => {setLiked(!liked)}}>
                    {liked ? <FavoriteIcon className="postButton" /> : <FavoriteBorderIcon className="postButton"/>}
                </IconButton>
                <IconButton aria-label="dislike" onClick={() => {setDisliked(!disliked)}}>
                    {disliked ? <ThumbDownAltIcon className="postButton"/> : <ThumbDownOffAltIcon className="postButton"/>}
                </IconButton>
            </Box>
            <Typography className="postCaption">{caption}</Typography>
        </Box>
    );
}

export default Post