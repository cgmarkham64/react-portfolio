import './Photography.scss'

import React, { Component } from 'react'
import Carousel from '../Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

class Photography extends Component {
    constructor(props) {
        super(props)

        // Set initial state
        this.state = {
            instaItems: [],
            mediaUrls: [],
            isScrolling: true,
            toggleIcon: faPause,
            dotClickInterval: setInterval(this.clickNextDot, 7000),
        }

        this.getUserMedia = this.getUserMedia.bind(this);
        this.startAutoScroll = this.startAutoScroll.bind(this);
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

        let urls = []

        feed.data.forEach((item, index) => {
            if (item.media_type !== 'VIDEO' && index < 10) {
                urls.push(item.media_url);
            }
        });

        this.setState({
            mediaUrls: urls
        });
    }

    startAutoScroll = () => {
        const clickEvent = new MouseEvent("click", {
            "view": window,
            "bubbles": true,
            "cancelable": false
        });
        const dots = document.getElementsByClassName('dot');
        
        if(this.state.isScrolling) {
            for(let i=0; i < dots.length; i++) {
                if(dots[i].className.indexOf('active') > 0) {
                    let targetIndex = (i + 1 <= dots.length - 1) ? i + 1 : 0;
                    dots[targetIndex].dispatchEvent(clickEvent);
                }
            }
        }
    }

    toggleAutoScroll = () => {
        if(this.state.isScrolling === false) {
            console.log('start scrolling');
            this.setState({
                isScrolling: true,
                toggleIcon: faPause,
                dotClickInterval: setInterval(this.clickNextDot, 7000)
            });
        } else {
            console.log('stop scrolling');
            this.setState({
                isScrolling: false,
                toggleIcon: faPlay,
                dotClickInterval: clearInterval(this.state.dotClickInterval)
            });
        }
    }

    clickNextDot = () => {
        const clickEvent = new MouseEvent("click", {
            "view": window,
            "bubbles": true,
            "cancelable": false
        });
        const dots = document.getElementsByClassName('dot');

        if(this.state.isScrolling) {
            for(let i=0; i < dots.length; i++) {
                if(dots[i].className.indexOf('active') > 0) {
                    let targetIndex = (i + 1 <= dots.length - 1) ? i + 1 : 0;
                    dots[targetIndex].dispatchEvent(clickEvent);
                }
            }
        }
    }

    render() {
        return (
            <div className="container">
                <div className="home-page">
                    <div className="content-zone zone-one">
                        <h1>Latest Instagram Photos</h1>
                        <FontAwesomeIcon className="carousel-control" icon={this.state.toggleIcon} onClick={this.toggleAutoScroll}/>
                        <Carousel mediaUrls={this.state.mediaUrls}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Photography
