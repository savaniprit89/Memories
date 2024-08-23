import React, { useEffect, useState }  from 'react'
import {Container ,AppBar ,Typography,Grow,Grid, Paper, TextField, Button } from '@material-ui/core';
import Posts from '../components/Posts/Posts';
import Pusher from 'pusher-js'
import Form from '../components/Form/Form'
import useStyles from './styles';
import Pagination from '../pagination/Pagination'
import ChipInput from 'material-ui-chip-input'
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPosts } from '../actions/posts';
import { getPostsBySearch } from '../actions/posts.js';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Home() {
  
  const classes = useStyles();
 const history=useNavigate();
 const query = useQuery();
 const page = query.get('page') || 1;
 const searchQuery = query.get('searchQuery');

 const [currentId, setCurrentId] = useState(0);
 const dispatch = useDispatch();

 const [search, setSearch] = useState('');
 const [tags, setTags] = useState([]);


/*
  useEffect(() => {
    dispatch(getPosts());
    console.log("fff")
  }, [currentId, dispatch]);
code with no pagination  if then pagination not there then get posts from here
  */
  
  const searchPost = () => {
    if (search.trim() || tags) {
      console.log("search",search)
      console.log("tags",tags)
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      
    history(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history('/');
    }
  };
/*
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));
*/
const handleKeyPress = (e) => {
  if (e.keyCode === 13) {
    searchPost();
  }
};
const handleAdd = (tag) => setTags([...tags, tag]);

const handleDelete = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer} >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
          <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
                            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (
              <Paper elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home

/*

<Grid item xs={12}  sm={6} md={3} >
<AppBar className={classes.appBarSearch} position="static" color="inherit">
<TextField  name="search" onKeyDown={handleKeyPress} variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e)=> setSearch(e.target.value)} />
<ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
               <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
              </AppBar>
              </Grid>
*/



