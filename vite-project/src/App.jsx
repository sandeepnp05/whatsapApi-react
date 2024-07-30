import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await axios.post('http://localhost:3000/send-pdf', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('File sent successfully:', response.data);
      } catch (error) {
        console.error('Error sending file:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md">
        <h1 className="text-xl font-semibold mb-4">Send PDF via WhatsApp</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="file" 
            accept="application/pdf" 
            onChange={handleFileChange} 
            className="w-full p-2 border rounded"
          />
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;