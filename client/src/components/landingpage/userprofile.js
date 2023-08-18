import React, { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { useDispatch } from "react-redux";
import { hideloading, showloading } from "../../redux/alertSlice";
import axios from "axios";
import { IoIosAddCircleOutline } from "react-icons/io";

const Userprofile = () => {
  const [image, setImage] = useState(
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
  );
  const [profileimage,setProfileimage] =useState(image)
  const dispatch = useDispatch();
  const [user, setUser] = useState({});



  const submitimage=async(e)=>{
    try {
      const formdata = new FormData();
      formdata.append("profileimage", profileimage);
      e.preventDefault();

      const response = await axios.post(
        "/updateprofileimage",formdata,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      
        console.log('res',response)
      
    if(response.data.success){

      setProfileimage(response.data.image);
      getData();
    }
      
    } catch (error) {
      
    }
  }

  const getData = async (req, res) => {
    try {
      dispatch(showloading());

      const response = await axios.post(
        "/get-dataprofils",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideloading());
      if (response.data.success) {
        const data = response.data.data;
        setUser(data);
      }
    } catch (error) {
      dispatch(hideloading());
    }
  };

  const changeimage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setProfileimage(file)
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Header />
      {/* <div className=' h-screen bg-slate-600'> */}
      <div className="bg-gray-200">
        <div className="py-5 container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-1">
              <div className="mb-4  dark:bg-gray-800 border-solid border-2 border-red-600">
                <form           enctype="multipart/form-data"
 onSubmit={submitimage}>

                <div className="text-center ">
                  <img
                    src={image}
                    alt="avatar"
                    className="  w-max h-max mt-8 md:w-52 lg:w-64 mx-auto"
                    />
                  <p className="text-muted mt-2 mb-1 text-sm md:text-base lg:text-lg">
                    {user?.username}
                  </p>
                  <p className="text-muted mb-4 text-sm md:text-base lg:text-lg">
                    {user?.email}
                  </p>

                  <div className="flex justify-center space-x-2">
                    <label
                      for="imageUpload"
                      className="block mb-2 cursor-pointer text-white"
                      >
                      Click to Upload Image
                    </label>
                    <input
                      type="file"
                      id="imageUpload"
                      name="profileimage"
                      className="hidden"
                      onChange={changeimage}
                      />
                    <button className="bg-blue-500 mb-2 ml-2 h-10 text-white py-2 px-4 rounded text-sm md:text-base lg:text-lg ">
                      Upload
                    </button>
                  </div>
                </div>
                      </form>
              </div>

            </div>

            <div className="md:col-span-1 bg-white">

            <div className="md:col-span-1 container shadow-md">
              <div className="mb-4">
                <div className="p-3">
                  <div className="mb-2 flex items-center">
                    <p className="w-1/4 text-sm md:text-base lg:text-lg">
                      Full Name
                    </p>
                    <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg">
                      {user?.username}
                    </p>
                  </div>
                  <hr className="my-2" />
                  <div className="mb-2 flex items-center">
                    <p className="w-1/4 text-sm md:text-base lg:text-lg">
                      Email
                    </p>
                    <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg">
                      {user?.email}
                    </p>
                  </div>
                  <hr className="my-2" />
                  <div className="mb-2 flex items-center">
                    <p className="w-1/4 text-sm md:text-base lg:text-lg">
                      Phone
                    </p>
                    <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg">
                      {user?.mobile}
                    </p>
                  </div>
                  <hr className="my-2" />
                  <div className="mb-2 flex items-center">
                    <p className="w-1/4 text-sm md:text-base lg:text-lg">
                      Mobile
                    </p>
                    <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg">
                      {user?.mobile}
                    </p>
                  </div>
                  <hr className="my-2" />
                  <div className="mb-2 flex  items-center">
                    <p className="w-1/4 text-sm md:text-base lg:text-lg">
                      Address
                      <a href="#">
                        <span className="material-symbols-outlined ml-4 absolute mt-1">
                          add_circle 
                        </span> 
                      </a>
                      <a href="#">

                        <span class="material-symbols-outlined ml-12 absolute mt-1">
edit
</span>
                      </a>
                        
                      
                    </p>
                  
                    <div className="w-3/4 text-muted text-sm md:text-base lg:text-lg break-words h-max">
                    If you're still facing issues, it's possible that other styles in your applicationools to identify any conflicts or issues. Additionally, consider the context and surrounding elements in your layout that might be impacting the behavior of this particular section.
                    </div>
                  </div>

                  <hr className="my-2" />
                </div>
              </div>
            </div>
            </div>

          </div>
        </div>
      </div>


    <div className="bg-white w-full md:max-w-xs lg:max-w-sm xl:max-w-md h-96 mx-auto container z-50">
      <h1>shipment details</h1>
</div>


      {/* </div> */}


      <Footer />
    </div>
  );
};

export default Userprofile;
