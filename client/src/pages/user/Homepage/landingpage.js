import Header from "../../../components/landingpage/header";
import Footer from "../../../components/landingpage/footer";
import Banner from "../../../components/landingpage/banner";
import Body from "../../../components/landingpage/body";
import axios from "axios";
import { useEffect } from "react";
// import {Modal} from '../components/landingpage/modal'
const Landingpage = () => {
  const getData = async (req, res) => {
    try {
      const response = await axios.post(
        "/get-userinfo-id",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("Server Response:", response);

      if (response.data.success) {
        console.log(response.data.data.name);
      }
    } catch (error) {}
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
