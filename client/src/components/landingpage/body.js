import React from 'react'
import { Alert, Footer } from 'flowbite-react';
const body = () => {
  return (
    <div >
    <Footer container>
      <Footer.Copyright
        by="Flowbite™"
        href="#"
        year={2022}
      />
      <Footer.LinkGroup>
        <Footer.Link href="#">
          About
        </Footer.Link>
        <Footer.Link href="#">
          Privacy Policy
        </Footer.Link>
        <Footer.Link href="#">
          Licensing
        </Footer.Link>
        <Footer.Link href="#">
          Contact
        </Footer.Link>
      </Footer.LinkGroup>
    </Footer>



    </div>
  )
}

export default body