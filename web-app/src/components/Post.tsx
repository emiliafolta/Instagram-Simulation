import {FC, useState} from "react";
import "./Post.css"
import {Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography} from "@mui/material";
import { IPost, MediaType } from "./common";

// import icons for like/dislike buttons
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import Avatar from '@mui/material/Avatar';

const Post: FC<IPost> = ({id, category, caption, like_count, media_type, media_url, location}) => {

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    return(
        <Card className="postContainer" key={id}>
            <CardHeader
                className="postCategory"
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
                <IconButton className="postLikeButton" aria-label="like" onClick={() => {setLiked(!liked)}}>
                    {liked ? <FavoriteIcon className="postButton" /> : <FavoriteBorderIcon className="postButton"/>}
                </IconButton>
                <IconButton aria-label="dislike" onClick={() => {setDisliked(!disliked)}}>
                    {disliked ? <ThumbDownAltIcon className="postButton"/> : <ThumbDownOffAltIcon className="postButton"/>}
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default Post