import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [username, setUsername] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle username input change
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile || !username) {
      alert('Please select an image and enter a username.');
      return;
    }

    const formData = new FormData();
    const uniqueFileName = `${Date.now()}_${selectedFile.name}`;
    const renamedFile = new File([selectedFile], uniqueFileName, { type: selectedFile.type });
  
    formData.append('image', renamedFile);
    console,log("file name",renamedFile.name)
    formData.append('username', username); // Append the username to the FormData

    try {
      // Call the API to upload the image
      const response = await axios.post('https://api.runtimetheory.com/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadStatus('Image uploaded successfully!');
      console.log('API response:', response.data);
    } catch (error) {
      setUploadStatus('Failed to upload image.');
      console.error('Error uploading image:', error);
    }
  };

  // Get image URL for the given username
  const handleGetImageUrl = async () => {
    if (!username) {
      alert('Please enter a username.');
      return;
    }

    try {
      // Call the API to get the image URL by username
      const response = await axios.get(`https://api.runtimetheory.com/api/getImageUrl/${username}`);
      setImageUrl(response.data.imageUrl);
      console.log('Image URL:', response.data.imageUrl);
    } catch (error) {
      setImageUrl('');
      console.error('Error fetching image URL:', error);
    }
  };

  return (
    <div>
      <h3>Image Upload</h3>
      <input type="file" accept="*" onChange={handleFileChange} />
      <input 
        type="text" 
        placeholder="Enter username" 
        value={username} 
        onChange={handleUsernameChange} 
      />
      <button onClick={handleUpload}>Upload Image</button>
      <button onClick={handleGetImageUrl}>Get Image URL</button>
      <p>{uploadStatus}</p>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
};

export default ImageUpload;