//*Dropzone.js*//

import React,{useState,useEffect} from "react";
import { useDropzone } from "react-dropzone";
import './dropzone.css'
import pdf from '../../assets/images/pdf.png'
function Dropzone({ onDrop, accept, open }) {
    const [filesCount, setFilesCount] = useState(0);
   

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept,
      onDrop,
    });

  const files = acceptedFiles.map((file) => (
    <div className="fileItem" key={file.path}>
        <img src={pdf} alt="" />
    <div>
      {file.path} -<span className="fileSize"> {(Math.log2(file.size)/10).toFixed(2)} {['Bytes','Kb','Mb','Gb','Tb'][Math.floor(Math.log2(file.size)/10)]}</span>
    </div>
    </div>

  ));
 
  useEffect(() => {
    if(acceptedFiles.length > 0) {
        setFilesCount(acceptedFiles.length)
    }
    return () => {
        setFilesCount(0)
    };
}, [acceptedFiles]);
  return (
    <div>
      <div {...getRootProps({ className: "dropzone" })}>
        <input className="input-zone" {...getInputProps()} />
        <div className="text-center">
          {isDragActive ? (
            <p className="dropzone-content">
              Drop it like it's hot!
            </p>
          ) : (
            <p className="dropzone-content">
              Drag’ n’ drop some files here, or click to select files
            </p>
          
          )}
          <button onClick={open} className="btn btn-dark">
            Click to select files
          </button>
        </div>
      </div>
      
      <div className="fileItemWrapper">
        {files}
      </div>
    </div>
  );
}

export default Dropzone;