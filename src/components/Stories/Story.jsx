import React, { useState, useEffect, useRef } from "react";
import { Table, Pagination, Radio, Divider, Tag } from "antd";
import { RiFilter2Fill, RiSearchLine } from "react-icons/ri";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import moment from "moment";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

import FilePreview from "./FilePreview";
import { fetchStory, setState, uploadStory } from "../../redux/actions/story";
import { generateArray, setCookie } from "../../functions";
import { Status } from "../../constants/statusConstants";
import "./Story.css";
const Story = () => {
  const [trial, setTrial] = useState(false);
  const [fileIndex, setFileIndex] = useState(null);
  const [RowIndex, setRowIndex] = useState(null);
  const [PageSize, setPageSize] = useState(8);

  const [paginateStatus, setPaginateStatus] = useState({
    current: 1,
    pageSize: PageSize,
  });
  const [select, setSelect] = useState({
    selectedRowKeys: [],
    loading: false,
  });
  const [msg, setMsg] = useState("");
  const [data, setData] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const state = useSelector((state) => state.story);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      width: "4px",
      // render: (text,record) =>{text.map((genre)=><span className="tablePill">genre</span>)}
      render: (text, record) =>
        // <input
        //   className="prty"
        //   type="checkbox"
        //   name="priority"
        //   value={Boolean(record.priority)}
        //   disabled
        //   // onChange={() => {
        //   //   record?.priority === 0
        //   //     ? handlePriority(record, 1)
        //   //     : handlePriority(record, 0);
        //   // }}
        // />
        record.priority === 1 ? (
          <button className="btn btn-success" disabled>
            <TiTick />
          </button>
        ) : (
          <button className="btn btn-secondary" disabled>
            &times;
          </button>
        ),
      sorter: (a, b) => new Date(a.priority) - new Date(b.priority),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "10px",
      render: (text, record) => (
        <div
          onClick={() => handleSubmit(RowIndex)}
          style={{ cursor: "pointer" }}
        >
          {text
            ? text.length > 20
              ? text.slice(0, 20) + "..."
              : text
            : "empty title"}
        </div>
      ),
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      width: "15px",
      // render: (text,record) =>{text.map((genre)=><span className="genrePill">genre</span>)}
      render: (text, record) => (
        <div className="tablePillWrapper">
          {generateArray(text)?.map((genre) => (
            // if(genre! == "")
              <Tag className="tablePill" color="grey">
                {/* if(genre!= "") */}
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
      render: (text, record) => (
        <span className={`tablePill statusPill ` + text.replace(/\s/g, "")}>
          {text}
        </span>
      ),
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
      dataIndex: "name",
      key: "name",
      width: "10px",
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
    setFileIndex(
      parseInt((paginateStatus.current - 1) * paginateStatus.pageSize + index)
    );
    // if()
    setPreviewOpen(true);
    preview.current.classList.add("open");
  };

  const closePreview = () => {
    dispatch(fetchStory());
    setPreviewOpen(false);
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
        item?.language?.includes(value) ||
        item?.title?.includes(value) 
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
  const handleSubmit = (state) => {
    var temp_record = JSON.parse(
      JSON.stringify(
        data[
          parseInt(
            (paginateStatus.current - 1) * paginateStatus.pageSize + RowIndex
          )
        ]
      )
    );
    dispatch(
      setState(
        data[
          parseInt(
            (paginateStatus.current - 1) * paginateStatus.pageSize + RowIndex
          )
        ].status
      )
    );

    delete temp_record.file;
    if (temp_record.status !== "Accepted" || temp_record.status !== "Rejected")
      temp_record.status = "In Process";
    dispatch(uploadStory(temp_record));
    openPreview(RowIndex);
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
            placeholder="Search for titles, genre, language or geography..."
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
              pagination={{
                defaultCurrent: paginateStatus.current,
                pageSize: PageSize,
              }}
              onChange={(pagination) => setPaginateStatus(pagination)}
              sticky
              rowClassName={(record) =>
                (record.status == "refused" || record.status == "verified") &&
                "disabled-row"
              }
              onRow={(record, rowIndex) => {
                return {
                  onMouseEnter: () => {
                    setRowIndex(rowIndex);
                  },
                };
              }}
            />
          </div>
        )}
        <button
          className="btn btn-primary"
          onClick={() => dispatch(fetchStory())}
        >
          Refresh
        </button>
      </div>
      <div className="filePreviewWrapper" ref={preview}>
        {previewOpen && (
          <FilePreview closePreview={closePreview} index={fileIndex} />
        )}
      </div>
    </div>
  );
};

export default Story;
