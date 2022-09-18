import React, { useState, useEffect } from "react";
import { Table, Pagination, Radio, Divider, Tag } from "antd";
import { RiFilter2Fill, RiSearchLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import moment from "moment";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { fetchStory } from "../../redux/actions/story";
import "./Story.css";
import { generateArray } from "../../functions";
const Story = () => {
  const [trial, setTrial] = useState(false);
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
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
    },
    {
      title: "Name",
      dataIndex: "uploaded_by_id",
      key: "uploaded_by_id",
    },

    {
      title: "Uploaded",
      dataIndex: "uploaded_at",
      key: "uploaded_at",
      render: (text, record) => <span>{moment(text).format("ll")}</span>,
      sorter: (a, b) =>new Date(a.uploaded_at)- new Date(b.uploaded_at),
    },

    // {
    //     title: 'File',
    //     width:'min(16px,5vw)',
    //     dataIndex:'file',
    //     key: 'file',
    //     render: (text, record) =>
    //         <a href={'http://147.182.236.95:8000/'+text} target="_blank" rel='noreferrer noopener'>
    //             Preview File</a>
    // },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // render: (text,record) =>{text.map((genre)=><span className="tablePill">genre</span>)}
      render: (text, record) => <span className={`tablePill `}>{text}</span>,
    },
    {
      title: "Priority",
      dataIndex: "status",
      key: "status",
      // render: (text,record) =>{text.map((genre)=><span className="tablePill">genre</span>)}
      render: (text, record) => (
        <input
          type="checkbox"
          name="priority"
          checked={parseInt(text) == 0 ? false : true}
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
 const handleSearchChange=(e)=>
    {
      var value=(e.target.value).toLowerCase();
      var searchArray= state?.stories?.filter(item=>item?.first_name?.includes(value)||item?.last_name?.includes(value)||item?.geography?.includes(value)||generateArray(item?.genre)?.includes(value)||item?.language?.includes(value))
      if(searchArray.length>0)
      {
        setData(searchArray)
      }
    //   else if(searchArray.length==0)
    //   {
    //     setData([])
    //   }
      console.log(searchArray)
    }
  return (
    <div>
          <div className="pageTitle">All Stories</div>
          <div className="dashboardSearchWrapper">
              <form className='searchForm col-md-8'>
                <button type="submit"><RiSearchLine/></button>
                <input type="text" placeholder='Search for names, emails, numbers'onChange={(e)=>handleSearchChange(e)}  />
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
                if (record.status == "refused")
                  return {
                    onClick: (event) => {
                      console.log(record);
                    },
                  };
              }}
            />

            {/* <Pagination defaultCurrent={1} total={data.length} style={{marginTop:30}} /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Story;
