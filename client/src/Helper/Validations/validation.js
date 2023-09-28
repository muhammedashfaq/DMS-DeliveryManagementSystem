export const registervalidate = (name, email, password, copassword) => {
  const error = {};

  error.name = !name || name.trim() === "" ? "Name is required" : "";

  error.email = !/\S+@\S+\.\S+/.test(email) ? "Invalid email format" : "";

  error.password = password.trim() === "" ? "Password is required" : password.length < 8 ? "Password must be at least 8 characters long" : "";

  error.copassword = copassword.trim() === "" ? "Confirm password is required" : password !== copassword ? "Passwords do not match" : "";

  return error;
};

  export const loginValidate = (email, password) => {
    const error = {};
  
    error.email = !email ? "Email is required" : !/\S+@\S+\.\S+/.test(email) ? "Invalid email format" : "";
  
    error.password = !password ? "Password is required" : password.length < 8 ? "Password must be at least 8 characters long" : "";
  
    return error;
  };
  
  export const forgetValidate = (password, cpassword) => {
    const errors = {};
  
    if (password.trim() === "") {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else {
      errors.password = "";
    }
  
    if (cpassword.trim() === "") {
      errors.cpassword = "Confirm password is required";
    } else if (password !== cpassword) {
      errors.cpassword = "Passwords do not match";
    } else {
      errors.cpassword = "";
    }
  
    return errors;
  };
  
export const adminloginvalidate = (email, password) => {
  const errors = {};

  if (!email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email format is not valid";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }

  return errors;
};




 export const drivervalidate = (formData) => {
    const errors = {};
  
    if (!formData.fname || formData.fname.trim() === "") {
      errors.fname = "First name is required";
    }
  
    if (!formData.lname || formData.lname.trim() === "") {
      errors.lname = "Last name is required";
    }
  
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Valid email is required";
    }
  
    if (!formData.city) {
      errors.city = "Please select a city";
    }
  
    if (!formData.address || formData.address.trim() === "") {
      errors.address = "Address is required";
    }
 
    if (!formData.mobile || formData.mobile.trim() === "") {
      errors.mobile = "Mobile number is required";
    } else if (formData.mobile.length !== 10) {
      errors.mobile = "Mobile number must be 10 digits";
    }
  
    if (!formData.pin || formData.pin.trim() === "") {
      errors.pin = "PIN is required";
    }
  
    if (!formData.licence || formData.licence.trim() === "") {
      errors.licence = "Licence number is required";
    }
    
   
    return errors;
  };
  
  
  export const driverloginvalidate =(formData)=>{

    const errors = {};
    if (!formData.employeeid || formData.employeeid.trim() === "") {
      errors.employeeid = "EmployeeID is required";
    }
  
   
  if (!formData.password || formData.password.trim() === "") {
    errors.password = "Password is required";
  } else if (formData.password.trim().length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }
    return errors
  }

  export const addressvalidate =(formdata)=>{
    const error={}
    error.name = !formdata.name || formdata.name.trim() === "" ? "Name is required" : "";
    error.mobile = formdata.mobile.length !== 10  ? "Enter Valid Mobile Number " : formdata.mobile.trim() === ""   ? " Mobile Number is required": "";
    error.address = !formdata.address || formdata.address.trim() === "" ? "Address is required" : "";
    error.pin = !formdata.pin || formdata.pin.trim() === "" ? "Pin is required" : "";

    return error

  }

  export const  bookshipmentvalidation = (formdata) => {
    const errors = {};
  
    errors.fromname = !formdata.fromname || formdata.fromname.trim() === "" ? "Name is required" : "";
    errors.frommobile =
      formdata.frommobile.length !== 10 ? "Enter a Valid 10-digit Mobile Number" : formdata.frommobile.trim() === "" ? "Mobile Number is required" : "";
    errors.fromaddress = formdata.fromaddress.trim() === "" ? "Address is required" : "";
    errors.frompin = formdata.frompin.trim() === "" ? "Field is required" : "";
    errors.fromdescription = formdata.fromdescription.trim() === "" ? "Field is required" : "";
    errors.toname = !formdata.toname || formdata.toname.trim() === "" ? "Name is required" : "";
    errors.tomobile =
      formdata.tomobile.length !== 10 ? "Enter a Valid 10-digit Mobile Number" : formdata.tomobile.trim() === "" ? "Mobile Number is required" : "";
    errors.toaddress = formdata.toaddress.trim() === "" ? "Address is required" : "";
    errors.topin = formdata.topin.trim() === "" ? "Field is required" : "";
  
    return errors;
  };
  