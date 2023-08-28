import React, { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { useDispatch } from "react-redux";
import { hideloading, showloading } from "../../redux/alertSlice";
import axios from "axios";
import { useUserContext } from "../../context/userContext";
import { AddressModal } from "./addressModal";

const Userprofile = () => {
  const [showModal, setShowModal] = useState(false);
  const { userName } = useUserContext();
  const [image, setImage] = useState(
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
  );
  const [profileimage, setProfileimage] = useState(image);
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [shipmetDetails, setshipmentDetails] = useState([]);
  const[search,setSearch]=useState("")

  const filterShipmentDetails = shipmetDetails.filter((shipment)=>{
    const lowerCaseSearchInput = search.toLowerCase();
    return shipment.toname.LowerCase().icludes(lowerCaseSearchInput)
  })

  const submitimage = async (e) => {
    try {
      const formdata = new FormData();
      formdata.append("profileimage", profileimage);
      formdata.append("name", userName);
      e.preventDefault();

      dispatch(showloading());
      const response = await axios.post("/updateprofileimage", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      console.log("res", response);

      dispatch(hideloading());
      if (response.data.success) {
        getData();
      }
    } catch (error) {}
  };

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
        const shipmentdata = response.data.shipmentdata;
        setUser(data);
        setshipmentDetails(shipmentdata);
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
      setProfileimage(file);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleclose = () => {
    setShowModal(false);
  };
  return (
    <div>
      <Header />
      {/* <div className=' h-screen bg-slate-600'> */}
      <div className="bg-gray-200">
        <div className="py-5 container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-1">
              <div className="mb-4  dark:bg-gray-800 border-solid border-2 border-red-600">
                <form enctype="multipart/form-data" onSubmit={submitimage}>
                  <div className="text-center ">
                    <img
                      src={user?.profileimage ? user.profileimage : image}
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
                        <a
                          onClick={() => {
                            setShowModal(true);
                          }}
                          href="#"
                        >
                          <span className="material-symbols-outlined ml-4 absolute mt-1">
                            add_circle
                          </span>
                        </a>
                        {/* <a href="#">
                          <span class="material-symbols-outlined ml-12 absolute mt-1">
                            edit
                          </span>
                        </a> */}
                      </p>
                      <AddressModal onClose={handleclose} visible={showModal} />

                      <div className="w-3/4 text-muted text-sm md:text-base lg:text-lg break-words h-max">
                        If you're still facing issues, it's possible that other
                        styles in your applicationools to identify any conflicts
                        or issues. Additionally, consider the context and
                        surrounding elements in your layout that might be
                        impacting the behavior of this particular section.
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

      <h1>shipment details</h1>

      <div className="container mt-5">
        <div class="relative overflow-y-auto shadow-md sm:rounded-lg ">
          <div className=" w-full h-14 flex justify-evenly dark:bg-gray-700 text-sm text-left text-gray-500 dark:text-gray-400 ">
            {/* <Link to="/adminhome/add_driver"> */} {/* </Link> */}
            <fieldset className="space-y-1 dark:text-gray-100 mt-2">
              <label for="Search" className="hidden">
                Search
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <button
                    type="button"
                    title="search"
                    className="p-1 focus:outline-none focus:ring"
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 512 512"
                      className="w-4 h-4 dark:text-gray-100"
                    >
                      <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                    </svg>
                  </button>
                </span>
                <input
                  type="search"
                  name="Search"
                  placeholder="Search..."
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900 focus:dark:border-violet-400"
                />
              </div>
            </fieldset>
          </div>
          <hr className="bg-gray-400" />

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  SL NO
                </th>
                <th scope="col" class="px-6 py-3">
                  Track ID
                </th>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>

                <th scope="col" class="px-6 py-3">
                  Shipment Status
                </th>
                <th scope="col" class="px-6 py-3">
                  Hub
                </th>
                <th scope="col" class="px-6 py-3">
                  Current Location
                </th>
                <th scope="col" class="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-black border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-3   font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <td className="px-6 py-2">test</td>
                </th>
                
                <td className="px-6 py-2">test</td>
                <td className="px-6 py-2">test</td>
                <td className="px-6 py-2">test</td>
                <td className="px-6 py-2">test</td>
                <td className="px-6 py-2">test</td>

                <button className="w-20 h-10 bg-blue-500 m-2 rounded-lg font-bold text-black hover:bg-slate-600">
                  View
                </button>
              </tr>
              ))
              {/* <tr>
              <td colSpan="8" className="px-6 py-2 bg-black text-center">
                No matching data
              </td>
            </tr> */}
            </tbody>
          </table>
        </div>
      </div>

      {/* </div> */}

      <Footer />
    </div>
  );
};

export default Userprofile;
