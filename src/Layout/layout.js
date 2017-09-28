import React, { Component } from 'react';
import Header from './components/header.js'
import Footer from './components/footer.js'

export default class Layout extends Component {

  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <Header/>
          {this.props.children}
        <Footer/>
      </div>
    )
  }
}
