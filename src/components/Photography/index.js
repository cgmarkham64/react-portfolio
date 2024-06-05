import './Photography.scss';

import React, { Component } from 'react';
import Carousel from '../Carousel';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

class Photography extends Component {
    constructor(props) {
        super(props);

        // Set initial state
        this.state = {
            instaItems: [],
            mediaUrls: [],
            mediaCaptions: [],
            mediaPermalinks: [],
            isScrolling: true,
            toggleIcon: faPause,
        };

        this.dotClickInterval = setInterval(this.clickNextDot, 7000);

        this.getUserMedia = this.getUserMedia.bind(this);
        this.pauseAutoScroll = this.pauseAutoScroll.bind(this);
        this.playAutoScroll = this.playAutoScroll.bind(this);
    }

    componentDidMount() {
        this.getUserMedia();
    }

    componentWillUnmount() {
        // have to clear the interval when unmounting or page changes will create multiple 'threads' of the interval
        clearInterval(this.dotClickInterval);
    }

    getUserMedia = async () => {
        const accessToken = process.env.REACT_APP_INSTAGRAM_KEY;
        const fields = `id,caption,media_url,timestamp,media_type,permalink`;
        const userId = '7436680339745871';
        const url = `https://graph.instagram.com/v19.0/${userId}/media?fields=${fields}&access_token=${accessToken}`;
        const data = await fetch(url);
        const feed = await data.json();

        let urls = [];
        let captions = [];
        let permalinks = [];

        feed.data.forEach((item, index) => {
            if (item.media_type !== 'VIDEO' && index < 10) {
                urls.push(item.media_url);
                captions.push(item.caption.slice(0, item.caption.indexOf('#')));
                permalinks.push(item.permalink);
            }
        });

        this.setState({
            mediaUrls: urls,
            mediaCaptions: captions,
            mediaPermalinks: permalinks,
        });
    };

    pauseAutoScroll = () => {
        clearInterval(this.dotClickInterval);
        this.setState({
            isScrolling: false,
            toggleIcon: faPlay,
            dotClickInterval: clearInterval(this.state.dotClickInterval),
        });
    };

    playAutoScroll = () => {
        this.setState({
            isScrolling: true,
            toggleIcon: faPause,
            dotClickInterval: setInterval(this.clickNextDot, 5000),
        });
    };

    clickNextDot = () => {
        console.log('clicking dot...');
        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: false,
        });
        const dots = document.getElementsByClassName('dot');

        if (this.state.isScrolling) {
            for (let i = 0; i < dots.length; i++) {
                if (dots[i].className.indexOf('active') > 0) {
                    let targetIndex = i + 1 <= dots.length - 1 ? i + 1 : 0;
                    dots[targetIndex].dispatchEvent(clickEvent);
                }
            }
        }
    };

    render() {
        return (
            <div className="container">
                <div className="home-page">
                    <div className="content-zone zone-one">
                        <h1 className="section-header">
                            Latest from the 'gram
                        </h1>
                        <Carousel
                            mediaUrls={this.state.mediaUrls}
                            mediaCaptions={this.state.mediaCaptions}
                            mediaPermalinks={this.state.mediaPermalinks}
                            pauseAutoScroll={this.pauseAutoScroll}
                            playAutoScroll={this.playAutoScroll}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Photography;
