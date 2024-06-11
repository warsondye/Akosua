import React, { useState } from 'react';
import './documentUpload.css';

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files).slice(0, 30);
    setSelectedFiles(files);

    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      const formData = new FormData();
      selectedFiles.forEach(file => {
        formData.append('files', file);
      });

      // Replace '/upload' with your server endpoint
      fetch('/upload', {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          // Handle response
          console.log('Files uploaded successfully:', response);
          previewUrls.forEach(url => URL.revokeObjectURL(url)); // Clean up the URL objects
        })
        .catch(error => {
          // Handle error
          console.error('Error uploading files:', error);
        });
    } else {
      alert('Please select files to upload');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="file-upload-container">
      <label className="file-upload-label">
        <span className="upload-icon">📁</span>
        <span className="upload-text">Choose Files</span>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt,.rtf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="file-upload-input"
          multiple
        />
      </label>
      {selectedFiles.length > 0 && (
        <div className="selected-files">
          {previewUrls.map((url, index) => (
            <div key={index} className="file-item">
              <img src={url} alt="Preview" className="file-preview" />
              <div className="file-info">
                <span className="file-name">{selectedFiles[index].name}</span>
                <span className="file-size">{(selectedFiles[index].size / 1024).toFixed(2)} KB</span>
              </div>
            </div>
          ))}
        </div>
      )}
      <button onClick={handleUpload} className="upload-button">Upload</button>
      <button onClick={handlePrint} className="print-button">Print</button>
    </div>
  );
};

export default FileUpload;
