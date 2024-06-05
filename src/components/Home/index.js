import InstaItem from '../InstaItem'
import './Home.scss'

import React, { Component } from 'react'

class Home extends Component {
    constructor(props) {
        super(props)

        // Set initial state
        this.state = {
            titleText: 'Hello,',
            leftPanelText:
                "I'm Cody Markham and I’m a full stack software engineer, outdoor enthusiast, and photographer. I currently live in Colorado and, like most folks here, " +
                "I collect all the hobbies when I'm not working on code and sipping mochas. You can find me hiking in the summer and skiing in the winter, usually with a " +
                'camera in hand. This website is a place where I can showcase my skills and play with different front end techniques and ideas. Anyway, that’s enough of an ' +
                'intro for a home page, check out my About page for a digitized version of my resume, check out my Photography page if you came here to see some of my art, ' +
                'and hit me up via my contact page just to see if I got my email linkages correct!',
            instagramElements: [],
        }

        this.getUserMedia = this.getUserMedia.bind(this);
        this.addAnimation = this.addAnimation.bind(this);

        this.scrollers = document.querySelectorAll(".scroller");

        // If a user hasn't opted in for recuded motion, then we add the animation
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            this.addAnimation();
        }
    }

    componentDidMount() {
        this.getUserMedia();
    }

    getUserMedia = async () => {
        const accessToken = process.env.REACT_APP_INSTAGRAM_KEY;
        const fields = `id,caption,media_url,timestamp,media_type,permalink`;
        const userId = '7436680339745871';
        const url = `https://graph.instagram.com/v19.0/${userId}/media?fields=${fields}&access_token=${accessToken}`;
        const data = await fetch(url);
        const feed = await data.json();

        let elements = []

        feed.data.forEach((item) => {
            if (item.media_type !== 'VIDEO') {
                elements.push(
                    <div className="scroll-element">
                        <InstaItem key={item.id} item={item}></InstaItem>
                    </div>
                )
            }
        });

        this.setState({
            instagramElements: elements,
        });
    }

    addAnimation = () => {
        this.scrollers.forEach((scroller) => {
            // add data-animated="true" to every `.scroller` on the page
            scroller.setAttribute("data-animated", true);

            // Make an array from the elements within `.scroller-inner`
            const scrollerInner = scroller.querySelector(".scroller__inner");
            const scrollerContent = Array.from(scrollerInner.children);

            // For each item in the array, clone it
            // add aria-hidden to it
            // add it into the `.scroller-inner`
            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                duplicatedItem.setAttribute("aria-hidden", true);
                scrollerInner.appendChild(duplicatedItem);
            });
        });
    }

    render() {
        return (
            <div className="container">
                <div className="home-page">
                    <div className="left-container">
                        <div className="content-zone zone-one">
                            <h1>{this.state.titleText}</h1>
                            <h3>{this.state.leftPanelText}</h3>
                            <h3>See you on the trail!</h3>
                            <h3>—Cody</h3>
                        </div>
                        <div className="content-zone zone-two">
                            <div className="scroller">
                                <ul className="tag-list scroller__inner" data-speed="slow">
                                    <li>HTML</li>
                                    <li>JavaScript</li>
                                    <li>ReactJS</li>
                                    <li>Angular</li>
                                    <li>Python</li>
                                    <li>Java</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
