import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Carousel.scss';

const Carousel = ({ mediaUrls }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('left');

    const handleDotClick = (index) => {
        setDirection(index > currentIndex ? 'right' : 'left');
        setCurrentIndex(index);
    }

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
    }

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
    }

    return (
        <div className="carousel">
            <AnimatePresence className="carousel-images-wrapper">
                <a href={mediaUrls[currentIndex]} target="_blank" rel="noreferrer">
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
                </a>
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
    )
}

export default Carousel