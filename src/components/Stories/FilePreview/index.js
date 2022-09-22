import React, { useEffect, useRef, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import {
  generateArray,
  generateFormData,
  generateObject,
  getCookie,
} from "../../../functions";
import { fetchStory, uploadStory } from "../../../redux/actions/story";

import "./filePreview.css";
import moment from "moment/moment";
const FilePreview = (props) => {
  const [file, setFile] = useState();
  const [storyState, setStoryState] = useState();
  const dispatch = useDispatch();
  const story = useSelector((state) => state?.story?.stories);
  const [genres, setGenres] = useState([
    {
      label: story[props?.index].genre.split(",")[0],
      value: story[props?.index].genre.split(",")[0],
    },
    story[props?.index].genre.split(",")[1]
      ? {
          label: story[props?.index].genre.split(",")[1],
          value: story[props?.index].genre.split(",")[1],
        }
      : null,
  ]);
  const [geography, setGeography] = useState({
    label: story[props?.index]?.geography,
    value: story[props?.index]?.geography,
  });
  const [language, setLanguage] = useState({
    label: story[props?.index]?.language,
    value: story[props?.index]?.language,
  });
  const [priority, setPriority] = useState({
    label: story[props?.index]?.priority === 0 ? "False" : "True",
    value: story[props?.index]?.priority,
  });
  const [comment, setComment] = useState(null);
  const [oldComment, setOldComment] = useState(null);

  const previewForm = useRef();
  const colorStyles = {
    container: (styles) => ({ ...styles, margin: 0, padding: 0 }),
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      minHeight: "50px",
      border: "2px solid #e5e5e5",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return { ...styles, color: data.color, width: "100%", padding: 0 };
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

  const comments = [
    {
      name: "John Doe",
      post: "Writer",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      name: "Jane Doe",
      post: "Writer",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      name: "Marc Spector",
      post: "Moon Knight",
      comment:
        "Every day I wake up, then I start to break up, Lonely is a man without love, Every day I start out, then I cry my heart out, Lonely is a man without love",
    },
    {
      name: "Bruce Wayne",
      post: "Batman",
      comment: "It's not who I am underneath, but what I do that defines me.",
    },
    {
      name: "John Doe",
      post: "Writer",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      name: "Jane Doe",
      post: "Writer",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      name: "Marc Spector",
      post: "Moon Knight",
      comment:
        "Every day I wake up, then I start to break up, Lonely is a man without love, Every day I start out, then I cry my heart out, Lonely is a man without love",
    },
    {
      name: "Bruce Wayne",
      post: "Batman",
      comment: "It's not who I am underneath, but what I do that defines me.",
    },
  ];

  // const handlePriority = (record) => {
  //   delete record.file;
  //   dispatch(uploadStory(record));
  // };

  useEffect(() => {
    setFile(`http://147.182.236.95:8000/media/${story[props?.index]?.file}`);
    setStoryState(story[props?.index]);
    setOldComment(story[props?.index]?.writer_comments);
    generateComments();
  }, [props]);

  const commentDiv = (id, timestamp, comment) => {
    return (
      <div>
        <p>{id}</p>
        <p>{timestamp}</p>
        <p>{comment}</p>
      </div>
    );
  };
  const generateComments = () => {
    if (oldComment?.id?.length > 0)
      for (let i = 0; i < oldComment?.id?.length; i++) {
        oldComment.id.map((e) => console.log(e));
      }
  };

  const handleSubmit = (state) => {
    if ((!comment || comment == "") && state != getCookie("currentStatus")) {
      alert("Write a comment");
      return;
    }
    var temp_record = JSON.parse(JSON.stringify(story[props?.index]));

    var formData = new FormData(previewForm.current);
    var uploadData = new FormData();

    delete temp_record.file;

    // setters
    temp_record.title = formData.get("title");
    temp_record.language = formData.get("language");
    temp_record.genre = genres?.map((genre) => genre?.value).toString();
    temp_record.geography = geography?.value;
    temp_record.status = state;
    temp_record.priority = priority.value ? 1 : 0;
    // uploadData.append("id", temp_record.id);
    // uploadData.append("title", formData.get("title"));
    // uploadData.append("language", formData.get("language"));
    // uploadData.append("genre", genres?.map((genre) => genre?.value).toString());
    // uploadData.append("geography", geography?.value);
    // uploadData.append("status", state);
    // uploadData.append("priority", priority.value ? 1 : 0);

    if (temp_record.writer_comments == {}) {
      temp_record.writer_comments = [
        {
          name:
            localStorage.getItem("first_name") +
            localStorage.getItem("last_name"),
          timestamp: Date.now(),
          comment: comment,
        },
      ];
    } else
      temp_record.writer_comments = Array(temp_record?.writer_comments)?.concat(
        {
          name:
            localStorage.getItem("first_name") +
            localStorage.getItem("last_name"),
          timestamp: Date.now(),
          comment: comment,
        }
      );

    uploadData.append("writer_comments", temp_record.writer_comments);
    console.log(temp_record);
    dispatch(uploadStory(JSON.stringify(temp_record)));
    document.getElementById("writerCommentInput").value = "";

    // [
    // ...temp_record.writer_comments,

    // ];
    console.log(temp_record);
  };
  const handleReturn = () => {
    var temp_record = JSON.parse(JSON.stringify(story[props?.index]));

    delete temp_record.file;

    // setters
    temp_record.status = getCookie("currentStatus");

    console.log(temp_record);
    dispatch(uploadStory(JSON.stringify(temp_record)));
  };

  useEffect(() => {
    console.log(comment);
  }, [comment]);
  return (
    <div className="previewWrapper">
      {/* <div className="previewTop">
        <div className="filePreviewcloseBtn" onClick={props?.closePreview}>
          <BsArrowLeft color="#fff" size={20} />
        </div>
        <div className="fileName">
          {story[props?.index]?.file?.split("scout_files/")[1]}
        </div>
      </div> */}
      <div className="previewSection">
        <div className="filePreview col-md-8">
          <iframe
            src={file}
            alt="file"
            className="fileFrame"
            title={JSON.stringify(file)}
          />
        </div>
        <div className="previewComments col-md-4">
          <form
            className="previewForm"
            onSubmit={(e) => e.preventDefault()}
            ref={previewForm}
          >
            <div className="metaData">
              <p>
                <strong>Title:</strong> &nbsp;
                <input
                  className="mdInput"
                  defaultValue={story[props?.index]?.title}
                  placeholder="Enter a title"
                  name="title"
                />
              </p>
              <p>
                <strong>Language:</strong> &nbsp;
                <Select
                  options={languageOptions}
                  onChange={(e) => setLanguage(e)}
                  name="language"
                  value={language}
                  styles={colorStyles}
                  className="uploadFormInput"
                  placeholder="Add language"
                  id="languageSelect"
                  required
                />
              </p>

              <p>
                <strong>Genre:</strong> &nbsp;
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
              </p>
              <p>
                <strong>Geography:</strong> &nbsp;
                <Select
                  options={geographyOptions}
                  name="geography"
                  value={geography}
                  styles={colorStyles}
                  onChange={(e) => setGeography(e)}
                  className="uploadFormInput"
                  placeholder="Add a location"
                  id="geographySelect"
                  required
                />
              </p>
              <p>
                <strong>Priority:</strong> &nbsp;
                <Select
                  options={[
                    { label: "False", value: 0 },
                    { label: "True", value: 1 },
                  ]}
                  name="priority"
                  value={priority}
                  styles={colorStyles}
                  onChange={(e) => setPriority(e)}
                  className="uploadFormInput"
                  placeholder="Select Priority"
                  id="prioritySelect"
                  required
                />
              </p>
              <p>
                <strong>Scout Comment:</strong> &nbsp;
                {story[props?.index]?.scout_comment}
              </p>
              <p>
                <strong>Uploaded By:</strong> &nbsp;
                {story[props?.index]?.name}
              </p>
              <p>
                <strong>Uploaded At:</strong> &nbsp;
                {/* <input
                  className="mdInput"
                  defaultValue={story[props?.index]?.uploaded_at}
                /> */}
                {story[props?.index]?.uploaded_at}
              </p>
              <p>
                <strong>Comments:</strong>
              </p>
            </div>
            <div className="commentSectionWrapper">
              <div className="commentSection ">
                {/* {JSON.stringify(story[props?.index]?.writer_comments)} */}
                {story[props?.index]?.writer_comments == {}
                  ? "Nothing to show here"
                  : story[props?.index]?.writer_comments?.map((comment) => (
                      <div className="commentWrapper">
                        <div className="commenterProf">
                          <div className="name">{comment?.name}</div>
                          <div className="nole">
                            {moment(comment?.timestamp).format("l")}
                          </div>
                        </div>
                        <div className="comment">{comment?.comment}</div>
                      </div>
                    ))}
              </div>

              <input
                className="commentInput"
                type="text"
                placeholder="Write a comment"
                id="writerCommentInput"
                onKeyUp={(e) => setComment(e.target.value)}
                onChange={(e) => setComment(e.target.value)}
                name="writerComment"
                required
              />
            </div>

            <div className="buttons">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit("Reviewed");
                  props?.closePreview();
                }}
              >
                Save
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit("Accepted");
                  props?.closePreview();
                }}
              >
                Accept
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit("Rejected");
                  props?.closePreview();
                }}
              >
                Reject
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleReturn();
                  props?.closePreview();
                }}
              >
                Go Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
