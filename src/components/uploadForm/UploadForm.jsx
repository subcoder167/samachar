import React,{useState,useCallback,useEffect, useRef} from 'react'
import { useSelector,useDispatch } from 'react-redux/es/exports';
import Select from 'react-select'
import CreatableSelect from "react-select/creatable";
import Spinner from 'react-bootstrap/Spinner'


import Dropzone from '../dragndrop/Dropzone';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./uploadForm.css"
import { uploadStory } from '../../redux/actions/story';
import { stringifyData } from '../../functions';
const UploadForm = () => {
    const [file, setFile] = useState([]);
    const [trial, setTrial] = useState(false);
    const [Msg, setMsg] = useState('');
    const [language, setLanguage] = useState(null);
    const [genres, setGenres] = useState([]);
    const [comment, setComment] = useState(null);

    const state= useSelector(state=>state.story)
    const dispatch= useDispatch()

    const uploadForm= useRef()
    useEffect(() => {
      setTrial(state.trial)
      setMsg(state.message)
      console.log(state)
    }, [state]);


      const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.map((file) => {
          const reader = new FileReader();
          reader.onload = function (e) {
          //  console.log(e.target.result)
            setFile(() => [             
              { file: e.target.result },
            ]);
          };
          reader.readAsDataURL(file);
          return file;
        });
      }, []);
    

       
      const genreOptions = [
        { value: "crime", label: "Crime"},
        { value: "thriller", label: "Thriller"},
        { value: "currentAffairs", label: "Current Affairs"},
      ];  


      const colorStyles = {
        container:(styles)=>({...styles,margin:0, padding:0}),
        control: (styles) => ({ ...styles, backgroundColor: "white",minHeight:"50px", border:"2px solid #e5e5e5"}),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
          return { ...styles, color: data.color,width:'100%',padding:0 };
        },
        multiValue: (styles, { data }) => {
          return {
            ...styles,
            backgroundColor: '#6e6e6e',
            color: "#fff",
          };
        },
        multiValueLabel: (styles, { data }) => {
          return {
            ...styles,
            color: "#fff",
          };
        },
        multiValueRemove: (styles, { data }) => {
          return {
            ...styles,
            color: "#fff",
            cursor: "pointer",
            ":hover": {
              color: "#fff",
            },
          };
        },
      };
     



      const handleIGenreChange = (newValue) => {
        
       if(Array.isArray(newValue))
       setGenres(newValue?.map((input) => input.value))
        //  setGenres(newValue.map((item) => item.value));
        
       
      };
     

  
      

    const handleUpload = (e) => {
        e.preventDefault()
        var formData= new FormData(e.target);
        formData.append("file",file)
        formData.append("genre",JSON.stringify(genres))
        // console.log(stringifyData(formData))
        dispatch(uploadStory(formData))
    }
    
    useEffect(() => {
      if(state.uploaded)
      {
        uploadForm.current.reset()
      }
      
    }, [state]);


    return (
      <section>
        <h2 style={{fontWeight:'bold',textAlign:'center', margin:'30px 0'}}>Upload your story</h2>
        <Dropzone onDrop={onDrop}  accept="application/pdf"/>
        
        <form onSubmit={(e)=>handleUpload(e)} className="uploadForm" ref={uploadForm}>
            <div className="form-row my-2">
                <div className="form-group col-md-4">
                <label for="Geography">Geography</label>
                <input type="text" className="form-control" id="Geography" name='geography' placeholder="Enter Geography" required/>
                </div>

                <div className="form-group col-md-4">
                <label for="Language">Language</label>
                <input type="text" className="form-control" id="Language" name="language" placeholder="Enter Language" required/>
                </div>
            </div>

            <div className="form-group my-2">
                <label for="Genre">Genre</label>
                <Select
                options={genreOptions}
                onChange={handleIGenreChange}
                onInputChange={handleIGenreChange}
                isMulti
                styles={colorStyles}
                className="uploadFormInput"
                placeholder="Add a genre"
                id="genreSelect"
                required
                />
            </div>

            <div className="form-group my-2">
                <label for="Comment">Comment</label>
                <input type="text" className="form-control" id="Comment" name="comment" placeholder="Enter Comment" required/>
            </div>
           
            <button
             type="submit"
             className="btn btn-primary"
            //  disabled={trial?true:false}
             >
              {trial?<Spinner animation="border" variant="light"  />:"Upload Story"}
              </button>
        </form>
        <div className="errorMessage">{Msg}</div>
      </section>
    );
}

export default UploadForm