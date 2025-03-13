import React, { useState,useEffect,useRef } from "react";
import axios from "axios";
import '../../assets/Booth.css';

function Booth() {
  const [formData, setFormData] = useState({
    boothNumber: "",
    boothImage: null,
  eventName: "",
created_by:"",});
  const [data, setData] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:3000/boothImage")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        console.log("Result from API:", result);
        setData(result);
      })
      .catch((err) => console.error("Error fetching booth images:", err));
  }); // Add an empty dependency array
  
  
  

  const handleFileChange = (e) => {
    setFormData({ ...formData, boothImage: e.target.files[0] });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem("userId");
    

    

    const data = new FormData();
    data.append("boothNumber", formData.boothNumber);
    
    data.append("boothImage", formData.boothImage);
data.append("eventName", formData.eventName);
data.append("created_by",user_id);
console.log(user_id);
    try {
      const response = await axios.post("http://localhost:3000/booth", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data);
      setFormData({
        boothNumber: "",
        boothImage: null,
        eventName: "",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (error) {
      console.error("Error saving booth:", error);
      alert("Failed to save booth data");
    }
     
  };

  return (
    <div className="booth-wrapper">  
    <div className="booth">
      <h1>Booth</h1>
      {/* Display Booth Images */}
      <div className="booth-images">
        {data.map((r, i) => (
          <div key={i} className="booth-item">
            <div className="img-cl">
              <img src={r.boothImage_url} alt={`Booth ${r.booth_no}`} />
            </div>
            {/* <p>Booth Number: {r.booth_no}</p> */}
          </div>
        ))}
      </div>

      {/* Booth Form */}
      <form className="form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="boothImage" className="form-label">
            Choose the image of the Booth Number
          </label>
          <input
            type="file"
            name="boothImage"
            className="form-control"
            id="boothImage"
            onChange={handleFileChange}
            ref={fileInputRef}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="eventName" className="form-label">
            Event Name
          </label>
          <input
            type="text"
            name="eventName"
            className="form-control"
            id="eventName"
            placeholder="Enter Event Name"
            value={formData.eventName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="boothNumber" className="form-label">
            Booth Number
          </label>
          <input
            type="number"
            name="boothNumber"
            className="form-control"
            id="boothNumber"
            placeholder="Enter Booth Number"
            value={formData.boothNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="buttons">
          {/* <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => setFormData({ boothNumber: "", boothImage: null })}
          >
            Cancel
          </button> */}
          
          <button type="submit" 
        //   className="btn btn-outline-success"
          // onClick={() => handleSubmit()}
          >
            Save
          </button>
        </div>
      </form>
    </div></div>
  
  );
}

export default Booth;
