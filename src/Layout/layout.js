import React, { Component } from 'react';
import Header from './components/header.js'
import Footer from './components/footer.js'

import './style/layout.css'

export default class Layout extends Component {

  render() {
    return (
      <div className='layout'>
        <div className='full-height'>
          <Header/>
            {this.props.children}
        </div>
        <Footer/>
      </div>
    )
  }
}
