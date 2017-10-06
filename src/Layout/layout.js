import React  from 'react';
import Header from './components/header.js'
import Footer from './components/footer.js'
import './style/layout.css'

export default function Layout({ children }) {
  return (
    <div className='layout'>
      <div className='full-height'>
        { Header() }
        { children }
      </div>
      { Footer() }
    </div>
  );
}