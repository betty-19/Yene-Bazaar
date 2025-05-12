import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/viewRegistration.css";
import { baseUrl } from "../../util/constants";

function ViewRegistration({ onViewDetail }) {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [currentData, setCurrentData] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    fetch(`${baseUrl}/api/viewRegistration`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  // Update currentData whenever data or currentPage changes
  useEffect(() => {
    const startRow = (currentPage - 1) * rowsPerPage;
    const endRow = startRow + rowsPerPage;
    setCurrentData(data.slice(startRow, endRow));
  }, [data, currentPage]);

  const handleViewDetail = (rowData) => {
    nav("/registrationDetail", { state: rowData });
  };

  // Group data by event_name
  const groupedData = currentData.reduce((acc, item) => {
    if (!acc[item.event_name]) {
      acc[item.event_name] = [];
    }
    acc[item.event_name].push(item);
    return acc;
  }, {});

  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <div className="view-table">
      <main className="table">
        <section>
          <h1>Customer's Orders</h1>
        </section>
        <section className="table_body">
        {Object.keys(groupedData).map((eventName, index) => (
                <React.Fragment key={index}>
                  {/* Display the event name */}
                  
                    <h4 colSpan="4" style={{ fontWeight: 700, marginTop:20, color:"#000",  WebkitTextStroke: "0.5px gold" }}>
                      {eventName}
                    </h4>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Username</th>
                <th>Business Name</th>
                <th>Contact Person</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
             
                  

                  {/* Display rows for the current event */}
                  {groupedData[eventName].map((d, i) => (
                    <tr key={i}>
                      <td>{d.username}</td>
                      <td>{d.business_name}</td>
                      <td>{d.contact_person}</td>
                      <td className="btn-v">
                        <button onClick={() => onViewDetail(d)}>View Detail</button>
                      </td>
                    </tr>
                  ))}
             
            </tbody>
          </table>   </React.Fragment>
              ))}
        </section>

        {/* Pagination Section */}
        <section className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </section>
      </main>
    </div>
  );
}

export default ViewRegistration;
