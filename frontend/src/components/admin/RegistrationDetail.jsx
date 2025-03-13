import { saveAs } from "file-saver";
import { useLocation } from "react-router-dom";
// import expenditure from "../assets/Expenditure.jpg";
import { useNavigate } from "react-router-dom";
import "../../assets/RegistrationDetail.css";
import { useEffect } from "react";

function RegistrationDetail({onBack, rowData}) {
  const {state } = useLocation();
  const nav = useNavigate();
 
  const downloadImg = () => {
    saveAs(rowData.receipt_url , rowData.business_name + "_receipt.jpg");
  };
  const handleCloseDetail = () =>{
    nav('/sidebarTwo')
  }
  

  return (
    <div className="detail-wrapper">
      <div className="detail">
        <div className="head"> 
          <h1>Detail Information</h1>
      <i class="bi bi-x-lg" onClick={onBack}></i>
         
        </div>
        <div className="content">
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              value={rowData?.Full_Name || ""}
              readOnly 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Business Name
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              value={rowData?.business_name || ""}
              readOnly 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Contact Person
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              value={rowData?.contact_person || ""}
              readOnly 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              value={rowData?.phone_number || ""}
              readOnly 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
            Email or Social Media Link
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              value={rowData?.link || ""}
              readOnly 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              value={rowData?.description || ""}
              readOnly 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Electrical Outlet
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              value={rowData?.electrical_outlet || ""}
              readOnly 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Booth Number
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              value={rowData?.booth_number || ""}
              readOnly 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Registered On
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              value={rowData?.created_at ? new Date(rowData.created_at).toLocaleDateString("en-GB") : ""}
              readOnly 
            />
          </div>
          
          <div className="img-cl">
          <label htmlFor="formGroupExampleInput" className="form-label">
              Receipt
            </label><br></br>
            <img id="download" src={rowData?.receipt_url || ""} alt="Expenditure" /><br></br>
            <button onClick={downloadImg}>Download</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationDetail;
