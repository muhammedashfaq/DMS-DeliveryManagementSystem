import React from "react";
import Footer from "../../components/driver/footer";
import Header from "../../components/driver/Header";
import Chatbody from  "../../components/driver/chatBody"

const hubChat = () => {
  return (

    <div className="w-full h-full bg-slate-400">
      <Header />
      <Chatbody />

      <Footer />
    </div>
  );
};

export default hubChat