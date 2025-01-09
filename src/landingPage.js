import React, { useState } from "react";
import axios from "axios";

const LandingPage = ({ userName, id }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleFileDrop = (event) => {
    event.preventDefault();
    setIsDragActive(false);
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
    setFileName(droppedFile.name);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };

  const handleSubmit = async () => {
    if (file && fileName) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("username", fileName);

      try {
        // Step 1: Check if the image already exists
        const response = await axios.get(
          `https://api.runtimetheory.com/api/saveUser/getImageUrl/${fileName}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (
          response.status === 200 &&
          response.data &&
          response.data.imageRecord &&
          response.data.imageRecord.imageUrl
        ) {
          setUploadStatus("Image already exists!");
          setShowConfirmation(true); // Show confirmation popup
        } else {
          handleConfirmUpload(); // Proceed with file upload
        }
        console.log("API response:", response);
      } catch (error) {
        if (error?.response?.data?.message === "User not found") {
          handleConfirmUpload(); // Proceed with file upload if user is not found
        }
        setUploadStatus("Failed to upload image.");
        console.error("Error uploading image:", error);
      }
    } else {
      alert("Please select a file");
    }
  };

  const handleConfirmUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("username", fileName);

      // Step 2: Upload the file
      const uploadResponse = await axios.post(
        "http://3.108.55.122/api/saveUser/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadStatus("Image uploaded successfully!");
      setFile(null); // Clear the file
      setFileName(""); // Clear the file name input
      setShowConfirmation(false); // Close confirmation popup
    } catch (error) {
      console.error("Error in confirmation API:", error);
      setUploadStatus("Failed to upload image.");
    }
  };

  const goToDashboard = () => {
    window.location.href = `https://runtimetheory.com/?id=${id}`;
  };

  return (
    <div style={{ ...styles.container }}>
      <h1 style={styles.heading}>Welcome, {userName}!</h1>
      <p style={styles.introText}>
        Dive into the world of Virtual Reality (VR) and experience immersive
        environments and interactions. Upload your VR files to get started!
      </p>

      <h3 style={styles.instructionText}>
        Drag and drop files here to upload.
      </h3>

      <div
        style={{
          ...styles.dropzone,
          ...(isDragActive ? styles.dropzoneActive : {}),
          pointerEvents: showConfirmation ? "none" : "auto",
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleFileDrop}
      >
        <p style={styles.dropzoneText}>
          {file ? `Selected File: ${fileName}` : "Drag & drop your VR files here"}
        </p>
        <input
          type="file"
          accept="*"
          onChange={handleFileInputChange}
          style={{
            ...styles.fileInput,
            pointerEvents: showConfirmation ? "none" : "auto",
          }}
        />
      </div>

      <input
        type="text"
        placeholder="Enter file name"
        value={fileName}
        onChange={handleFileNameChange}
        style={styles.inputField}
      />

      <button
        onClick={handleSubmit}
        style={{ ...styles.submitButton, pointerEvents: showConfirmation ? "none" : "auto" }}
      >
        Submit
      </button>

      <button
        onClick={goToDashboard}
        style={{ ...styles.dashboardButton, pointerEvents: showConfirmation ? "none" : "auto" }}
      >
        Go to Dashboard
      </button>

      {showConfirmation && (
        <>
          <div style={styles.blurOverlay}></div>
          <div style={styles.confirmationPopup}>
            <p style={styles.popupText}>
              File already exists. Are you sure you want to replace this file?
            </p>
            <button onClick={handleConfirmUpload} style={styles.confirmButton}>
              Yes
            </button>
            <button
              onClick={() => setShowConfirmation(false)}
              style={styles.cancelButton}
            >
              No
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    color: "#ffffff",
    backgroundImage: "url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjCwCwNEP1mwZ6jJpB4-SRkA3e0YlfLQT9oHSGHICwiSFcEYbAmT6YOspXH2B1qb0A4ssLTnLfL7vLFY4wQgkvwc2q1NIqD10r7zkTYMrXisMVnTKNm7CF-Wkpw38vpgxqML9XDHS2paBGVwNdIEacrfIvmND8zF3Vz7Fzju7AhdFOREo_Gtp42_qhxidk/w1684-h1069-p-k-no-nu/Leonardo_Lightning_XL_Create_a_futuristic_VR_image_with_a_glow_1.jpg')", // Add your background image URL here
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Roboto', sans-serif",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.6)", // Shadow effect for the container
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "15px",
    color: "#00aaff",
    animation: "glow 2s infinite alternate",
  },
  introText: {
    fontSize: "1.1rem",
    marginBottom: "25px",
    maxWidth: "600px",
    lineHeight: "1.6",
    color: "#bbdefb",
  },
  popupText: {
    fontSize: "1.3rem",
    marginBottom: "25px",
    maxWidth: "600px",
    lineHeight: "1.6",
    color: "rgb(0 66 120)",
  },
  instructionText: {
    fontSize: "1.2rem",
    color: "#ffffff",
    marginBottom: "15px",
  },
  dropzone: {
    border: "3px dashed #00aaff",
    borderRadius: "10px",
    width: "300px",
    height: "150px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    transition: "transform 0.3s ease-in-out",
    position: "relative",
    color: "#ffffff",
    background: "rgba(0, 31, 63, 0.7)",
    animation: "pulse 2s infinite ease-in-out",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)", // Shadow effect for the dropzone
  },
  dropzoneActive: {
    transform: "scale(1.05)",
    borderColor: "#ffffff",
  },
  dropzoneText: {
    fontSize: "1.2rem",
    color: "#00aaff",
    textAlign: "center",
  },
  fileInput: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0,
    cursor: "pointer",
  },
  inputField: {
    width: "280px",
    padding: "10px",
    fontSize: "1rem",
    marginBottom: "20px",
    border: "1px solid #00aaff",
    borderRadius: "5px",
    outline: "none",
    color: "#001f3f",
  },
  submitButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#001f3f",
    backgroundColor: "#00aaff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s ease",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  dashboardButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "25px",
    background: "rgba(0, 0, 0, 0.6)",
    border: "solid",
    fontSize: "20px",
    cursor: "pointer",
    transition: "transform 0.3s, background-color 0.3s",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    animation: "pulse 2s infinite",
  },
  blurOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(5px)",
    zIndex: 999,
  },
  confirmationPopup: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    textAlign: "center",
    zIndex: 1000,
  },
  confirmButton: {
    margin: "10px",
    padding: "10px 20px",
    backgroundColor: "#00aaff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cancelButton: {
    margin: "10px",
    padding: "10px 20px",
    backgroundColor: "#ccc",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

const cssAnimations = `
@keyframes glow {
  from {
    color: #00aaff;
  }
  to {
    color: #ffffff;
  }
}
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    border-color: #00aaff;
  }
  50% {
    transform: scale(1.1);
    border-color: #ffffff;
  }
}
@keyframes bounce {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-5px);
  }
}
`;

document.head.insertAdjacentHTML(
  "beforeend",
  `<style>${cssAnimations}</style>`
);

export default LandingPage;
