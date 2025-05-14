import {useState, useEffect} from 'react';
import '../styles/App.css';
import Card from '../components/Card';
import LoadingBar from '../components/LoadingBar';
import axios from 'axios';

export default function Projects() {
  const [loading, setLoading] = useState(true);
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasTimedOut(true);
    }, 1000);
  
    axios.get('http://localhost:5000/projects')
    .then(res => {
      clearTimeout(timeout);
      // Sort Projects by date
      const sortedProjects = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setProjects(sortedProjects);
      setLoading(false);
    })
    .catch(err => {
      clearTimeout(timeout);
      console.error('Error fetching projects:', err);
      setLoading(false);
    });
  }, []);

  if (loading && !hasTimedOut) {
    return (
      <LoadingBar type='loading'/>
    );
  }
  
  if (hasTimedOut || !projects) {
    return (
      <LoadingBar type='failed'/>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-800 flex justify-center px-4">
      <div className="font-sans text-blue-100 flex flex-col items-center max-w-5xl w-full py-10">
        <h2 className="text-4xl font-bold mb-10">Projects</h2>

        {projects.map((project, index) => (
          <Card
            key={index}
            type="project"
            title={project.name}
            description={project.description}
            images={project.images}
            date={project.date}
            tech={project.tech}
            link={project.link}
          />
        ))}
      </div>
    </div>
  );
}
