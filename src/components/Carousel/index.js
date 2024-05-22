// import { useState, useEffect, setState } from 'react';
import React, { Component } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'
import './Carousel.scss'

class Carousel extends Component {
    constructor(props) {
        super(props);

        // Set initial state
        this.state = {
            items: props.items,
            currentIndex: 0,
            direction: 'left',
        }
    }

    handleDotClick = (index) => {
        this.setState({
            direction: index > this.state.currentIndex ? 'right' : 'left',
            currentIndex: index
        });
    }

    slideVariants = {
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

    dotsVariants = {
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

    render() {
        return (
            <div className="carousel">
                <AnimatePresence className="carousel-images-wrapper">
                    <motion.img
                        className="carousel-images"
                        key={this.state.currentIndex}
                        src={this.state.items[this.state.currentIndex]?.media_url}
                        variants={this.slideVariants}
                        initial={
                            this.state.direction === 'right' ? 'hiddenRight' : 'hiddenLeft'
                        }
                        animate="visible"
                        exit="exit"
                        alt=""
                    />
                </AnimatePresence>
    
                {/*  If desired, bring back carousel side controls... maybe not necessary and it's cleaner without  */}
                {/* <div className="slide-direction">
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
                </div> */}
    
                <div className="carousel-indicator">
                    {this.state.items.map((_, index) => (
                        <motion.div
                            key={index}
                            className={`dot ${
                                this.state.currentIndex === index ? 'active' : ''
                            }`}
                            onClick={() => this.handleDotClick(index)}
                            initial="initial"
                            animate={this.state.currentIndex === index ? 'animate' : ''}
                            whileHover="hover"
                            variants={this.dotsVariants}
                        ></motion.div>
                    ))}
                </div>
            </div>
        )
    }
}




// = ({ items }) => {
    // const [currentIndex, setCurrentIndex] = useState(0);
    // const [direction, setDirection] = useState('left');

    // useEffect(() => {
    //     // TODO create interval
        
    //     // TODO get item after selected item
    //     // TODO click said item.... repeat for forever, or until pause is clicked/unclicked
    // });

    // componentDidMount() {
    //     setInterval(() => {
    //         const dots = document.getElementsByClassName('dot');
    //         dots[currentIndex + 1].click();
    //     }, 5000);
    // }

    // const handleNext = () => {
    //     setDirection('right')
    //     setCurrentIndex((prevIndex) =>
    //         prevIndex + 1 === items.length ? 0 : prevIndex + 1
    //     )
    // }

    // const handlePrevious = () => {
    //     setDirection('left')
    //     setCurrentIndex((prevIndex) =>
    //         prevIndex - 1 < 0 ? items.length - 1 : prevIndex - 1
    //     )
    // }

    // const handleDotClick = (index) => {
    //     setDirection(index > currentIndex ? 'right' : 'left')
    //     setCurrentIndex(index)
    // }

    // const slideVariants = {
    //     hiddenRight: {
    //         x: '100%',
    //         opacity: 0,
    //     },
    //     hiddenLeft: {
    //         x: '-100%',
    //         opacity: 0,
    //     },
    //     visible: {
    //         x: '-50%',
    //         opacity: 1,
    //         transition: {
    //             duration: 1,
    //         },
    //     },
    //     exit: {
    //         opacity: 0,
    //         scale: 0.8,
    //         transition: {
    //             duration: 1.0,
    //         },
    //     },
    // }

    // const dotsVariants = {
    //     initial: {
    //         y: 0,
    //     },
    //     animate: {
    //         y: -5,
    //         scale: 1.15,
    //         transition: { type: 'spring', stiffness: 1000, damping: '10' },
    //     },
    //     hover: {
    //         scale: 1.1,
    //         transition: { duration: 0.2 },
    //     },
    // }

    // return (
    //     <div className="carousel">
    //         <AnimatePresence className="carousel-images-wrapper">
    //             <motion.img
    //                 className="carousel-images"
    //                 key={currentIndex}
    //                 src={items[currentIndex]?.media_url}
    //                 variants={slideVariants}
    //                 initial={
    //                     direction === 'right' ? 'hiddenRight' : 'hiddenLeft'
    //                 }
    //                 animate="visible"
    //                 exit="exit"
    //                 alt=""
    //             />
    //         </AnimatePresence>

    //         {/*  If desired, bring back carousel side controls... maybe not necessary and it's cleaner without  */}
    //         {/* <div className="slide-direction">
    //             <FontAwesomeIcon
    //                 className="left"
    //                 icon={faAngleLeft}
    //                 onClick={handlePrevious}
    //             />
    //             <FontAwesomeIcon
    //                 className="right"
    //                 icon={faAngleRight}
    //                 onClick={handleNext}
    //             />
    //         </div> */}

    //         <div className="carousel-indicator">
    //             {items.map((_, index) => (
    //                 <motion.div
    //                     key={index}
    //                     className={`dot ${
    //                         currentIndex === index ? 'active' : ''
    //                     }`}
    //                     onClick={() => handleDotClick(index)}
    //                     initial="initial"
    //                     animate={currentIndex === index ? 'animate' : ''}
    //                     whileHover="hover"
    //                     variants={dotsVariants}
    //                 ></motion.div>
    //             ))}
    //         </div>
    //     </div>
    // )
// }

export default Carousel
