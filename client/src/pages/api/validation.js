export const registervalidate = (name, email, password, copassword) => {
  
    const error = {};

    if (!name || name.trim() === "") {
      error.name = "Name is Required";
    } else {
      error.name = "";
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      error.email = "Email Not Matched ";
    } else {
      error.email = "";
    }

    if (password.trim() === "") {
      error.password = "password is Required";
    } else if (password.length < 8) {
      error.password = "password  Not Matched ";
    } else {
      error.password = "";
    }

    if (copassword.trim() === "") {
      error.copassword = "Field is Required";
    } else if (password !== copassword) {
      error.copassword = "Password not matching";
    } else {
      error.copassword = "";
    }

    return error;
  };

  export const loginValidate=(email,password)=>{
    const error={}
    if(!email){
      error.email="Email is Required"
    }else if(!/\S+@\S+\.\S+/.test(email))
  {
    error.email="Email Not Matched "
  }else{
    error.email=""
  }
    
  if(!password){
    error.password="password is Required"
  }else if(password.length < 8)
  {
  error.password="password  Not Matched "
  }else{
  error.password = ""
  }
  
  return error
  
  }

export   const forgetValidate = (password,cpassword) => {
  const error = {};

  if(password.trim()===""){
    error.password = "password is Required";
  }else if (password.length < 8) {
    error.password = "password  Not Matched ";
  } else {
    error.password = "";
  }

  if (cpassword.trim() === "") {
    error.cpassword = "Field is Required";
  } else if (password !== cpassword) {
    error.cpassword = "Password not matching";
  } else {
    error.cpassword = "";
  }
  return error
};