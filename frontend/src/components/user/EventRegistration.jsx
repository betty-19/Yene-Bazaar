import React, { useState, useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/EventRegistration.css";
// import bazaar from '../assets/yene_bazaar.jpg'


function EventRegistration() {
  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    phoneNumber: "",
    link: "",
    description: "",
    electricalOutlet: "No",
    boothNumber: "",
    created_by: "",
    receipt: null,
  });
  const [boothImage, setBoothImage] = useState([]);
  const [selectedBooths, setSelectedBooths] = useState([]);
  // const user_id = localStorage.getItem("user_id");


  const fileInputRef = useRef(null); // Ref for file input
  const navigate = useNavigate();


 useEffect(() => {
  const fetchBoothImage = async () => {
    try {
      const response = await fetch(`${baseUrl}/boothImage`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Result from API:", result); 

      if (Array.isArray(result) && result.length > 0) {
        const validBoothNumber = result[0].booth_no; 
        console.log("booth_no:", validBoothNumber);

        setBoothImage(result);
      } else {
        console.warn("No data found in the API response.");
      }
    } catch (err) {
      console.error("Error fetching booth images:", err);
    }
  };

  fetchBoothImage();
}, []);


  const fetchSelectedBooth = async () => {
    try {
      const response = await fetch(`${baseUrl}/selectedBooths`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const result = await response.json();
      console.log("Selected booths:", result);

      if (Array.isArray(result)) {
        const boothNumbers = result.map((booth) => booth.booth_number);
        setSelectedBooths(boothNumbers);
        console.log(selectedBooths);
      }
    } catch (err) {
      console.error("Error fetching selected booths:", err);
    }
  };
useEffect(() => {
  fetchSelectedBooth();
}, []);



const validateBooth = () => {
  const enteredBooth = parseInt(formData.boothNumber, 10);
  const errorMsg = document.getElementById("selectedBoothMessage");

  if (selectedBooths.includes(enteredBooth)) {
    errorMsg.innerText = `Booth number ${enteredBooth} is already reserved. Please choose another booth.`;
  } else {
    errorMsg.innerText = "";
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, receipt: e.target.files[0] }));
  };
  const handleCheckboxChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      electricalOutlet: prevData.electricalOutlet === "Yes" ? "No" : "Yes",
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
   const validBoothNumber = boothImage[0].booth_no;
    const userBoothNumber = parseInt(formData.boothNumber, 10);
    const p = document.getElementById("error");
    const errorMsg = document.getElementById("selectedBooth");

    if (isNaN(userBoothNumber) || userBoothNumber > validBoothNumber || userBoothNumber < 1) {
     
      p.innerText = `Booth number must be between 1 and ${boothImage[0].booth_no}.`;
      errorMsg.innerText =" ";
      return;
    }
    if (selectedBooths.includes(userBoothNumber)) {
      errorMsg.innerText = `Booth number ${userBoothNumber} is already reserved.`;
      p.innerText= "";
      return;
    }
   

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }


    try {
     data.append("created_by", userId);
      const response = await fetch(`${baseUrl}/api/registered_events`, {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        alert("Successfully Registered");

       
        setFormData({
          
          businessName: "",
          contactPerson: "",
          phoneNumber: "",
          link: "",
          description: "",
          electricalOutlet: "No",
          boothNumber: "",
          receipt: null,
          
        });
        p.innerText = "";
        errorMsg.innerText = "";

       
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        fetchSelectedBooth();
    
      } else {
        console.error("Failed to register event");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };
 
  
  return (
    <div className="register-wrapper">
      <div className="register">
        <h1>Register</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="mb-3">
            <label htmlFor="businessName" className="form-label">
              Business Name
            </label>
            <input
              type="text"
              name="businessName"
              className="form-control"
              id="businessName"
              placeholder="Enter Your Business Name"
              value={formData.businessName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contactPerson" className="form-label">
              Contact Person
            </label>
            <input
              type="text"
              name="contactPerson"
              className="form-control"
              id="contactPerson"
              placeholder="Enter Name of Contact Person"
              value={formData.contactPerson}
              onChange={handleChange}
              required
            />
            
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="number"
              name="phoneNumber"
              className="form-control"
              id="phoneNumber"
              placeholder="Enter Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="link" className="form-label">
              Email or Social Media Link
            </label>
            <input
              type="text"
              name="link"
              className="form-control"
              id="link"
              placeholder="Enter link of Socail Media"
              value={formData.link}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
            Please provide a description of your business and the product that you sell or the service that you offer
            </label>
            <textarea row="200" column="100" 
              type="text"
              name="description"
              className="form-control"
              id="description"
              placeholder="Write about Your Business"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
         

<div className="mb-3">
            <label>Do you need an electrical outlet?</label><br></br>
            <input
            id="check"
              type="checkbox"
              checked={formData.electricalOutlet === "Yes"}
              onChange={handleCheckboxChange}
            />
            Yes
          </div>
            <div className="mb-3">
            <label htmlFor="booth_number" className="form-label">
            Select booth from the picture below:
            </label>
           
          <div className="img-cl">
          {boothImage.length > 0 ? (
                boothImage.map((r, i) => (
                  <div key={i} className="booth-item">
                    <div className="img-cl">
                      <img src={r.boothImage_url} alt={`Booth ${r.booth_no}`} />
                    </div>
                  </div>
                ))
              ) : (
                <p>No booth images available.</p>
              )}
      </div>
             <p id="selectedBooth" style={{ color: "red"}}></p>
            <input 
              type="Number"
              name="boothNumber"
              className="form-control"
              id="boothNumber"
              placeholder="Enter booth number"
              value={formData.boothNumber}
              onChange={handleChange}
              onBlur={validateBooth}
              required
            />
            <p id="error" style={{ color: "red"}}></p>
          </div>
            
         
          <div className="mb-3">
            <label htmlFor="receipt" className="form-label">
              Upload Receipt
            </label>
            <input
              type="file"
              name="receipt"
              className="form-control"
              id="receipt"
              ref={fileInputRef} 
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="buttons">
          
            <button type="submit" 
            // className="btn btn-outline-success"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventRegistration;
