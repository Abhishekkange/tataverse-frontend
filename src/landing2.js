import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Landing = () => {
  const navigate = useNavigate();

  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB in bytes

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (validateFile(droppedFile)) {
      setFile(droppedFile);
      setFileName(droppedFile.name);
    }
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const validateFile = (file) => {
    if (!file) {
      alert("No file selected.");
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert(`File size exceeds the maximum limit of ${MAX_FILE_SIZE / 1024 / 1024} MB.`);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!file || !fileName) {
      alert("Please select a file and enter a file name.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("fileName", fileName);

      const uploadResponse = await axios.post(
        "https://api.runtimetheory.com/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("File submitted successfully!");
      setFile(null);
      setFileName("");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#2F0B33";
    document.body.style.margin = "0";
    document.body.style.color = "#FFFFFF";
    document.body.style.fontFamily = "Arial, sans-serif";
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
      document.body.style.fontFamily = "";
    };
  }, []);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      padding: "20px",
    },
    dropzone: {
      border: "2px dashed #fff",
      borderRadius: "10px",
      padding: "20px",
      textAlign: "center",
      width: "100%",
      maxWidth: "500px",
      marginBottom: "20px",
      cursor: "pointer",
      backgroundColor: isDragActive ? "#4caf50" : "#250929",
      color: "#fff",
      transition: "0.3s",
    },
    input: {
      display: "none",
    },
    inputField: {
      padding: "10px",
      width: "100%",
      maxWidth: "500px",
      marginBottom: "20px",
      borderRadius: "5px",
      border: "1px solid #ddd",
      fontSize: "16px",
    },
    submitButton: {
      padding: "10px 30px",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#75E0E4",
      color: "#000",
      fontWeight: "bold",
      fontSize: "16px",
      cursor: "pointer",
    },
    loadingText: {
      fontSize: "16px",
      fontWeight: "bold",
      alignSelf: "center",
      width: "50%",
    },
    image: {
      width: "55vw",
      height: "85vh",
      borderRadius: "0px",
      objectFit: "cover",
      objectPosition: "left",
      // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    loadingContainer: {
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bouncingBall: {
      width: '20px',
      height: '20px',
      backgroundColor: '#250929',
      borderRadius: '50%',
      animation: 'bounce 1.5s ease-in-out infinite',
      position: 'absolute',
      boxShadow: '0 0 10px rgba(37, 9, 41, 0.3)',
    }
  };

  const keyframes = `
    @keyframes bounce {
      0% {
        left: 0px;
        transform: translateX(0%) scale(1);
      }
      50% {
        left: calc(100% - 20px);
        transform: scale(1.2);
      }
      100% {
        left: 0px;
        transform: translateX(0%) scale(1);
      }
    }
  `;

  useEffect(() => {
    document.body.style.backgroundColor = "#2F0B33";
    document.body.style.margin = "0";
    document.body.style.color = "#FFFFFF";
    document.body.style.fontFamily = "Arial, sans-serif";
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
      document.body.style.fontFamily = "";
    };
  }, []);
  return (
    <div style={styles.container}>
      <header style={{ marginBottom: "30px", textAlign: "center" }}>
        <h1>Tata Technologies</h1>
        <p>Upload your file below</p>
      </header>
      <div
        style={styles.dropzone}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleFileDrop}
        onClick={() => fileInputRef.current.click()}
      >
        {file ? (
          <p>Selected File: {file.name}</p>
        ) : (
          <p>Drag and drop a file here, or click to select one</p>
        )}
        <input
          type="file"
          ref={fileInputRef}
          style={styles.input}
          onChange={handleFileInputChange}
        />
      </div>
      <input
        type="text"
        placeholder="Enter a file name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        style={styles.inputField}
      />
      <button
        style={styles.submitButton}
        onClick={handleSubmit}
        disabled={isUploading}
      >
        {isUploading ? "Uploading..." : "Submit"}
      </button>
      {isUploading && <p style={styles.loadingText}>Uploading... Please wait</p>}
    </div>
  );
};

export default Landing;