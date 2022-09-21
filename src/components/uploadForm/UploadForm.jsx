import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useDropzone } from "react-dropzone";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import Spinner from "react-bootstrap/Spinner";
import Dropzone from "../dragndrop/Dropzone";
import "bootstrap/dist/css/bootstrap.min.css";
import "./uploadForm.css";
import { uploadStory } from "../../redux/actions/story";
import { stringifyData } from "../../functions";
import pdf from "../../assets/images/pdf.png";
const UploadForm = () => {
  const [file, setFile] = useState();
  const [trial, setTrial] = useState(false);
  const [Msg, setMsg] = useState("");
  const [language, setLanguage] = useState(null);
  const [title, setTitle] = useState("");
  const [genres, setGenres] = useState([]);
  const [reference, setReference] = useState([]);
  const [comment, setComment] = useState(null);

  const state = useSelector((state) => state.story);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const uploadForm = useRef();

  const [filesCount, setFilesCount] = useState(0);

  const onDrop = () => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept: {
        "application/pdf": [".pdf"],
        "text/document": [".doc", ".docx"],
      },
      onDrop,
    });

  const files = acceptedFiles.map((file, index) => (
    <div className="fileItemWrapper" key={file.path}>
      <img src={pdf} alt="" />
      <div className="fileItem">
        {file.path} -
        <span className="fileSize">
          {" "}
          {(Math.log2(file.size) / 10).toFixed(2)}{" "}
          {
            ["Bytes", "Kb", "Mb", "Gb", "Tb"][
              Math.floor(Math.log2(file.size) / 10)
            ]
          }
        </span>
      </div>
    </div>
  ));

  useEffect(() => {
    setFile(acceptedFiles[0]);
    if (acceptedFiles.length > 0) {
      setFilesCount(acceptedFiles.length);
    }
    return () => {
      setFilesCount(0);
      setFile(null);
    };
  }, [acceptedFiles]);

  useEffect(() => {
    setTrial(state.trial);
    setMsg(state.message);
    console.log(state);
  }, [state]);

  const genreOptions = [
    { value: "crime", label: "Crime" },
    { value: "comedy", label: "Comedy" },
    { value: "currentAffairs", label: "Current Affairs" },
    { value: "drama", label: "Drama" },
    { value: "sports", label: "Sports" },
    { value: "horror", label: "Horror" },
    { value: "mythology", label: "Mythology" },
    { value: "historical", label: "Historical" },
    { value: "other", label: "Other" },
  ];
  const languageOptions = [
    { value: "english", label: "English" },
    { value: "hindi", label: "Hindi" },
    { value: "bengali", label: "Bengali" },
    { value: "malayalam", label: "Malayalam" },
    { value: "tamil", label: "Tamil" },
    { value: "gujarati", label: "Gujarati" },
  ];

  const geographyOptions = [
    {
      label: "Andaman and Nicobar Islands",
      value: "Andaman and Nicobar Islands",
    },
    { label: "Andhra Pradesh", value: "Andhra Pradesh" },
    { label: "Arunachal Pradesh", value: "Arunachal Pradesh" },
    { label: "Assam", value: "Assam" },
    { label: "Bihar", value: "Bihar" },
    { label: "Chandigarh", value: "Chandigarh" },
    { label: "Chhattisgarh", value: "Chhattisgarh" },
    { label: "Dadra and Nagar Haveli", value: "Dadra and Nagar Haveli" },
    { label: "Daman and Diu", value: "Daman and Diu" },
    { label: "Delhi", value: "Delhi" },
    { label: "Goa", value: "Goa" },
    { label: "Gujarat", value: "Gujarat" },
    { label: "Haryana", value: "Haryana" },
    { label: "Himachal Pradesh", value: "Himachal Pradesh" },
    { label: "Jammu and Kashmir", value: "Jammu and Kashmir" },
    { label: "Jharkhand", value: "Jharkhand" },
    { label: "Karnataka", value: "Karnataka" },
    { label: "Kerala", value: "Kerala" },
    { label: "Lakshadweep", value: "Lakshadweep" },
    { label: "Madhya Pradesh", value: "Madhya Pradesh" },
    { label: "Maharashtra", value: "Maharashtra" },
    { label: "Manipur", value: "Manipur" },
    { label: "Meghalaya", value: "Meghalaya" },
    { label: "Mizoram", value: "Mizoram" },
    { label: "Nagaland", value: "Nagaland" },
    { label: "Odisha", value: "Odisha" },
    { label: "Puducherry", value: "Puducherry" },
    { label: "Punjab", value: "Punjab" },
    { label: "Rajasthan", value: "Rajasthan" },
    { label: "Sikkim", value: "Sikkim" },
    { label: "Tamil Nadu", value: "Tamil Nadu" },
    { label: "Telangana", value: "Telangana" },
    { label: "Tripura", value: "Tripura" },
    { label: "Uttar Pradesh", value: "Uttar Pradesh" },
    { label: "Uttarakhand", value: "Uttarakhand" },
    { label: "West Bengal", value: "West Bengal" },
  ];

  const colorStyles = {
    container: (styles) => ({ ...styles, margin: 0, padding: 0 }),
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      minHeight: "50px",
      border: "2px solid #e5e5e5",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: data.color,
        width: "100%",
        padding: 5,
      };
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: "#6e6e6e",
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

  const handleGenreChange = (newValue) => {
    if (Array.isArray(newValue))
      setGenres(newValue?.map((input) => input.value));
    //  setGenres(newValue.map((item) => item.value));
    console.log(genres);
  };
  const handleReferenceChange = (newValue) => {
    if (Array.isArray(newValue))
      setReference(newValue?.map((input) => input.value));
    //  setGenres(newValue.map((item) => item.value));
    console.log(reference);
  };
  const handleTitleChange = (newValue) => {
    setGenres(title.value);
    //  setGenres(newValue.map((item) => item.value));
    console.log(title);
  };
  // const handleLanguageChange = (newValue) => {

  //   // if(Array.isArray(newValue))
  //   setLanguage(newValue)
  //   // setGenres(newValue?.map((input) => input.value))
  //    //  setGenres(newValue.map((item) => item.value));

  //  };

  const handleUpload = (e) => {
    e.preventDefault();

    var formData = new FormData(e.target);
    formData.append("file", file);
    formData.append(
      "genre",
      genres.map((genre) => genre.value)
    );
    // formData.append("referrence_fields",`${reference}`);
    if (
      localStorage.getItem("first_name") &&
      localStorage.getItem("last_name")
    ) {
      formData.append(
        "uploaded_by",

        localStorage.getItem("username")
      );
      formData.append(
        "name",
        localStorage.getItem("first_name") + localStorage.getItem("last_name")
      );
      // console.log(stringifyData(formData));

      dispatch(uploadStory(formData));
    }
  };

  useEffect(() => {
    if (state.uploaded) {
      uploadForm.current.reset();
    }
  }, [state]);

  return (
    <section>
      <h2 style={{ fontWeight: "bold", textAlign: "center", margin: "30px 0" }}>
        Upload your story
      </h2>
      {/* <Dropzone onDrop={onDrop}  accept="application/pdf"/> */}
      <form
        onSubmit={(e) => handleUpload(e)}
        className="uploadForm"
        ref={uploadForm}
      >
        <div>
          <div {...getRootProps({ className: "dropzone" })}>
            <input
              className="input-zone"
              {...getInputProps()}
              accept="image/png"
              id="dropzoneInput"
            />
            <div className="text-center">
              {isDragActive ? (
                <p className="dropzone-content">Drop it like it's hot!</p>
              ) : (
                <p className="dropzone-content">
                  Drag’ n’ drop some files here, or click to select files
                  {acceptedFiles.length > 0 ? (
                    <span id="acceptFileSpan">
                      To replace current file, click here
                    </span>
                  ) : (
                    <></>
                  )}
                </p>
              )}
              {/* <button onClick={open} className="btn btn-dark">
            Click to select files
          </button> */}
            </div>
          </div>

          <div className="fileItemWrapperMain">{files}</div>
        </div>

        {/* <input type="file" name="file" accept='application/pdf' id="fileInput" /> */}
        <div className="form-row my-2">
          <div className="form-group col-md-4">
            <label for="Geography">Geography*</label>
            <Select
              options={geographyOptions}
              name="geography"
              styles={colorStyles}
              // className="uploadFormInput"
              placeholder="Select geography"
              id="gographySelect"
              required
            />
          </div>

          <div className="form-group col-md-4">
            <label for="Language">Language*</label>
            {/* <input type="text" className="form-control" id="Language" name="language" placeholder="Enter Language" required/> */}

            <CreatableSelect
              options={languageOptions}
              // onChange={handleLanguageChange}
              // onInputChange={handleLanguageChange}
              backspaceRemovesValue
              styles={colorStyles}
              name="language"
              // className="uploadFormInput"
              placeholder="Enter Language"
              id="languageSelect"
              required
            />
          </div>
        </div>

        <div className="form-group my-2">
          <label for="Title">Title</label>
          <input
            type="text"
            className="form-control"
            id="Title"
            name="title"
            placeholder="Enter title of the story..."
            required
          />
        </div>

        <div className="form-group my-2">
          <label for="Genre">Genre* (max. 2)</label>
          <Select
            options={genreOptions}
            onChange={(v) => (v.length < 3 ? setGenres(v) : null)}
            isMulti
            // name="genre"
            value={genres}
            styles={colorStyles}
            className="uploadFormInput"
            placeholder="Add a genre"
            id="genreSelect"
            required
          />
        </div>

        <div className="form-group my-2">
          <label for="References">References</label>
          <CreatableSelect
            // options={genreOptions}
            onChange={handleReferenceChange}
            onInputChange={handleReferenceChange}
            isMulti
            name="referrence_fields"
            styles={colorStyles}
            className="uploadFormInput"
            placeholder="Add references"
            id="referrence_fields"
          />
        </div>

        <div className="form-group my-2">
          <label for="Comment">Comment</label>
          <input
            type="text"
            className="form-control"
            id="Comment"
            name="scout_comment"
            placeholder="Enter Comment"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          //  disabled={trial?true:false}
        >
          {trial ? (
            <Spinner animation="border" variant="light" />
          ) : (
            "Upload Story"
          )}
        </button>
      </form>
      <div className="errorMessage">{Msg}</div>
    </section>
  );
};

export default UploadForm;
