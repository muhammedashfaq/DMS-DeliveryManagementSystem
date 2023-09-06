import React from "react";
import { Alert, Footer } from "flowbite-react";
const body = () => {
  return (
    <div>
      <div className="mt-20">
        <h1 className="text-4xl font-semibold leadi text-center">
          One Of India’s Leading Integrated Express Logistics Provider
        </h1>
        <h1 className="text-4xl font-semibold leadi text-center mt-5 underline">
          Our Services
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4   m-4 bg-violet-950 ">
          <a
            href="#"
            className=" flex flex-col items-center bg-slate-600 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src="./images/landingpage/express.jpg"
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              {/* <h1 className="text-2xl font-semibold text-white ">Express Parcel</h1> */}
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Express Parcel
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </div>
          </a>
          <a
            href="#"
            className=" flex flex-col items-center bg-slate-600 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src="./images/landingpage/international.jpg"
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              {/* <h1 className="text-2xl font-semibold text-white ">Express Parcel</h1> */}
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                InternaInternational Shipments
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </div>
          </a>
          <a
            href="#"
            className=" flex flex-col items-center bg-slate-600 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src="./images/landingpage/ecomerce.jpg"
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              {/* <h1 className="text-2xl font-semibold text-white ">Express Parcel</h1> */}
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Integrated E-Commerce Logiatics
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </div>
          </a>
        </div>

        <div className="container mx-auto flex flex-col items-center pb-6 mb-4 md:p-10 md:px-12 ">
          <h1 className="text-4xl font-semibold  text-center border-b-4 border-red-800 ">
            Testimonials
          </h1>
        </div>
        <div className="container mx-auto grid grid-cols-1 gap-8 lg:gap-20 md:px-10 md:pb-10 lg:grid-cols-2 ">
          <div className="flex flex-col items-center mx-12 lg:mx-0">
            <div className="relative text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                className="absolute top-0 left-0 w-8 h-8 dark:text-gray-700"
              >
                <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
              </svg>
              <p className="px-6 py-1 text-lg italic">
                I want to compliment to your excellent service as your entire
                team always went to great lengths to help me to enhance my
                business. I have always received quality service at your FC.
                Team knows just what to do to solve my issues quickly and always
                come with solution-oriented approach. Such service builds great
                working relationships.
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                className="absolute bottom-0 right-0 w-8 h-8 dark:text-gray-700"
              >
                <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
              </svg>
            </div>
            <span className="w-12 h-1 my-2 rounded-lg dark:bg-violet-400"></span>
            <p>Mohammad Alam (Hyderabad)</p>
          </div>
          <div className="flex flex-col items-center max-w-lg mx-12 lg:mx-0">
            <div className="relative text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="absolute top-0 left-0 w-8 h-8 dark:text-gray-700"
              >
                <path
                  fill="currentColor"
                  d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"
                ></path>
                <path
                  fill="currentColor"
                  d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"
                ></path>
              </svg>
              <p className="px-6 py-1 text-lg italic">
                <mark>HL</mark> courier service is one of the best professional
                courier services.I book most of my personal couriers through{" "}
                <mark>HL</mark> and parcels reach on time. They provide tracking
                update so risk of losing the parcel gets minimized. Their
                delivery is fast and very secure. I am happy with their service
                and recommend them.
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="absolute bottom-0 right-0 w-8 h-8 dark:text-gray-700"
              >
                <path
                  fill="currentColor"
                  d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"
                ></path>
                <path
                  fill="currentColor"
                  d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"
                ></path>
              </svg>
            </div>
            <span className="w-12 h-1 my-2 rounded-lg dark:bg-violet-400"></span>
            <p>Ativeer (Chennai)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default body;
