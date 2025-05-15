import {useState, useEffect} from 'react';
import '../styles/App.css';
import Card from '../components/Card';
import LoadingBar from '../components/LoadingBar';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = url => axios.get(url).then(res => res.data);

export default function Projects() {
  const { data: projects, error } = useSWR('/api/projects', fetcher);

  if (!projects) return <LoadingBar type="loading" />;
  if (error) return <LoadingBar type="failed" />;

  return (
    <div className="min-h-screen w-full bg-gray-800 flex justify-center px-4">
      <div className="font-sans text-blue-100 flex flex-col items-center max-w-5xl w-full py-10 mt-20">
        <h2 className="text-4xl font-bold mb-14">Projects</h2>

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
