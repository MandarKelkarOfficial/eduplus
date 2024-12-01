// import Header from "../../compo/header";
// import Footer from "../../compo/footer";
// import "../../css/studentcredential.css";

// function Studentcredential() {
//     return (
//         <div className="student-credential">
//             <Header name="Harsh" year="3rd year" role="STUDENT" />

//             <div className="credential-content">
//                 <h2>Credentials</h2>

//                 <div className="credential-card">
//                     <img src={ ' '} alt="pdf will be render" className="id-card-image" />
//                 </div>

//                 <div className="unique-id">
//                     <span>Unique ID:</span>
//                 </div>
//             </div>

//             <Footer />
//         </div>
//     );
// }

// export default Studentcredential;

import React, { useEffect, useState } from "react";
import Header from "../../compo/header";
import Footer from "../../compo/footer";
import "../../css/studentcredential.css";

import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function Studentcredential() {

  const [error, setError] = useState(""); // State for handling errors

  // Decode JWT from cookie
  const cookies = Cookies.get("eduplus");
  const decoded = jwtDecode(cookies);
  const prn = decoded.prn; // Extracted PRN from JWT
  const name= decoded.username;
  // Fetch all students from the API
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/student",{
                prn: prn
          }
        );


        
        const data = response.data
        setStudents(data); // Set the fetched students
      } catch (err) {
        console.error("Failed to fetch students:", err);
        setError("Failed to fetch student data.");
      }
    };

  

  // Handle submit action
  const handleSubmit = async () => {
    try {
      // Sending PRN from JWT to the API
      await axios.post("http://localhost:3000/freeze-student", {
        prn: prn, // Use the PRN fetched from decoded JWT
      });
      alert("Request sent successfully!");
    } catch (error) {
      console.error("Error sending student request:", error);
      alert("Failed to send request. Please try again.");
    }
  };
  


  return (
    <div className="student-credential">
      <Header name={name} year="3rd year" role="STUDENT" />

      <div className="credential-content">
        <h2>Student Credentials</h2>

        {/* Search Form */}
        <div className="container-search">
          <div className="input-group">
            
            <button onClick={handleSubmit} className="deploy-button">
              Freeze and fetch certificate
            </button>
          </div>
        </div>


       



        Student Details
        {error && <p className="error-message">{error}</p>}
        <button onClick={fetchStudents}>Fetch</button>
        
      </div>

      <br />
      <div className="credential-card">
        <img src={" "} alt="pdf will be render" className="id-card-image" />
      </div>

      <Footer />
    </div>
  );
}

export default Studentcredential;





// import React, { useEffect, useState } from "react";
// import Header from "../../compo/header";
// import Footer from "../../compo/footer";
// import "@react-pdf-viewer/core/lib/styles/index.css"; // PDF Viewer styles
// import { Worker, Viewer } from "@react-pdf-viewer/core"; // React PDF Viewer
// import "../../css/studentcredential.css";

// function Studentcredential() {
//   const [students, setStudents] = useState([]);
//   const [filteredStudent, setFilteredStudent] = useState(null);
//   const [searchPRN, setSearchPRN] = useState("");
//   const [error, setError] = useState("");
//   const [pdfUrl, setPdfUrl] = useState(null);

//   // Fetch all students
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:3000/view/students/updated-to-verify-student"
//         );
//         const data = await response.json();
//         setStudents(data);
//       } catch (err) {
//         console.error("Failed to fetch students:", err);
//         setError("Failed to fetch student data.");
//       }
//     };

//     fetchStudents();
//   }, []);

//   // Handle PRN search
//   const handleSearch = () => {
//     const student = students.find((stu) => stu.prn === searchPRN);
//     if (student) {
//       setFilteredStudent(student);
//       setError("");

//       // Set the PDF URL dynamically
//       setPdfUrl(`http://localhost:3000/download-pdf/${student.prn}`);
//     } else {
//       setFilteredStudent(null);
//       setError("No student found with the entered PRN.");
//     }
//   };

//   return (
//     <div className="student-credential">
//       <Header name="Harsh" year="3rd year" role="STUDENT" />

//       <div className="credential-content">
//         <h2>Student Credentials</h2>

//         {/* Search Form */}
//         <div className="container-search">
//           <div className="input-group">
//             <input
//               id="Input-search"
//               name="input-search"
//               type="text"
//               placeholder="Enter PRN"
//               value={searchPRN}
//               onChange={(e) => setSearchPRN(e.target.value)}
//               className="search-input"
//             />
//             <button onClick={handleSearch} className="deploy-button">
//               Search
//             </button>
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && <p className="error-message">{error}</p>}

//         {/* Student Details */}
//         {filteredStudent && (
//           <div>
//             <div className="credential-card">
//               <h3 className="student-title">{filteredStudent.name}</h3>
//               <table className="student-table">
//                 <tbody>
//                   <tr>
//                     <td><strong>PRN:</strong></td>
//                     <td>{filteredStudent.prn}</td>
//                   </tr>
//                   <tr>
//                     <td><strong>Programme:</strong></td>
//                     <td>{filteredStudent.programme}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>

//             {/* PDF Section */}
//             {pdfUrl && (
//               <div className="credential-card">
//                 <h3>Grade Card PDF</h3>
//                 <div style={{ border: "1px solid #ddd", padding: "10px" }}>
//                   {/* Render PDF Viewer */}
//                   <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js`}>
//                     <Viewer fileUrl={pdfUrl} />
//                   </Worker>
//                 </div>
//                 <button
//                   onClick={() => window.open(pdfUrl, "_blank")}
//                   className="download-button"
//                   style={{
//                     marginTop: "10px",
//                     padding: "10px 20px",
//                     backgroundColor: "#00695c",
//                     color: "white",
//                     borderRadius: "5px",
//                     border: "none",
//                   }}
//                 >
//                   Download PDF
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default Studentcredential;
