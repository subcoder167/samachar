import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useSelector } from "react-redux";

import "./filePreview.css";
const FilePreview = (props) => {
  const [file, setFile] = useState();
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
  const story = useSelector((state) => state?.story?.stories);
  useEffect(() => {
    setFile(`http://147.182.236.95:8000/media/${story[props.index]?.file}`);
  }, [props]);
  return (
    <div className="previewWrapper">
      <div className="previewTop">
        <div className="filePreviewcloseBtn" onClick={props?.closePreview}>
          <BsArrowLeft color="#fff" size={20} />
        </div>
        <div className="fileName">
          {story[props?.index]?.file.split("scout_files/")[1]}
        </div>
      </div>
      <div className="previewSection">
        <div className="filePreview col-md-8">
          <iframe
            src="http://147.182.236.95:8000/media/scout_files/Ref_No._TIUWBExam_Cell-0160-2022_YXvQgIM.pdf"
            alt="file"
            className="fileFrame"
            target="_top"
          />
        </div>
        <div className="previewComments">
          <div className="commentSection col-md-3">
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
            <input type="text" placeholder="Share your thoughts" />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
