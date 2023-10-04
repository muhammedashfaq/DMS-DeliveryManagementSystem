import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideloading, showloading } from "../../Helper/redux/alertSlice";
import axios from "axios";
import { useUserContext } from "../../Helper/context/userContext";
import { AddressModal } from "./AddressModal";
import ChatModal from "./ChatModal";
import { SliderThumb } from "@mui/material";
import { toast } from "react-hot-toast";
import { userRequest } from "../../Helper/interceptor/axois";
import { useNavigate } from "react-router-dom";
import {
  editUserdetails,
  getShipmentDetails,
} from "./Userutil/api";

const Userprofile = () => {
  const navigate = useNavigate();
  const [editname, setEditname] = useState(false);
  const [editmobile, setEditmobile] = useState(false);

  const [trackid, settrackid] = useState("");
  const [shipmentid, setshipmentid] = useState("");
  const [hub, sethub] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showchatModal, setShowchatModal] = useState(false);

  const { userName } = useUserContext();
  const [image, setImage] = useState(
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
  );
  const [profileimage, setProfileimage] = useState(image);
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  // updateUsername..
  const [username, setUsername] = useState(user?.username);
  const [usermobile, setUsermobile] = useState(user?.mobile);
  const [shipmetDetails, setshipmentDetails] = useState([]);
  const [search, setSearch] = useState("");

  const filterShipmentDetails = shipmetDetails.filter((shipment) => {
    const lowerCaseSearchInput = search.toLowerCase();
    return shipment.shipment[0].toname
      .toLowerCase()
      .includes(lowerCaseSearchInput);
  });

  const submitimage = async (e) => {
    if (profileimage) {
      const formdata = new FormData();
      formdata.append("profileimage", profileimage);
      e.preventDefault();
      
      dispatch(showloading());

      userRequest({
        url: `${process.env.REACT_APP_DOMAIN}/updateprofileimage`,
        method: "POST",
        data: formdata,
      })
        .then((response) => {
          dispatch(hideloading());
          if (response.data.success) {
            getData();
          }
        })
        .catch((err) => {
          dispatch(hideloading());
          toast.error("something went wrong in catch");
          console.log(err);
          localStorage.removeItem("token");
          navigate("/");
        });
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

  const handleclose = () => {
    setShowModal(false);
  };
  const handlechatclose = () => {
    setShowchatModal(false);
  };

  const modaldata = (trackID, shipmentid, hub) => {
    setShowchatModal(true);
    settrackid(trackID);
    setshipmentid(shipmentid);
    sethub(hub);
  };

  const updateform = async (input, field) => {
    try {
      dispatch(showloading());
      
      if (field === "mobile") {
        if (input.trim() === "") {
          dispatch(hideloading());
           toast.error("Mobile Number is required");
           return
        }
  
        if (input.trim().length !== 10) {
          dispatch(hideloading());
           toast.error("Enter a Valid 10-digit Mobile Number");
           return
        }
      }
  
      const response = await editUserdetails(input, field);
      dispatch(hideloading());

      if (response.data.success) {
        toast.success(response.data.message);
        setEditmobile(false);
        setEditname(false);
        getData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideloading());
      console.log(error);

      toast.error("something went wrong");
      localStorage.removeItem("token");
      navigate("/");
    }
  };
  const getData = async (req, res) => {
    try {
      dispatch(showloading());

      const response = await getShipmentDetails();
      dispatch(hideloading());

      if (response.data.success) {
        toast.success(response.data.message);
        const data = response.data.data;

        setUser(data);
        const shipmentdata = response.data.shipmentdata;
        setshipmentDetails(shipmentdata);
      }
    } catch (error) {
      dispatch(hideloading());
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {/* <div className=' h-screen bg-slate-600'> */}
      <div className="bg-gray-200">
        <div className="py-5 container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-1">
              <div className="mb-4  dark:bg-gray-800 border-solid border-2 border-red-600">
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

                  <div className="flex justify-center space-x-2 mb-2">
                    <button className="bg-blue-700 rounded-sm p-2 ">
                      <label
                        for="imageUpload"
                        className="block mb-2 cursor-pointer text-white"
                      >
                        Choose Image
                      </label>
                    </button>
                    <input
                      type="file"
                      id="imageUpload"
                      name="profileimage"
                      className="hidden"
                      onChange={changeimage}
                    />
                    <button className="bg-green-700 rounded-sm p-2 ml-2">
                      <button
                        type="submit"
                        onClick={submitimage}
                        class="material-symbols-outlined"
                      >
                        upload
                      </button>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-1 bg-white">
              <div className="md:col-span-1 container shadow-md">
                <div className="mb-4">
                  <div className="p-3">
                    <div className="mb-2 flex items-center">
                      <p className="w-1/4 text-sm md:text-base lg:text-lg">
                        Full Name
                        {editname ? (
                          <button
                            onClick={() => updateform(username, "username")}
                            class="material-symbols-outlined ml-4 absolute mt-1 bg-green-800 rounded-md text-white font-semibold"
                          >
                            done
                          </button>
                        ) : (
                          <button
                            onClick={() => setEditname(true)}
                            className="material-symbols-outlined ml-4 absolute mt-1"
                          >
                            edit
                          </button>
                        )}
                      </p>

                      {editname ? (
                        <input
                          type="text"
                          className="w-3/4 text-muted text-sm md:text-base lg:text-lg bg-gray-300 rounded-md"
                          value={username}
                          defaultValue={user?.username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      ) : (
                        <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg">
                          {user?.username}
                        </p>
                      )}
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
                        Mobile
                        {editmobile ? (
                          <button
                            onClick={() => updateform(usermobile, "mobile")}
                            class="material-symbols-outlined ml-4 absolute mt-1 bg-green-800 rounded-md text-white font-semibold"
                          >
                            done
                          </button>
                        ) : (
                          <button
                            onClick={() => setEditmobile(true)}
                            className="material-symbols-outlined ml-4 absolute mt-1"
                          >
                            edit
                          </button>
                        )}
                      </p>

                      {editmobile ? (
                        <input
                          onChange={(e) => setUsermobile(e.target.value)}
                          value={usermobile}
                          className="w-3/4 text-muted text-sm md:text-base lg:text-lg bg-gray-300 rounded-md"
                          defaultValue={user?.mobile}
                        />
                      ) : (
                        <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg">
                          {user?.mobile}
                        </p>
                      )}
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

      <div className="h-screen flex justify-center items-center">
        <div className="w-5/6 h-5/6 rounded-xl  container  bg-slate-100">
          <h1 className="m-10 pt-4 font-semibold">HI, {userName} ;</h1>
          <div className="m-10">
            <span className="bg-slate-900 rounded-md p-2 text-white font-serif">
              Shipment From You
            </span>
            <hr className="mt-2 " />
          </div>

          <div className=" h-96 overflow-y-scroll p-4  ">
            {filterShipmentDetails?.map((shipment, index) => (
              <div
                key={index}
                className=" bg-slate-50   grid grid-cols-3 gap-4 items-center m-2 cursor-pointer hover:shadow-2xl  border-2 rounded-lg p-6"
              >
                <div className="">
                  <span className="font-bold font-mono">TO:</span>{" "}
                  {shipment.shipment[0].toaddress}
                </div>
                <div className="">
                  <span className="font-bold font-mono">Your TrackID:</span>{" "}
                  {shipment.shipment[0].trackid}
                  <div className="flex ">
                    <span>
                      {" "}
                      <a
                        className="text-blue-800 underline font-serif mr-2"
                        href="#"
                      >
                        track
                      </a>
                    </span>

                    {shipment.shipment[0].shipmentStatus !== "Delivered" &&
                    shipment.shipment[0].shipmentStatus !== "Pending" ? (
                      <span>
                        <a
                          onClick={() =>
                            modaldata(
                              shipment.shipment[0].trackid,
                              shipment._id,
                              shipment.fromhub
                            )
                          }
                          className="text-blue-800 underline"
                        >
                          <span class="material-symbols-outlined">chat</span>
                        </a>
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="">
                  <span className="font-bold font-mono">ShipmentStatus:</span>{" "}
                  {shipment.shipment[0].shipmentStatus}
                </div>
              </div>
            ))}
            <ChatModal
              onClose={handlechatclose}
              visible={showchatModal}
              data={{ trackID: trackid, shipmentId: shipmentid, hub: hub }}
            />
          </div>
        </div>
      </div>

      {/* </div> */}
    </div>
  );
};

export default Userprofile;
