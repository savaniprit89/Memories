import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import {commentPost}  from '../actions/posts'
const CommentSection = ({ post}) => {
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const dispatch=useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const commentsRef=useRef();
    const handleComment = async () => {
       const finalComment=`${user.result.name}: ${comment}`;
      const newComments= await dispatch(commentPost(finalComment,post._id));
     // const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));
      setComments(newComments)
      setComment('')

      commentsRef.current.scrollIntoView({ behavior: 'smooth' });
      };

   return(
    <div>
    <div className={classes.commentsOuterContainer}>
      <div className={classes.commentsInnerContainer} style={{ width: '40%' }} >
        <Typography gutterBottom variant="h6">Comments</Typography>
        {comments?.map((c, i) => (
          <Typography key={i} gutterBottom variant="subtitle1">
          <strong>{c.split(':')[0]}:</strong>
          {c.split(':')[1]}
          </Typography>
        ))}
        <div ref={commentsRef} />
      </div>
      {user?.result?.name &&(
      <div style={{ width: '60%' }}>
        <Typography gutterBottom variant="h6">Write a comment</Typography>
        <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
        <br />
        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} color="primary" variant="contained" onClick={handleComment}>
          Comment
        </Button>
      </div>
      )}
    </div>
    
  </div>
    );
  };
  
  export default CommentSection;