import React, { useEffect, useState } from "react";
import { adminRequest } from "../../Helper/interceptor/axois";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideloading, showloading } from "../../Helper/redux/alertSlice";
import { RouteObjects } from "../../Routes/RouteObject";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const [editname, setEditname] = useState(false);
  const [editmobile, setEditmobile] = useState(false);

  const [image, setImage] = useState(
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
  );

  const [profileimage, setProfileimage] = useState(image);

  const navigate = useNavigate();
  const [admin, setAdmin] = useState("");
  const [username, setUsername] = useState(admin?.username);
  const [usermobile, setUsermobile] = useState(admin?.mobile);

  const submitimage = async (e) => {
    if (profileimage) {
      const formdata = new FormData();
      formdata.append("profileimage", profileimage);
      e.preventDefault();
      
      dispatch(showloading());

      adminRequest({
        url:`${process.env.REACT_APP_DOMAIN}/admin/updateadminprofileimage`,
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
          toast.error("something went wrong");
          console.log(err);
          localStorage.removeItem("admintoken");
          navigate(RouteObjects.AdminLogin);
        });
    } else {
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

  const updateform = async (input, field) => {
    
    adminRequest({
      url: "/admin/updateadminDetails",
      method: "POST",
      data: {
        input: input,

        field: field,
      },
    })
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setEditmobile(false);
          setEditname(false);
          getData();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((err) => {
        dispatch(hideloading());

        toast.error("something went wrong");
        console.log(err);
        localStorage.removeItem("token");
        navigate("/");
      });
  };

  const getData = async () => {
    adminRequest({
      url: "/admin/get-admininfo-id",
      method: "POST",
    })
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          const admin = response.data.data;
          const profile = response.data.image;
          setProfileimage(profile);

          setAdmin(admin);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((err) => {
        toast.error("something went wrong");
        console.log(err);
        localStorage.removeItem("admintoken");
        navigate(RouteObjects.AdminLogin);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="  w-5/6  py-2 dark:bg-gray-800 dark:text-gray-50 rounded-md  ">
        <div className="flex justify-center items-center">
          <h1 className="font-serif font-extrabold text-2xl">
            Hai Admin {admin?.username} !
          </h1>
        </div>

        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x mt-10">
          <div className=" md:py-0 md:px-6 ">
            <div className="  flex justify-center items-center h-80 w-80 ml-16   bg-slate-700 rounded-lg ">
              <img
                src={admin?.profileimage ? admin.profileimage : image}
                alt=""
                className=" rounded-full  h-60 w-60 dark:bg-gray-500  "
              />
            </div>
            <div className=" flex justify-center mt-2">
              <button className="bg-blue-700 rounded-sm p-2">
                <label for="imageUpload">
                  Choose Image
                  <input
                    type="file"
                    id="imageUpload"
                    name="profileimage"
                    className="hidden"
                    onChange={changeimage}
                  />
                </label>
              </button>
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

          <div className="md:col-span-1">
            <div className="md:col-span-1 container shadow-md">
              <div className="mb-4">
                <div className="p-3 space-y-6">
                  <div className="mb-2 flex  items-center">
                    <p className="w-1/4 text-sm md:text-base lg:text-lg">
                      Full Name
                      {editname ? (
                        <button
                          onClick={() => updateform(username, "username")}
                          class="material-symbols-outlined ml-2 absolute mt-1  bg-green-800 rounded-md text-white font-semibold"
                        >
                          done
                        </button>
                      ) : (
                        <button
                          onClick={() => setEditname(true)}
                          className="material-symbols-outlined ml-1 absolute mt-1"
                        >
                          edit
                        </button>
                      )}
                    </p>
                    {editname ? (
                      <input
                        type="text"
                        className="w-3/4 text-muted text-sm md:text-base lg:text-lg bg-gray-300 rounded-md ml-10"
                        value={username}
                        defaultValue={admin?.username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    ) : (
                      <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg  pl-10">
                        {admin?.username}
                      </p>
                    )}
                  </div>
                  <hr className="my-2" />
                  <div className="mb-2 flex items-center">
                    <p className="w-1/4 text-sm md:text-base lg:text-lg">
                      Email
                    </p>
                    <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg pl-10">
                      {admin?.email}
                    </p>
                  </div>
                  <hr className="my-2" />

                  <div className="mb-2 flex items-center">
                    <p className="w-1/4 text-sm md:text-base lg:text-lg">
                      Contact
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
                        className="w-3/4 text-muted text-sm md:text-base lg:text-lg bg-gray-300 rounded-md ml-10"
                        defaultValue={admin?.mobile}
                      />
                    ) : (
                      <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg pl-10">
                        {admin?.mobile}
                      </p>
                    )}
                  </div>
                  <hr className="my-2" />

                  <div className="mb-2 flex items-center mt-10">
                    <p className="w-1/4 text-sm md:text-base lg:text-lg underline">
                      About
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
