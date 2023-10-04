import Header from "../../../components/landingpage/Header";
import Footer from "../../../components/landingpage/Footer";
import Banner from "../../../components/landingpage/Banner";
import Body from "../../../components/landingpage/Homebody";
import axios from "axios";
import { useEffect } from "react";
// import {Modal} from '../components/landingpage/modal'
const Landingpage = () => {
  const getData = async (req, res) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_DOMAIN}/get-userinfo-id`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("Server Response:", response);

     
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full h-auto ">
      <Header />
      <Banner />
      <Body />

      <Footer />
    </div>
  );
};

export default Landingpage;
