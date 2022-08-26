//*Dropzone.js*//

import React,{useState,useEffect} from "react";
import { useDropzone } from "react-dropzone";
import {MdDelete} from 'react-icons/md'
import './dropzone.css'
import pdf from '../../assets/images/pdf.png'
import { removeItemOnce } from "../../functions";
function Dropzone({ onDrop, accept, open }) {
    const [filesCount, setFilesCount] = useState(0);
   

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept: {
        'application/pdf': ['.pdf'],
        
      },
      onDrop,
    },
    );

  const files = acceptedFiles.map((file,index) => (
    <div className="fileItemWrapper" key={file.path}>
        <img src={pdf} alt="" />
    <div className="fileItem">
      {file.path} -<span className="fileSize"> {(Math.log2(file.size)/10).toFixed(2)} {['Bytes','Kb','Mb','Gb','Tb'][Math.floor(Math.log2(file.size)/10)]}</span>
      {/* <div id="deleteIcon" 
      onClick={
        (e)=>{
          e.target.parentElement.parentElement.parentElement.parentElement.innerHTML=""
          // removeItemOnce(acceptedFiles,index)

        }
      }
        ><MdDelete/></div> */}
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
        <input className="input-zone" {...getInputProps()} accept="image/png"/>
        <div className="text-center">
          {isDragActive ? (
            <p className="dropzone-content">
              Drop it like it's hot!
            </p>
          ) : (
            <p className="dropzone-content">
              Drag’ n’ drop some files here, or click to select files
              {acceptedFiles.length>0?<span id="acceptFileSpan">To replace current file, click here</span>:<></>}
            </p>
          
          )}
          {/* <button onClick={open} className="btn btn-dark">
            Click to select files
          </button> */}
        </div>
      </div>
      
      <div className="fileItemWrapperMain">
        {files}
      </div>
    </div>
  );
}

export default Dropzone;