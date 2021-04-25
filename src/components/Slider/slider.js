import React from 'react'
import './slider.css'
import socialProof from '../../socialProof'

export default function Slideshow() {
    
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout () {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === socialProof.length - 1 ? 0 : prevIndex + 1
        ),
        3000
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className='slideshow'>
      <div className='slideshowSlider' style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
        {
            socialProof.map((proof, index) => (
            <div className="slide" key={index}>
                <h1 className="slide_h1">{proof.title}</h1>
                <p className="slide_p">{proof.body}</p>
                <img src={proof.image} alt={proof.name} className="slide_img"/>
            </div>
            ))
        }
      </div>

      <div className='slideshowDots'>
        {socialProof.map((_, i) => (
          <div key={i} className={`slideshowDot${index === i ? " active" : ""}`} onClick={() => { setIndex(i) }}></div>
        ))}
      </div>
    </div>
  );
}
