import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Carousel.scss';

const Carousel = ({
    mediaUrls,
    mediaCaptions,
    mediaPermalinks,
    pauseAutoScroll,
    playAutoScroll,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('left');
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(true);
        pauseAutoScroll();
    };

    const onLeave = () => {
        setHover(false);
        playAutoScroll();
    };

    const handleDotClick = (index) => {
        setDirection(index > currentIndex ? 'right' : 'left');
        setCurrentIndex(index);
    };

    const slideVariants = {
        hiddenRight: {
            x: '100%',
            opacity: 0,
        },
        hiddenLeft: {
            x: '-100%',
            opacity: 0,
        },
        visible: {
            x: '-50%',
            opacity: 1,
            transition: {
                duration: 1.25,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: {
                duration: 1.25,
            },
        },
    };

    const dotsVariants = {
        initial: {
            y: 0,
        },
        animate: {
            y: -5,
            scale: 1.15,
            transition: { type: 'spring', stiffness: 1000, damping: '10' },
        },
        hover: {
            scale: 1.1,
            transition: { duration: 0.2 },
        },
    };

    return (
        <div className="carousel">
            <AnimatePresence className="carousel-images-wrapper">
                <div onMouseEnter={onHover} onMouseLeave={onLeave}>
                    <motion.img
                        className="carousel-images"
                        key={currentIndex}
                        src={mediaUrls[currentIndex]}
                        variants={slideVariants}
                        initial={
                            direction === 'right' ? 'hiddenRight' : 'hiddenLeft'
                        }
                        animate="visible"
                        exit="exit"
                        alt=""
                    />
                    {hover ? (
                        <div className="hover-box">
                            <h3 className="hover-text">
                                {mediaCaptions[currentIndex]}
                            </h3>
                            <div className="icon-wrapper">
                                <a
                                    className="icon"
                                    target="_blank"
                                    rel="noreferrer"
                                    href={mediaPermalinks[currentIndex]}
                                >
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                                <a
                                    className="icon"
                                    target="_blank"
                                    rel="noreferrer"
                                    href={mediaUrls[currentIndex]}
                                >
                                    <FontAwesomeIcon icon={faImage} />
                                </a>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </AnimatePresence>

            <div className="carousel-indicator">
                {mediaUrls.map((_, index) => (
                    <motion.div
                        key={index}
                        className={`dot ${
                            currentIndex === index ? 'active' : ''
                        }`}
                        onClick={() => handleDotClick(index)}
                        initial="initial"
                        animate={currentIndex === index ? 'animate' : ''}
                        whileHover="hover"
                        variants={dotsVariants}
                    ></motion.div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
