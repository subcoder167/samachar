import React, { useEffect, useRef, useState } from "react";

import Select from "react-select";
import moment from "moment/moment";
import { useSelector, useDispatch } from "react-redux";
import { eraseCookie, getCookie } from "../../../functions";
import { uploadStory } from "../../../redux/actions/story";
import { Status } from "../../../constants/statusConstants";

import "./filePreview.css";
const FilePreview = (props) => {
  const [file, setFile] = useState();
  const [storyState, setStoryState] = useState();
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();
  const story = useSelector((state) => state?.story?.stories);
  const state = useSelector((state) => state?.story?.state);
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
    story[props?.index].genre.split(",")[2]
      ? {
          label: story[props?.index].genre.split(",")[2],
          value: story[props?.index].genre.split(",")[2],
        }
      : null,
    story[props?.index].genre.split(",")[3]
      ? {
          label: story[props?.index].genre.split(",")[3],
          value: story[props?.index].genre.split(",")[3],
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

  // const handlePriority = (record) => {
  //   delete record.file;
  //   dispatch(uploadStory(record));
  // };

  useEffect(() => {
    setFile(
      `https://docs.google.com/gview?url=https://sourrce.dojoapi.co.in/media/${
        story[props?.index]?.file
      }&embedded=true`
    );
    setStoryState(story[props?.index]);

    if (state === Status.accepted || state === Status.rejected)
      setDisable(true);
    else setDisable(false);
  }, [props]);

  const handleSubmit = (state) => {
    if ((!comment || comment == "") && state != state) {
      alert("Write a comment");
      return;
    }
    var temp_record = JSON.parse(JSON.stringify(story[props?.index]));

    var formData = new FormData(previewForm.current);

    delete temp_record.file;

    // setters
    temp_record.title = formData.get("title");
    temp_record.language = formData.get("language");
    temp_record.genre = genres?.map((genre) => genre?.value).toString();
    temp_record.geography = geography?.value;
    temp_record.status = state;

    if (state == "Accepted" || state == "Rejected") temp_record.priority = 0;
    else temp_record.priority = priority.value ? 1 : 0;
    if (JSON.stringify(temp_record.writer_comments) == "{}")
      temp_record.writer_comments = [
        {
          name:
            localStorage.getItem("first_name") +
            localStorage.getItem("last_name"),
          timestamp: Date.now(),
          comment: comment,
        },
      ];
    else
      temp_record.writer_comments = temp_record?.writer_comments?.concat({
        name:
          localStorage.getItem("first_name") +
          localStorage.getItem("last_name"),
        timestamp: Date.now(),
        comment: comment,
      });

    dispatch(uploadStory(JSON.stringify(temp_record)));
    document.getElementById("writerCommentInput").value = "";
    props?.closePreview();
  };
  const handleReturn = () => {
    var temp_record = JSON.parse(JSON.stringify(story[props?.index]));

    delete temp_record.file;

    // setters
    temp_record.status = state;

    console.log(temp_record.status);
    dispatch(uploadStory(JSON.stringify(temp_record)));
  };

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
                  onChange={(v) => (v.length < 5 ? setGenres(v) : null)}
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
                {JSON.stringify(story[props?.index]?.writer_comments) ===
                "{}" ? (
                  <>Nothing to show here</>
                ) : (
                  // <>Comments available</>
                  story[props?.index]?.writer_comments?.map((comment) => (
                    <div className="commentWrapper">
                      <div className="commenterProf">
                        <div className="name">
                          <strong>{comment?.name}</strong>
                        </div>
                        <div className="comment">{comment?.comment}</div>
                        <div className="timestamp">
                          <sup> {moment(comment?.timestamp).format("l")}</sup>
                        </div>
                      </div>
                    </div>
                  ))
                )}
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
                }}
                className={disable ? "disabled" : "false"}
                disabled={disable ? true : false}
              >
                Save
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit("Accepted");
                }}
                className={disable ? "disabled" : "false"}
                disabled={disable ? true : false}
              >
                Accept
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit("Rejected");
                }}
                className={disable ? "disabled" : "false"}
                disabled={disable ? true : false}
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
