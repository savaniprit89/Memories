
import {Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route,Routes, Navigate} from 'react-router-dom';

import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import Auth from './Auth/Auth';
import PostDetails from './Postdetails/Postdetails';
import Creator from './creator/Creator'
function App() {
 
const user=JSON.parse(localStorage.getItem('profile'))
 
  return (
 
   <BrowserRouter>
    <Container maxWidth="xl">
   
      <Navbar />
     
      <Routes>
          <Route exact path="/" element={ <Navigate to='/posts'/>} />
          <Route exact path='/posts' element={<Home />}/>
          <Route exact path='/posts/search' element={<Home />}/>
          <Route exact path='/posts/:id' element={<PostDetails />}/>
          <Route exact path="/auth" element={(!user ? <Auth /> : <Navigate to='/posts' />)} />
          <Route exact path='/creators/:name'  element={<Creator />}/>
          <Route exact path='/tags/:name' element={<Creator />}/>
        </Routes>
      
       
      
    </Container>
  </BrowserRouter>

  );
}

export default App;
//@material-ui/core
//xs 12 means full width on small device
//sm 7 out of fall space on larger device
