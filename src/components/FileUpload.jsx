// import React, { useState } from 'react';
// import axios from 'axios';

// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert('Please select a file first.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     setLoading(true);
//     try {
//       const response = await axios.post("http://localhost:8000/analyze-csv", formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setAnalysisResult(response.data);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       alert('Failed to analyze the file.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept=".csv" onChange={handleFileChange} />
//       <button onClick={handleUpload} disabled={loading}>
//         {loading ? 'Analyzing...' : 'Upload and Analyze'}
//       </button>

//       {analysisResult && (
//         <div>
//           <h2>Analysis Results</h2>
//           <p>Total Rows: {analysisResult.total_rows}</p>

//           {/* <h3>Summary Statistics</h3>
//           <pre>{JSON.stringify(analysisResult.summary, null, 2)}</pre> */}

//           <h3>Top 5 Rows</h3>
//           {/* <pre>{JSON.stringify(analysisResult.top_5_rows, null, 2)}</pre> */}
//           <table border="1" cellPadding="5" cellSpacing="0" style={{ marginTop: '10px' }}>
//             <thead>
//               <tr>
//                 {Object.keys(analysisResult.top_5_rows[0]).map((header) => (
//                   <th key={header}>{header}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {analysisResult.top_5_rows.map((row, index) => (
//                 <tr key={index}>
//                   {Object.values(row).map((value, i) => (
//                     <td key={i}>{value}</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;

import React, { useState } from 'react';
import axios from 'axios';

const FileUploadChat = () => {
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [chatResponse, setChatResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFileId(response.data.file_id);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload the file.');
    } finally {
      setLoading(false);
    }
  };

  const handleChat = async () => {
    if (!fileId || !prompt) {
      alert('Please upload a file and enter a prompt.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/process/', {
        file_id: fileId,
        prompt: prompt,
      });
      setChatResponse(response.data.response);
    } catch (error) {
      console.error('Error processing chat:', error);
      alert('Failed to process the request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>File Upload and AI Chat</h2>
      <input type="file" accept=".csv,.xlsx,.json" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>{loading ? 'Uploading...' : 'Upload File'}</button>

      {fileId && (
        <div>
          <h3>Chat with AI</h3>
          <input 
            type="text" 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)} 
            placeholder="Enter your prompt..." 
          />
          <button onClick={handleChat} disabled={loading}>{loading ? 'Processing...' : 'Send'}</button>
        </div>
      )}

      {chatResponse && (
        <div>
          <h3>AI Response</h3>
          <p>{chatResponse}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploadChat;
