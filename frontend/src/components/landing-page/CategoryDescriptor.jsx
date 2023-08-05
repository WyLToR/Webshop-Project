import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function CategoryDescriptor({ title, img, qparam }) {
  return (
    <Link to={`/products?category=${qparam}`}>
      <div
        className="position-relative d-flex justify-content-center align-items-center"
        style={{
          height: '11rem',
          marginRight: '3rem',
        }}
      >
        <h4
          className="p-1 m-0"
          style={{
            position: 'absolute',
            backdropFilter: 'blur(5px)',
            backgroundColor: '#191f1c',
            height: '2.5rem',
            zIndex: '3',
            color: 'white',
            opacity: '90%',
            borderRadius: '5px',
          }}
        >
          {title}
        </h4>
        <Image
          src={img}
          style={{
            objectFit: 'contain',
            height: '11rem',
            opacity: '90%',
          }}
        />
      </div>
    </Link>

  );
}
