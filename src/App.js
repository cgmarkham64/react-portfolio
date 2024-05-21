import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './components/Home'
import { About } from './components/About'
import { Contact } from './components/Contact'
import Photography from './components/Photography'

import './App.scss';

import React, { Component } from 'react'

class App extends Component {

  render() {
    return (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/photography" element={<Photography />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </>
    )
  }
}

export default App
