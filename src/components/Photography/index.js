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
        }

        this.getUserMedia = this.getUserMedia.bind(this);
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
