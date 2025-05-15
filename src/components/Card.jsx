import { useState } from 'react';
import '../styles/App.css';
import Logo from './Logo';

export default function Card({ 
  type, 
  title, 
  birthDate, 
  image, 
  images, 
  description, 
  tech, 
  date, 
  link, 
  progress, 
  institution, 
  email, 
}) {

  switch (type) {
    case 'profile':
      return profileCard({title, image, description, birthDate});
    case 'project':
      return projectCard({title, description, images, tech, link, date});
    case 'education':
      return educationCard({title, description, image, date, institution});
    case 'skill':
      return skillCard({image, link, tech, date});
    case 'message':
      return messageCard({title, email, description, date})
    default:
      return null;
  }
}

// -- Profile Card Layout --

function profileCard({ title, image, description, birthDate }) {
  
  const calculateAge = (birthDateString) => {
    const birthDate = new Date(birthDateString);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  };

  const age = birthDate ? calculateAge(birthDate) : null;

  return (
    <>
      <h2 className="text-4xl font-bold mb-10 text-center text-indigo-100">
        {title || "About Me"}
      </h2>

      {birthDate && (
        <p className="text-xl text-center mb-8 text-indigo-300">
          {age !== null && `Age: ${age}`}
        </p>
      )}

      <p
        className="text-lg leading-relaxed border-l-4 border-indigo-400 pl-6 text-blue-200 mb-15"
        dangerouslySetInnerHTML={{ __html: description }}
      ></p>
    </>
  );
}

// -- Project Card Layout --

function projectCard({title, description, images, tech, link, date}) {

  const [selectedImage, setSelectedImage] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedImage(null);
      setIsClosing(false);
    }, 300);
  };

  return (
    <div className="relative bg-indigo-800/60 backdrop-blur-md rounded-2xl shadow-2xl p-6 mb-10 flex flex-col items-center space-y-6 transition-all transform hover:shadow-3xl max-w-4xl hover:scale-102">

      <h2 className="text-3xl font-bold text-indigo-100">{title}</h2>
    
      <p className="text-lg text-indigo-300 text-center leading-relaxed">{description}</p>

      {images?.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-4 w-full">
            {images.map((imgSrc, index) => (
              <button 
                key={index}
                onClick={() => setSelectedImage(imgSrc)}
                className="flex justify-center items-center"
              >
                <img
                  src={imgSrc}
                  alt={`${title} image ${index + 1}`}
                  className="rounded-lg shadow-md object-cover w-full h-64 bg-gray-700 hover:scale-103 transition-transform duration-300 cursor-zoom-in"
                  style={{
                    aspectRatio: imgSrc.includes('mobile') ? '9 / 16' : '4 / 3',
                  }}
                />
              </button>
            ))}
          </div>

          {selectedImage && (
            <div 
              className={`absolute top-0 left-0 w-full h-full bg-gray/50 flex justify-center items-center z-50 backdrop-blur-sm rounded-2xl cursor-zoom-out ${
                  isClosing ? 'animate-fadeOut' : 'animate-fadeIn'
              }`}
              onClick={handleCloseModal}
            >
              <div className={`relative ${isClosing ? 'animate-zoomOut' : 'animate-zoomIn'}`}>
                <img 
                  src={selectedImage} 
                  alt="Expanded" 
                  className="max-w-[90vw] max-h-[70vh] rounded-lg object-cover"
                />
              </div>
            </div>
          )}
        </>
      )}

      {tech?.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {tech.map((tech, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-indigo-700/80 rounded-md text-indigo-100 text-sm shadow hover:bg-indigo-700"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {link && (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-6 inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-md"
        >View Project</a>
      )}

      {date && (
        <p className="text-sm text-indigo-400 italic">
          {new Date(date).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}

// -- Education Card Layout --

function educationCard({title, description, image, date, institution}) {
  return (
    <div className="relative bg-indigo-800/60 backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-10 flex flex-col items-center text-center transition-transform hover:scale-105 max-w-3xl mx-auto">

      <h2 className="text-3xl font-bold text-indigo-100 mb-2">{title}</h2>

      {image && (
        <img 
          src={image}
          alt={title} 
          className="w-36 h-36 object-contain mb-4"
        />
      )}

      <h3 className="text-xl font-bold text-indigo-200 mb-2">{institution}</h3>

      <p className="text-indigo-300 text-base mb-4 px-2 leading-relaxed">{description}</p>

      {date && (
        <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-indigo-400 italic">{new Date(date).toLocaleDateString()}</p>
      )}
    </div>
  );
}

// -- Skill Card Layout --

function skillCard({image, link, tech, date}) {
  return (
    <div className="bg-indigo-800 rounded-xl shadow-lg p-6 mb-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
      <Logo
        styling='image-small'
        image={image}
        link={link}
      />
      <h2 className="text-2xl font-semibold text-blue-100 mb-2">{tech}</h2>
      <p className="text-blue-300 text-sm">{new Date(date).toLocaleDateString()}</p>
    </div>
  );
}

// -- Messsage Card Layout --

function messageCard({title, email, description, date}) {
  return (
    <div className="relative bg-indigo-800/60 backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-10 flex flex-col items-center text-center transition-transform hover:scale-105 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-2xl font-semibold">{title}</h3>
      </div>
      <p className="text-lg text-blue-200 mb-1">{email}</p>
      <p className="text-indigo-300 text-base mb-4 px-2 leading-relaxed">{description}</p>
      <p className="text-sm text-indigo-400">{new Date(date).toLocaleString()}</p>
    </div>
  );
}