import {useState, useEffect} from 'react';
import '../styles/App.css';
import LoadingBar from '../components/LoadingBar';
import Card from '../components/Card';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = url => axios.get(url).then(res => res.data);

export default function Education() {
  const { data: education, error } = useSWR('/api/education', fetcher);

  if (!education) return <LoadingBar type="loading" />;
  if (error) return <LoadingBar type="failed" />;

  return (
    <div className="min-h-screen w-full bg-gray-800 flex justify-center px-4">
      <div className="font-sans text-blue-100 flex flex-col items-center max-w-5xl w-full py-10">
        <h2 className="text-4xl font-bold mb-10">Education</h2>

        {education.map((education, index) => (
          <Card
            key={index}
            type="education"
            title={education.title}
            description={education.description}
            image={education.image}
            date={education.date}
            progress={education.progress}
            institution={education.institution}
          />
        ))}
      </div>
    </div>
  );
}