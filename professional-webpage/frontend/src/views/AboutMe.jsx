import { useState, useEffect } from 'react';
import '../styles/App.css';
import Logo from '../components/Logo.jsx';
import Card from '../components/Card.jsx';
import LoadingBar from '../components/LoadingBar.jsx';
import axios from 'axios';

export default function AboutMe() {
  const [loading, setLoading] = useState(true);
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [info, setInfo] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasTimedOut(true);
    }, 1000);

    axios.get('http://localhost:5000/info')
      .then(res => {
        clearTimeout(timeout);
        setInfo(res.data);
        setLoading(false);
      })
      .catch(err => {
        clearTimeout(timeout);
        console.error('Error fetching info:', err);
        setLoading(false);
      });
  }, []);

  if (loading && !hasTimedOut) {
    return (
      <LoadingBar type='loading'/>
    );
  }

  if (hasTimedOut || !info) {
    return (
      <LoadingBar type='failed'/>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-800 flex justify-center px-4">
      <div className="font-sans text-blue-100 flex flex-col items-center max-w-4xl w-full">
        

        <header className="bg-indigo-800 text-5xl mt-20 w-full text-center rounded-xl shadow-xl p-3 border border-indigo-700">
          <Logo
            image='/images/profile/profile-image.jpeg'
            styling='profile'
          />
          <h1 className="mt-6 mb-6 text-blue-100 font-semibold text-5xl tracking-wide">{info.name}</h1>
          <div className="flex justify-center space-x-6 mt-4">
            <Logo
              link={info.contactInfo?.linkedin}
              image="/images/profile/linkedin-logo.png"
              styling="link"
            />
            <Logo
              link={info.contactInfo?.github}
              image="/images/profile/github-logo.png"
              styling="link"
            />
            <Logo
              link={info.contactInfo?.discord}
              image="/images/profile/discord-logo.png"
              styling="link"
            />
            <Logo
              link={info.contactInfo?.email}
              image="/images/profile/gmail-logo.png"
              styling="link"
            />
          </div>
        </header>


        <main className="w-full bg-indigo-900/80 backdrop-blur-sm rounded-xl shadow-xl p-10 mt-14 text-left text-blue-100 max-w-5xl mx-auto">
          
          <Card
            type='profile'
            title='Biography'
            birthDate={info.birthDate}
            description={info.biography}
          />

        </main>

      </div>
    </div>
  );
}
