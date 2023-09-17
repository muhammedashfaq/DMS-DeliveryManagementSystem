import React from "react";
import Footer from "../../components/driver/Hubfooter";
import Header from "../../components/driver/Header";
import HubHome from "../../components/driver/Hubhome";

const Home = () => {

  return (
    <div className="w-full h-full bg-slate-400">
      <Header />
      <HubHome />

      <Footer />
    </div>
  );
};

export default Home;
