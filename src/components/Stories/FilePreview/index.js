import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { generateArray } from "../../../functions";
import { fetchStory } from "../../../redux/actions/story";

import "./filePreview.css";
const FilePreview = (props) => {
  const [file, setFile] = useState();
  const [storyState, setStoryState] = useState();
  const dispatch = useDispatch();
  const story = useSelector((state) => state?.story?.stories);

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

  if (!story || story.length == 0) {
    dispatch(fetchStory());
  }
  useEffect(() => {
    setFile(`http://147.182.236.95:8000/media/${story[props?.index]?.file}`);
    setStoryState(story[props?.index]);
  }, [props]);
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
          <div className="metaData">
            <p>
              <strong>Title:</strong> &nbsp;
              <input className="mdInput" defaultValue={story[props?.index]?.file?.split("scout_files/")[1]} />
            </p>
            <p>
              <strong>Language:</strong> &nbsp;
              <input className="mdInput" defaultValue={story[props?.index]?.language?.toUpperCase()} />
            </p>

            <p>
              <strong>Genre:</strong> &nbsp;
              <input className="mdInput" defaultValue={generateArray(story[props?.index]?.genre).map((genre) => (
                <>{genre} &nbsp;</>
              ))} />
            </p>
            <p>
              <strong>Geography:</strong> &nbsp;
              
              <input className="mdInput" defaultValue={story[props?.index]?.geography?.toUpperCase()} />
            </p>
            <p>
              <strong>Uploaded By:</strong> &nbsp;
              {story[props?.index]?.uploaded_by_id}
            </p>
            <p>
              <strong>Uploaded At:</strong> &nbsp;
              <input className="mdInput" defaultValue={story[props?.index]?.uploaded_at} />
            </p>
            <p>
            <strong>Comments:</strong>
            </p>
          </div>
          <div className="commentSectionWrapper">
            
            <div className="commentSection ">
              {comments.map((comment) => (
                <div className="commentWrapper">
                  <div className="commenterProf">
                    <div className="usrName">{comment.name}</div>
                    <div className="usrDetails">{comment.post}</div>
                  </div>
                  <div className="commentText">{comment.comment}</div>
                </div>
              ))}
            </div>
            <form className="addCommentForm">
              <input className="commentInput" type="text" placeholder="Share your thoughts" />
              <button type="submit">Send</button>
            </form>
          </div>
          <div className="buttons">
            <p>Save</p>
            <p>Accept</p>
            <p>Reject</p>
            <p onClick={props?.closePreview}>Go Back</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
