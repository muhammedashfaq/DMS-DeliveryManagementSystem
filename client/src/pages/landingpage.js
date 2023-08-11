import React from 'react'
import Header from '../components/landingpage/header'
import Footer from '../components/landingpage/footer'
import Banner from  '../components/landingpage/banner'
import Body from '../components/landingpage/body'
const landingpage = () => {
  return (
    <div className='w-full h-auto '>
      <Header />
      <Banner />
      <Body />
      <Footer />

    </div>
  )
}

export default landingpage