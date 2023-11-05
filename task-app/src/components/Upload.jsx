// import { uploadFile } from "../api";

// function Upload() {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//   };

//   // backend test
//   const [testResponse, setTestResponse] = useState("");

//   const handleUploadClick = async () => {
//     if (selectedFile) {
//       try {
//         const response = await uploadFile(selectedFile);
//         console.log(response);
//         // Handle the response as needed
//         setTestResponse(response.filename);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };
// }
