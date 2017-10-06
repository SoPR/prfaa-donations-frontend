import React  from 'react';
import Header from './components/header.js'
import Footer from './components/footer.js'

export default function Layout({ children }) {
  return (
    <div>
      <Header/>
        {children}
      <Footer/>
    </div>
  );
}
