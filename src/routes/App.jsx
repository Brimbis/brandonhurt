import '../styles/App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import BackToTopButton from '../components/BackToTopButton.jsx';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import AboutMe from '../views/AboutMe.jsx';
import Projects from '../views/Projects.jsx';
import Education from '../views/Education.jsx';
import Skills from '../views/Skills.jsx';
import ContactInfo from '../views/ContactInfo.jsx';
import Messages from '../views/Messages.jsx';

export default function App() {
  return (
    <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<AboutMe/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/education" element={<Education/>}/>
          <Route path="/skills" element={<Skills/>}/>
          <Route path="/contact" element={<ContactInfo/>}/>
          <Route path="/messages" element={<Messages/>}/>
        </Routes>
      <Footer/>
      <BackToTopButton/>
    </Router>
  );
}
