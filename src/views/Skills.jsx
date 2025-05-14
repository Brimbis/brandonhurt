import {useState, useEffect} from 'react';
import '../styles/App.css';
import LoadingBar from '../components/LoadingBar';
import Card from '../components/Card';
import axios from 'axios';

export default function Skills() {
  const [loading, setLoading] = useState(true);
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [skills, setSkills] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasTimedOut(true);
    }, 1000);

    axios.get('http://localhost:5000/skills')
    .then(res => {
      clearTimeout(timeout);
      setSkills(res.data);
      setLoading(false);
    })
    .catch(err => {
      clearTimeout(timeout);
      console.error('Error fetching skills:', err);
      setLoading(false);
    });
  }, []);

  if (loading && !hasTimedOut) {
    return (
      <LoadingBar type='loading'/>
    );
  } 

  if (hasTimedOut || !skills) {
    return (
      <LoadingBar type='failed'/>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-800 flex justify-center px-4">
      <div className="font-sans text-blue-100 flex flex-col items-center max-w-5xl w-full py-10">
        <h2 className="text-4xl font-bold mb-10">Skills</h2>

        <div className="flex flex-wrap justify-center gap-8">
        {skills.map((skill, index) => (
          <Card
            key={index}
            type="skill"
            image={skill.image}
            date={skill.date}
            tech={skill.tech}
            link={skill.link}
          />
        ))}
        </div>
      </div>
    </div>
  );
}