import React, { useState, useEffect, useRef } from "react";
import { Table, Pagination, Radio, Divider, Tag } from "antd";
import { RiFilter2Fill, RiSearchLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import moment from "moment";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

import FilePreview from "./FilePreview";
import { fetchStory } from "../../redux/actions/story";
import { generateArray } from "../../functions";
import "./Story.css";
const Story = () => {
  const [trial, setTrial] = useState(false);
  const [fileIndex, setFileIndex] = useState(null);
  const [select, setSelect] = useState({
    selectedRowKeys: [],
    loading: false,
  });
  const [msg, setMsg] = useState("");
  const [data, setData] = useState([]);

  const state = useSelector((state) => state.story);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      width: "10px",
      // render: (text,record) =>{text.map((genre)=><span className="genrePill">genre</span>)}
      render: (text, record) => (
        <div className="tablePillWrapper">
          {generateArray(text)?.map((genre) => (
            <Tag className="tablePill" color="grey">
              {genre}
            </Tag>
          ))}
        </div>
      ),
      filters: [
        { value: "crime", text: "Crime" },
        { value: "comedy", text: "Comedy" },
        { value: "currentAffairs", text: "Current Affairs" },
        { value: "drama", text: "Drama" },
        { value: "sports", text: "Sports" },
        { value: "horror", text: "Horror" },
        { value: "mythology", text: "Mythology" },
        { value: "historical", text: "Historical" },
        { value: "other", text: "Other" },
      ],
      filterMode: "map",
      // filterSearch: true,
      onFilter: (value, record) => generateArray(record.genre)?.includes(value),
      filterIcon: () => <RiFilter2Fill size={16} />,
    },
    {
      title: "geography",
      dataIndex: "geography",
      key: "geography",
      width: "10px",
      filters: [
        {
          text: "Andaman and Nicobar Islands",
          value: "Andaman and Nicobar Islands",
        },
        { text: "Andhra Pradesh", value: "Andhra Pradesh" },
        { text: "Arunachal Pradesh", value: "Arunachal Pradesh" },
        { text: "Assam", value: "Assam" },
        { text: "Bihar", value: "Bihar" },
        { text: "Chandigarh", value: "Chandigarh" },
        { text: "Chhattisgarh", value: "Chhattisgarh" },
        { text: "Dadra and Nagar Haveli", value: "Dadra and Nagar Haveli" },
        { text: "Daman and Diu", value: "Daman and Diu" },
        { text: "Delhi", value: "Delhi" },
        { text: "Goa", value: "Goa" },
        { text: "Gujarat", value: "Gujarat" },
        { text: "Haryana", value: "Haryana" },
        { text: "Himachal Pradesh", value: "Himachal Pradesh" },
        { text: "Jammu and Kashmir", value: "Jammu and Kashmir" },
        { text: "Jharkhand", value: "Jharkhand" },
        { text: "Karnataka", value: "Karnataka" },
        { text: "Kerala", value: "Kerala" },
        { text: "Lakshadweep", value: "Lakshadweep" },
        { text: "Madhya Pradesh", value: "Madhya Pradesh" },
        { text: "Maharashtra", value: "Maharashtra" },
        { text: "Manipur", value: "Manipur" },
        { text: "Meghalaya", value: "Meghalaya" },
        { text: "Mizoram", value: "Mizoram" },
        { text: "Nagaland", value: "Nagaland" },
        { text: "Odisha", value: "Odisha" },
        { text: "Puducherry", value: "Puducherry" },
        { text: "Punjab", value: "Punjab" },
        { text: "Rajasthan", value: "Rajasthan" },
        { text: "Sikkim", value: "Sikkim" },
        { text: "Tamil Nadu", value: "Tamil Nadu" },
        { text: "Telangana", value: "Telangana" },
        { text: "Tripura", value: "Tripura" },
        { text: "Uttar Pradesh", value: "Uttar Pradesh" },
        { text: "Uttarakhand", value: "Uttarakhand" },
        { text: "West Bengal", value: "West Bengal" },
      ],
      filterMode: "map",
      // filterSearch: true,
      onFilter: (value, record) => record.geography?.includes(value),
      filterIcon: () => <RiFilter2Fill size={16} />,
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      width: "10px",
    },
    {
      title: "Name",
      dataIndex: "uploaded_by_id",
      key: "uploaded_by_id",
      width: "10px",
    },

    {
      title: "Uploaded",
      dataIndex: "uploaded_at",
      key: "uploaded_at",
      width: "10px",
      render: (text, record) => <span>{moment(text).format("ll")}</span>,
      sorter: (a, b) => new Date(a.uploaded_at) - new Date(b.uploaded_at),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10px",
      // render: (text,record) =>{text.map((genre)=><span className="tablePill">genre</span>)}
      render: (text, record) => <span className={`tablePill `}>{text}</span>,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      width: "10px",
      // render: (text,record) =>{text.map((genre)=><span className="tablePill">genre</span>)}
      render: (text, record) => (
        <input
          type="checkbox"
          name="priority"
          value={!record.priority ? false : true}
        />
      ),
    },
  ];

  useEffect(() => {
    if (state?.stories && state?.stories.length == 0) dispatch(fetchStory());
  }, []);

  useEffect(() => {
    console.log(state);
    setTrial(state.trial);
    setMsg(state.message);
    setData(state.stories);
  }, [state]);

  const preview = useRef();

  const openPreview = (index) => {
    setFileIndex(index);
    preview.current.classList.add("open");
  };

  const closePreview = () => {
    preview.current.classList.remove("open");
  };

  const handleSearchChange = (e) => {
    var value = e.target.value.toLowerCase();
    var searchArray = state?.stories?.filter(
      (item) =>
        item?.first_name?.includes(value) ||
        item?.last_name?.includes(value) ||
        item?.geography?.includes(value) ||
        generateArray(item?.genre)?.includes(value) ||
        item?.language?.includes(value)
    );
    if (searchArray.length > 0) {
      setData(searchArray);
    }
    //   else if(searchArray.length==0)
    //   {
    //     setData([])
    //   }
    console.log(searchArray);
  };
  return (
    <div>
      <div className="pageTitle">All Stories</div>
      <div className="dashboardSearchWrapper">
        <form className="searchForm col-md-8">
          <button type="submit">
            <RiSearchLine />
          </button>
          <input
            type="text"
            placeholder="Search for names, emails, numbers"
            onChange={(e) => handleSearchChange(e)}
          />
        </form>
      </div>
      <div className="dashboardTableWrapper">
        {trial ? (
          <div className="loader">
            <Spinner animation="grow" variant="dark" size="lg" />
          </div>
        ) : (
          <div className="tableWrapper">
            <Divider />

            <Table
              columns={columns}
              dataSource={data}
              scroll={{
                x: 1500,
              }}
              pagination={{ pageSize: 8 }}
              sticky
              rowClassName={(record) =>
                (record.status == "refused" || record.status == "verified") &&
                "disabled-row"
              }
              onRow={(record, rowIndex) => {
                return {
                  onClick: () => {
                    openPreview(rowIndex);
                  },
                };
              }}
            />

            {/* <Pagination defaultCurrent={1} total={data.length} style={{marginTop:30}} /> */}
          </div>
        )}
      </div>
      <div className="filePreviewWrapper" ref={preview}>
        <FilePreview closePreview={closePreview} index={fileIndex} />
      </div>
    </div>
  );
};

export default Story;
