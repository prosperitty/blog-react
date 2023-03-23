import { Routes, Route, HashRouter } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import BlogList from './components/BlogList';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Nav from './components/Nav';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog';
import CommentForm from './components/CommentForm';
import Profile from './components/Profile';
import Category from './components/Category';
import CategoryList from './components/CategoryList';
import CategoryForm from './components/CategoryForm';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    console.log('home')
  })

  //basename sets url to homepage route set in package.json
  return (
    <HashRouter basename='/'>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/create" element={<BlogForm />} />
        <Route path="/blogs/:blogId" element={<Blog />} />
        <Route path="/blogs/:blogId/comments/create" element={<CommentForm />} />
        <Route path="/category" element={<CategoryList />} />
        <Route path="/category/create" element={<CategoryForm />} />
        <Route path="/category/:categoryId" element={<Category />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/users/profile" element={<Profile />} />
        <Route path="/users/logout" element={<Logout />} />
      </Routes>
    </HashRouter>
  );
};
export default App;