

import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:9000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/post/${id}`);
export const fetchPosts = (page) => API.get(`/retrieve/posts?page=${page}`);
//export const fetchPosts = () => API.get('/retrieve/posts');   no pagination code
export const fetchPostsBySearch = (searchQuery) => API.get(`/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/upload/post', newPost);
export const likePost = (id) => API.patch(`/${id}/likePost`);
export const comment = (value,id) => API.post(`/${id}/commentPost`,{value});
export const updatePost = (id, updatedPost) => API.patch(`/${id}/updatePost`, updatedPost);
export const deletePost = (id) => API.delete(`/${id}/deletePost`);
export const fetchPostsByCreator = (name) => API.get(`/creator?name=${name}`);
export const signIn = (formData) => API.post('/signin', formData);
export const signUp = (formData) => API.post('/signup', formData);