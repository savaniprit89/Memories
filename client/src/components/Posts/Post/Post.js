import React, { useState } from 'react'
import useStyles from './styles'
import {Card,CardActions,CardContent,CardMedia,Button,Typography,ButtonBase} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment';

import { getPost, likePost, deletePost } from '../../../actions/posts';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom'
const Post=({post,setCurrentId})=> {
  const dispatch = useDispatch();
    const classes=useStyles();
    const history = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
   const [likes,setLikes]=useState(post?.likes)
    //console.log(user?.result)
    //console.log("aaf")
    //console.log(post)
const handleLike=async ()=>{
  dispatch(likePost(post._id))
  if(post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))){
    
setLikes(post.likes.filter((id)=> id !== (user?.result.googleId || user?.result?._id)))
  }
  else{
setLikes([...post.likes,user?.result.googleId || user?.result?._id])
  }
};
    const Likes = () => {
      if (likes.length > 0){
        return likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
          ? (
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
          ) : (
            <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
          );
      }
  
      return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openPost=()=>{
      history(`/posts/${post._id}`)
    }
  return (
 
    <Card className={classes.card} raised elevation={6}>
 <ButtonBase className={classes.cardAction} onClick={openPost} >
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.name === post?.name || user?.result?._id === post?._id) && (
      <div className={classes.overlay2} name="edit">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentId(post._id);
          }}
          style={{ color: 'white' }}
          size="small"
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      )}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
      </CardContent>
      </ButtonBase>
    <CardActions className={classes.cardActions}>
      <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
        <Likes />
      </Button>
      {(user?.result?.name === post?.name || user?.result?._id === post?._id) && (
        <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="small" /> &nbsp; Delete
        </Button>
      )}
    </CardActions>
  </Card>
  )
}

export default Post