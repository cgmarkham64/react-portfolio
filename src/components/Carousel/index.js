import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'
import './Carousel.scss'

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState('left')

    const handleNext = () => {
        setDirection('right');
        setCurrentIndex((prevIndex) =>
            prevIndex + 1 === images.length ? 0 : prevIndex + 1
        )
    }

    const handlePrevious = () => {
        setDirection('left');
        setCurrentIndex((prevIndex) =>
            prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
        )
    }

    const handleDotClick = (index) => {
        setDirection(index > currentIndex ? 'right' : 'left');
        setCurrentIndex(index)
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
                duration: 1,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: {
                duration: 1.0,
            },
        },
    }

    return (
        <div className="carousel">
            <AnimatePresence className="carousel-images-wrapper">
                <motion.img
                    className="carousel-images"
                    key={currentIndex}
                    src={images[currentIndex]}
                    variants={slideVariants}
                    initial={
                        direction === 'right' ? 'hiddenRight' : 'hiddenLeft'
                    }
                    animate="visible"
                    exit="exit"
                    alt=""
                />
            </AnimatePresence>
            <div className="slide-direction">
                <FontAwesomeIcon
                    className="left"
                    icon={faAngleLeft}
                    onClick={handlePrevious}
                />
                <FontAwesomeIcon
                    className="right"
                    icon={faAngleRight}
                    onClick={handleNext}
                />
            </div>
            <div className="carousel-indicator">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`dot ${
                            currentIndex === index ? 'active' : ''
                        }`}
                        onClick={() => handleDotClick(index)}
                    ></div>
                ))}
            </div>
        </div>
    )
}

export default Carousel
