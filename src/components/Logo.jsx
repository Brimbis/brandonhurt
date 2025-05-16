import '../styles/App.css';

export default function Logo({link, image, styling, message}) {

  switch (styling) {
    case 'link':
      styling = 'hover:opacity-80 h-8 transition-transform duration-300 hover:scale-110';
      break;
    case 'link-large':
      styling = 'hover:opacity-80 h-12 transition-transform duration-300 hover:scale-110';
      break;
    case 'image-small':
      styling = 'h-30 mx-auto mb-10 transition-transform duration-300 hover:scale-105';
      break;
    case 'profile':
      styling = 'h-40 w-40 object-cover rounded-full mx-auto shadow-lg hover:scale-105 transition-transform duration-300';
      break;
    case 'navbar':
      styling = 'h-8 w-8 object-contain filter brightness-0 invert contrast-200';
      break;
    default:
      styling = '';
  }

  return (
    <>
      {link !== '' ? (
        // Ternary Operator for image switching
        <div className="flex flex-col items-center justify-center">
          <a href={link} title={link}>
            <img src={image} className={styling} alt="" />
          </a>
          {message && (
            <p className="text-center mt-2 font-bold">{message}</p>
          )}
        </div>
      ) : (
        <img src={image} className={styling} alt="" />
      )}
    </>
  );
  
}