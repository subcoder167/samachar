import React,{useState,useCallback,useEffect} from 'react'
import Select from 'react-select'
import CreatableSelect from "react-select/creatable";
import Dropzone from '../dragndrop/Dropzone';

import "./uploadForm.css"
const UploadForm = () => {
    const [file, setFile] = useState([]);
    const [demographic, setDemographic] = useState(null);
    const [language, setLanguage] = useState(null);
    const [genres, setGenres] = useState([]);
    const [comment, setComment] = useState(null);
   

    const onDrop = useCallback((acceptedFiles) => {
      acceptedFiles.map((file) => {
        const reader = new FileReader();
        reader.onload = function (e) {
          setFile((prevState) => [
            ...prevState,
            { file: e.target.result },
          ]);
        };
        reader.readAsDataURL(file);
        return file;
      });
    }, []);
   

        const demographicOptions = [
        { value: "jack", label: "Jack"},
        { value: "john", label: "John"},
        { value: "mike", label: "Mike"},
      ];
      const languageOptions = [
        { value: "jack", label: "Jack"},
        { value: "john", label: "John"},
        { value: "mike", label: "Mike"},
      ];  
      const genreOptions = [
        { value: "jack", label: "Jack"},
        { value: "john", label: "John"},
        { value: "mike", label: "Mike"},
      ];  


      const colorStyles = {
        control: (styles) => ({ ...styles, backgroundColor: "white" }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
          return { ...styles, color: data.color,width:'auto' };
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
     



      const handleIGenreChange = (inputValue) => {
        // console.log("handleIGenreChange is array", if(Array.isArray(inputValue)));
        // if(Array.isArray(inputValue))
        // {
        //     setGenres(inputValue?.map((input) => {console.log(input.value)}))
        // }
        
       
      };
      const handleDemographicChange = (inputValue) => {
        console.log("handleDemographicChange", inputValue);
      };
      const handleLanguageChange = (inputValue) => {
        console.log("handleLanguageChange", inputValue);
      };
      const handleCommentChange = (inputValue) => {
        console.log("handleCommentChange", inputValue);
      };

      useEffect(() => {
        console.log("Genre", genres);
        
      }, [genres])
      

    const handleUpload = (e) => {
        e.preventDefault()
        var formData= new FormData(e.target);
        console.log(formData.get('genres'))
    }
    return (
      <section>
        <h2 style={{fontWeight:'bold',textAlign:'center', margin:'30px 0'}}>Upload your story</h2>
        <Dropzone onDrop={onDrop} accept={".pdf"} />
        
        <form onSubmit={(e)=>handleUpload(e)} className="uploadForm">
            <div className="uploadFormRow">
                <div className="uploadFormDiv col-md-5">
                    <label className="profileFormInputLabel">Demographic</label>
                    <CreatableSelect       
                    options={demographicOptions}    
                    onChange={handleDemographicChange}
                    onInputChange={handleDemographicChange}
                    styles={colorStyles}
                    className="uploadFormInput"
                    placeholder="Select Demographic"
                    name='demographic'
                    backspaceRemovesValue
                    />
                </div>

                <div className="uploadFormDiv col-md-5">
                    <label className="profileFormInputLabel">Language</label>
                    <CreatableSelect   
                    options={languageOptions}             
                    onChange={handleLanguageChange}
                    onInputChange={handleLanguageChange}
                    styles={colorStyles}
                    className="uploadFormInput"
                    placeholder="Select Language"
                    name='language'
                    backspaceRemovesValue
                    />
                </div>
            </div>
            <div className="uploadFormRow">
                <div className="uploadFormDiv col-md-12">
                <label className="profileFormInputLabel">Genre</label>
                <CreatableSelect
                options={genreOptions}
                onChange={handleIGenreChange}
                onInputChange={handleIGenreChange}
                isMulti
                styles={colorStyles}
                className="uploadFormInput"
                placeholder="Add a genre"
                name="genres"
                />
                </div>
            </div>
            <div className="uploadFormRow">
                <div className="uploadFormDiv col-md-12">
                <label className="profileFormInputLabel">Comment</label>
                <CreatableSelect               
                onChange={handleCommentChange}
                onInputChange={handleCommentChange}
                styles={colorStyles}
                className="uploadFormInput"
                placeholder="Add a comment"
                name="comment"
                backspaceRemovesValue
                />
             
                </div>
            </div>
            <div className="uploadFormRow">
                <button className="btn btn-dark">Submit</button>
            </div>
        </form>
      </section>
    );
}

export default UploadForm