import React from 'react'
import Header from './header'
import Footer from './footer'

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';

const userprofile = () => {
  return (
    <div >
      <Header />
      {/* <div className=' h-screen bg-slate-600'> */}
      <div className="bg-gray-200">
  <div className="py-5 container mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-1">
        <div className="mb-4 bg-white">
          <div className="text-center">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
              alt="avatar"
              className="rounded-circle w-40 md:w-52 lg:w-64 mx-auto"
            />
            <p className="text-muted mt-2 mb-1 text-sm md:text-base lg:text-lg">
              UserName
            </p>
            <p className="text-muted mb-4 text-sm md:text-base lg:text-lg">
              Email
            </p>
            <div className="flex justify-center space-x-2">
              <button className="bg-blue-500 text-white py-2 px-4 rounded text-sm md:text-base lg:text-lg">
               add image
              </button>
              <button className="border border-blue-500 text-blue-500 py-2 px-4 rounded text-sm md:text-base lg:text-lg">
                input
              </button>
            </div>
          </div>
        </div>

        <div className="mb-4 bg-white">
          <div className="p-0">
            <ul className="list-group list-group-flush rounded-3">
              <li className="flex justify-between items-center p-3">
                <i className="fas fa-globe fa-lg text-warning"></i>
                <p className="text-sm md:text-base lg:text-lg">https://mdbootstrap.com</p>
              </li>
              <li className="flex justify-between items-center p-3">
                <i className="fab fa-github fa-lg text-gray-600"></i>
                <p className="text-sm md:text-base lg:text-lg">mdbootstrap</p>
              </li>
              <li className="flex justify-between items-center p-3">
                <i className="fab fa-twitter fa-lg text-blue-500"></i>
                <p className="text-sm md:text-base lg:text-lg">@mdbootstrap</p>
              </li>
              <li className="flex justify-between items-center p-3">
                <i className="fab fa-instagram fa-lg text-purple-600"></i>
                <p className="text-sm md:text-base lg:text-lg">mdbootstrap</p>
              </li>
              <li className="flex justify-between items-center p-3">
                <i className="fab fa-facebook fa-lg text-blue-600"></i>
                <p className="text-sm md:text-base lg:text-lg">mdbootstrap</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="md:col-span-1 bg-white">
        <div className="mb-4">
          <div className="p-3">
            <div className="mb-2 flex items-center">
              <p className="w-1/4 text-sm md:text-base lg:text-lg">Full Name</p>
              <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg">
                Johnatan Smith
              </p>
            </div>
            <hr className="my-2" />
            <div className="mb-2 flex items-center">
              <p className="w-1/4 text-sm md:text-base lg:text-lg">Email</p>
              <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg">
                example@example.com
              </p>
            </div>
            <hr className="my-2" />
            <div className="mb-2 flex items-center">
              <p className="w-1/4 text-sm md:text-base lg:text-lg">Phone</p>
              <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg">
                (097) 234-5678
              </p>
            </div>
            <hr className="my-2" />
            <div className="mb-2 flex items-center">
              <p className="w-1/4 text-sm md:text-base lg:text-lg">Mobile</p>
              <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg">
                (098) 765-4321
              </p>
            </div>
            <hr className="my-2" />
            <div className="mb-2 flex items-center">
              <p className="w-1/4 text-sm md:text-base lg:text-lg">Address</p>
              <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg">
                Bay Area, San Francisco, CA
              </p>
            </div>
            <hr className="my-2" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>





      {/* </div> */}

      <Footer />



    </div>
  )
}

export default userprofile