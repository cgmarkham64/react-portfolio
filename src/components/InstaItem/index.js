/* eslint-disable react/jsx-no-target-blank */
import './InstaItem.scss'

import React, { Component } from 'react'

class InstaItem extends Component {
  constructor(props) {
    super(props)

    // Set initial state
    this.state = {
      item: props.item,
    }
  }

  render() {
    if (this.state.item.media_type !== 'VIDEO') {
      return (
        <div className="instaItem-container">
          <a href={this.state.item.permalink} target="_blank">
            <img
              src={this.state.item.media_url}
              alt={`insta-id-${this.state.item.id}`}
              className="image"
            />
          </a>
          <h4 className="caption">{this.state.item.caption}</h4>
        </div>
      )
    }
  }
}

export default InstaItem
