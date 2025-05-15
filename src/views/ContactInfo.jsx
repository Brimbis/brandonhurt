import {useState, useEffect} from 'react';
import '../styles/App.css';
import LoadingBar from '../components/LoadingBar';
import Logo from '../components/Logo';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = url => axios.get(url).then(res => res.data);

export default function ContactInfo() {
  const { data: info, error } = useSWR('/api/info', fetcher);

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/messages', formData)
    .then(() => {
      setFormData({name: "", email: "", message: ""});
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    })
    .catch(err => console.error('Error sending the message: ', err));
  };

  if (!info) return <LoadingBar type="loading" />;
  if (error) return <LoadingBar type="failed" />;

  return (
    <div className="min-h-screen w-full bg-gray-800 flex justify-center px-4">
      <div className="font-sans text-blue-100 flex flex-col items-center max-w-5xl w-full py-10">
        <h2 className="text-4xl font-bold mb-6">Contact Me!</h2>
        <p className="text-lg text-center mb-8 max-w-2xl">
          {info.contactInfo?.message}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-16 mt-6">
          <Logo
            link={info.contactInfo?.linkedin}
            image='/images/profile/linkedin-logo.png'
            styling='link-large'
            message='Find me on LinkedIn!'
          />
          <Logo
            link={info.contactInfo?.github}
            image='/images/profile/github-logo.png'
            styling='link-large'
            message='Check out my GitHub!'
          />
          <Logo
            link={info.contactInfo?.discord}
            image='/images/profile/discord-logo.png'
            styling='link-large'
            message='Message me on Discord!'
          />
          <Logo
            link={info.contactInfo?.email}
            image='/images/profile/gmail-logo.png'
            styling='link-large'
            message='Shoot me an email!'
          />
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-gray-900 p-6 rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-indigo-200 text-center">Leave me a Message</h3>

          <div className="mb-4">
            <label className="block mb-1 text-indigo-100" htmlFor="name">Name</label>
            <input
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-indigo-100" htmlFor="email">Email</label>
            <input
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-indigo-100" htmlFor="message">Message</label>
            <textarea
              className="w-full px-4 py-2 rounded bg-gray-700 text-white resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <div className='flex justify-center'>
            <button
              type="submit"
              className={`px-6 py-2 rounded-md transition duration-300 ${
                submitted
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-indigo-500 hover:bg-indigo-600'
              } text-white`}
            >
              {submitted ? 'Message Sent!' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}