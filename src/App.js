import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import BlogList from './components/BlogList';
import Signup from './components/Signup';
import Login from './components/Login';
import Nav from './components/Nav';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="blogs" element={<BlogList />} />
        <Route path="blogs/create" element={<BlogForm />} />
        <Route path="blogs/:blogId" element={<Blog />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;