import '../styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BackToTopButton from '../components/BackToTopButton.jsx';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import AboutMe from '../views/AboutMe.jsx';
import Projects from '../views/Projects.jsx';
import Education from '../views/Education.jsx';
import Skills from '../views/Skills.jsx';
import ContactInfo from '../views/ContactInfo.jsx';

export default function App() {
  return (
    <Router>
      <Navbar/>
      <div className="mt-14">
        <Routes>
          <Route path="/" element={<AboutMe/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/education" element={<Education/>}/>
          <Route path="/skills" element={<Skills/>} />
          <Route path="/contact" element={<ContactInfo/>}/>
        </Routes>
      </div>
      <Footer/>
      <BackToTopButton/>
    </Router>
  );
}
