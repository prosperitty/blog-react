import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import BlogList from './components/BlogList';
import Signup from './components/Signup';
import Login from './components/Login';
import Nav from './components/Nav';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog';
import CommentForm from './components/CommentForm';
import Profile from './components/Profile';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="blogs" element={<BlogList />} />
        <Route path="blogs/create" element={<BlogForm />} />
        <Route path="blogs/:blogId" element={<Blog />} />
        <Route path="blogs/:blogId/comments/create" element={<CommentForm />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/users/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;