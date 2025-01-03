import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Landing = ({ username }) => {
  const navigate = useNavigate();

  // State to manage the file upload and other form data
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Ref to the file input
  const fileInputRef = useRef(null);

  // Handle file drag events
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
    if (droppedFile) {
      setFile(droppedFile);
      setFileName(droppedFile.name);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  // Handle file name input change
  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (file && fileName) {
      setShowConfirmation(true);
      // Simulate file submission process (this could be an API call)
      setTimeout(() => {
        alert("File submitted successfully!");
        setShowConfirmation(false);
        setFile(null);
        setFileName("");
      }, 2000);
    } else {
      alert("Please select a file and enter a file name.");
    }
  };

  // Styles
  const styles = {
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px",
    },
    leftBox: {
      flex: 1,
      padding: "20px",
    },
    rightBox: {
      flex: 1,
      color: "#FFFFFF",
      padding: "20px",
    },
    dropzone: {
      border: "2px dashed #fff",
      borderRadius: "10px",
      padding: "20px",
      textAlign: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    dropzoneActive: {
      borderColor: "#4caf50", // Green color when drag is active
    },
    dropzoneText: {
      color: "#fff",
      fontSize: "16px",
    },
    fileInput: {
      display: "none", // Hide the file input
    },
    inputField: {
      width: "100%",
      padding: "10px",
      margin: "20px 0",
      borderRadius: "5px",
      border: "1px solid #ddd",
      backgroundColor: "#fff",
      color: "#333",
    },
    submitButton: {
      padding: "10px 20px",
      border: "none",
      backgroundColor: "#4caf50",
      color: "#fff",
      fontSize: "16px",
      cursor: "pointer",
      borderRadius: "5px",
    },
    image: {
      width: "100%",
      height: "auto",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
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

  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            fontFamily: "'Arial', sans-serif",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          <span>TATA</span>
          <span>technologies</span>
        </div>
        <img
          src="your-logo-path.png"  // Update this with the actual logo path
          alt="Logo"
          style={{ width: "50px", height: "50px", cursor: "pointer" }}
        />
      </header>

      <div style={styles.container}>
        {/* Left Div - Image */}
        <div style={styles.leftBox}>
          <img
            src="/landing-img.png"  // Update with the image path in the public folder
            alt="Virtual Reality"
            style={styles.image}
          />
        </div>

        {/* Right Div - Form and Upload functionality */}
        <div style={styles.rightBox}>
          {/* Welcome Message */}
          <h2>Welcome, {username}</h2>
          <p>
            Dive into the world of virtual reality (VR) and experience immersive environments and interactions.
          </p>

          {/* Upload Instruction */}
          <h3>Upload your VR files to get started</h3>

          {/* Drag-and-drop zone */}
          <div
            style={{
              ...styles.dropzone,
              ...(isDragActive ? styles.dropzoneActive : {}),
              pointerEvents: showConfirmation ? "none" : "auto",
            }}
            onClick={() => fileInputRef.current.click()}  // Trigger the file input on click
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleFileDrop}
          >
            <p style={styles.dropzoneText}>
              {file ? `Selected File: ${fileName}` : "Drag & drop your VR files here or Browse you PC"}
            </p>
            <input
              ref={fileInputRef}  // Reference to the hidden file input
              type="file"
              accept="*"
              onChange={handleFileInputChange}
              style={{
                ...styles.fileInput,
                pointerEvents: showConfirmation ? "none" : "auto",
              }}
            />
          </div>

          {/* Conditionally render the input field for file name if file is selected */}
          {file && (
            <input
              type="text"
              placeholder="Enter file name"
              value={fileName}
              onChange={handleFileNameChange}
              style={styles.inputField}
            />
          )}

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            style={{ ...styles.submitButton, pointerEvents: showConfirmation ? "none" : "auto" }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
