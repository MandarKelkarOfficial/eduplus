import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../compo/header_admin";
import Footer from "../../compo/footer";
import "../../css/admin-student-list-container.css";

const AdminRecutierList = () => {
  const [recrutier, setRecrutier] = useState([]); // State to store verifier data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVerifier = async () => {
      try {
        const response = await axios.get("http://192.168.149.73:3000/get-verifier");
        console.log(response.data)
        setRecrutier(response.data); 
        console.log(response.data); // Optional: For debugging
      } catch (error) {
        console.error("Error fetching verifiers:", error);
      }
    };

    fetchVerifier();
  }, []);


  const changeStatus =()=>{
    console.log("Pressed")
    
  }
  return (
    <div className="admin-student-list-container">
      <Header role="ADMIN" />
      <div className="admin-student-list-main">
        <div className="admin-student-list-title">Verifier List</div>
        <div style={{backgroundColor:"#028978",width:"80%",justifyItems:"center",borderRadius:"20px",padding:"20px 0px"}}>
          {recrutier.length > 0 ? (
            recrutier.map((verifier) => (
              <div key={verifier._id} style={{display:"flex",marginBottom:"10px"}}>
                <p style={{color:"#fff",padding:"0px 20px"}}><strong>Name:</strong> {verifier.username}</p>
                <div onClick={()=>{console.log( verifier._id , "Pressed")}} style={{backgroundColor:"blue",padding:"5px 10px" ,color:"#fff",borderRadius:"10px",userSelect:"none",cursor:"pointer"}}>Verify</div>
              </div>
            ))
          ) : (
            <p>No verifiers found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminRecutierList;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ethers, Contract } from "ethers";
// import contractABI from "../../../contract/abi.json";
// import Header from "../../compo/header_admin";
// import Footer from "../../compo/footer";
// import "../../css/admin-student-list-container.css";

// const contractAddress = "0xf116A59bbB31e86a9a403a8057761C8A8eEbc627"; // Replace with your contract address

// interface Student {
//   _id: string;
//   name: string;
//   status: boolean;
// }

// const AdminStudentList: React.FC = () => {
//   const navigate = useNavigate();
//   const [studentList, setStudentList] = useState<Student[]>([]);
//   const [contract, setContract] = useState<Contract | null>(null);
//   const [account, setAccount] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   // Initialize blockchain connection
//   useEffect(() => {
//     const initBlockchain = async () => {
//       if (window.ethereum) {
//         try {
//           const provider = new ethers.BrowserProvider(window.ethereum);
//           const signer = await provider.getSigner();
//           const blockchainContract = new ethers.Contract(
//             contractAddress,
//             contractABI,
//             signer
//           );

//           setContract(blockchainContract);
//           const accounts = await provider.send("eth_requestAccounts", []);
//           setAccount(accounts[0]);
//         } catch (error) {
//           console.error("Error initializing blockchain:", error);
//         }
//       } else {
//         alert("MetaMask is not installed. Please install MetaMask to continue.");
//       }
//     };

//     initBlockchain();
//   }, []);

//   // Fetch student data from the server
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/students", {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include", // Include cookies for authentication
//         });
        
//         if (!response.ok) {
//           throw new Error(`Error: ${response.status}`);
//         }

//         const data: Student[] = await response.json();
//         setStudentList(data.map((student) => ({ ...student, status: false })));
//       } catch (error) {
//         console.error("Error fetching students:", error);
//         setStudentList([]); // Set to empty in case of error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudents();
//   }, []);

//   const handleVerify = (index: number) => {
//     const updatedList = [...studentList];
//     updatedList[index].status = true;
//     setStudentList(updatedList);
//   };

//   const handleDeploy = async (student: Student) => {
//     if (!contract) {
//       alert("Blockchain contract not initialized.");
//       return;
//     }

//     try {
//       const tx = await contract.issueCredentials(student.name); // Replace with your contract method
//       await tx.wait();
//       alert(`Student ${student.name}'s record deployed successfully.`);
//     } catch (error) {
//       console.error("Error deploying student record to blockchain:", error);
//       alert(`Failed to deploy ${student.name}'s record.`);
//     }
//   };

//   const handleSubmit = () => {
//     const statusStudents = studentList.filter((student) => student.status);
//     navigate("/status-students", { state: { statusStudents } });
//   };

//   return (
//     <div className="admin-student-list-container">
//       <Header role="ADMIN" />
//       <div className="admin-student-list-main">
//         <div className="admin-student-list-title">Student Management</div>
//         <div className="admin-student-list-renderList">
//           {loading ? (
//             <p>Loading student data...</p>
//           ) : studentList.length > 0 ? (
//             studentList.map((student, index) => (
//               <div key={student._id} className="student-item">
//                 <span className="student-item-name">{student.name}</span>
//                 {student.status ? (
//                   <span className="status-status">status</span>
//                 ) : (
//                   <button
//                     className="verify-button"
//                     onClick={() => handleVerify(index)}
//                   >
//                     Verify
//                   </button>
//                 )}
//                 <button
//                   className="deploy-button"
//                   onClick={() => handleDeploy(student)}
//                 >
//                   Deploy
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p>No students found. Please check again later.</p>
//           )}
//           {studentList.length > 0 && (
//             <div className="admin-student-list-btn" onClick={handleSubmit}>
//               NEXT
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default AdminStudentList;
