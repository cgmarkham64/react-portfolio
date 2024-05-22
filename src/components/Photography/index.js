import './Photography.scss'

import React, { Component } from 'react'
import Carousel from '../Carousel';

class Photography extends Component {
    constructor(props) {
        super(props)

        // Set initial state
        this.state = {
            instaItems: [],
            mediaUrls: [],
            isAutoScrolling: false,
        }

        this.getUserMedia = this.getUserMedia.bind(this);
        this.startAutoScroll = this.startAutoScroll.bind(this);
    }

    componentDidMount() {
        this.getUserMedia();
        this.startAutoScroll();
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
        
        setInterval(() => {
            const dots = document.getElementsByClassName('dot');
            console.log('dots is ', dots);
            for(let i=0; i < dots.length; i++) {
                if(dots[i].className.indexOf('active') > 0) {
                    console.log(`index found! ${i}`);
                    let targetIndex = (i + 1 <= dots.length - 1) ? i + 1 : 0;
                    dots[targetIndex].dispatchEvent(clickEvent);
                }
            }
            console.log('todo - click dot after active dot')
        }, 5000);
    }

    render() {
        return (
            <div className="container">
                <div className="home-page">
                    <div className="content-zone zone-one">
                        <h1>Latest Instagram Photos</h1>
                        <Carousel mediaUrls={this.state.mediaUrls}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Photography
