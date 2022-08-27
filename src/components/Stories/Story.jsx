import React,{useState,useEffect} from 'react'
import {Table,Pagination,Radio,Divider} from 'antd';
import {RiFilter2Fill} from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner'

import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { fetchStory } from '../../redux/actions/story';
import './Story.css'
const Story = () => {
    const [trial,setTrial] = useState(false)
    const [msg, setMsg] = useState('');
    const [data,setData]=useState([]);

    const state= useSelector(state=>state.story)
    const dispatch= useDispatch()



    const columns = [
        // {
        //   title: 'Name',
        //   width: 'min(30px,10vw)',
        //   dataIndex: 'name',
        //   key: 'name',
        //   fixed: 'left', render: (text, record) => (
        //   <section className='flexCol'>
        //   <div className="boldTd">{record}</div>
        //   </section>   
        //   ),
       
        //   filterIcon:()=><RiFilter2Fill size={16}/>,
        //   onFilter: (value, record) => record.email.includes(value),
        // },
        // {
        //     title: 'geography',
        //     width: 'min(50px,10vw)',
        //     dataIndex: 'geography',
        //     key: 'geography', 
        //     filters: [
        //         {
                
        //         "text": "Andaman and Nicobar Islands",
        //         "value": "Andaman and Nicobar Islands"
        //         },
        //         {
                
        //         "text": "Andhra Pradesh",
        //         "value": "Andhra Pradesh"
        //         },
        //         {
                
        //         "text": "Arunachal Pradesh",
        //         "value": "Arunachal Pradesh"
        //         },
        //         {
                
        //         "text": "Assam",
        //         "value": "Assam"
        //         },
        //         {
                
        //         "text": "Bihar",
        //         "value": "Bihar"
        //         },
        //         {
                
        //         "text": "Chandigarh",
        //         "value": "Chandigarh"
        //         },
        //         {
                
        //         "text": "Chhattisgarh",
        //         "value": "Chhattisgarh"
        //         },
        //         {
                
        //         "text": "Dadra and Nagar Haveli",
        //         "value": "Dadra and Nagar Haveli"
        //         },
        //         {
                
        //         "text": "Daman and Diu",
        //         "value": "Daman and Diu"
        //         },
        //         {
                
        //         "text": "Delhi",
        //         "value": "Delhi"
        //         },
        //         {
                
        //         "text": "Goa",
        //         "value": "Goa"
        //         },
        //         {
                
        //         "text": "Gujarat",
        //         "value": "Gujarat"
        //         },
        //         {
                
        //         "text": "Haryana",
        //         "value": "Haryana"
        //         },
        //         {
                
        //         "text": "Himachal Pradesh",
        //         "value": "Himachal Pradesh"
        //         },
        //         {
                
        //         "text": "Jammu and Kashmir",
        //         "value": "Jammu and Kashmir"
        //         },
        //         {
                
        //         "text": "Jharkhand",
        //         "value": "Jharkhand"
        //         },
        //         {
                
        //         "text": "Karnataka",
        //         "value": "Karnataka"
        //         },
        //         {
                
        //         "text": "Kerala",
        //         "value": "Kerala"
        //         },
        //         {
                
        //         "text": "Lakshadweep",
        //         "value": "Lakshadweep"
        //         },
        //         {
                
        //         "text": "Madhya Pradesh",
        //         "value": "Madhya Pradesh"
        //         },
        //         {
                
        //         "text": "Maharashtra",
        //         "value": "Maharashtra"
        //         },
        //         {
                
        //         "text": "Manipur",
        //         "value": "Manipur"
        //         },
        //         {
                
        //         "text": "Meghalaya",
        //         "value": "Meghalaya"
        //         },
        //         {
                
        //         "text": "Mizoram",
        //         "value": "Mizoram"
        //         },
        //         {
                
        //         "text": "Nagaland",
        //         "value": "Nagaland"
        //         },
        //         {
                
        //         "text": "Odisha",
        //         "value": "Odisha"
        //         },
        //         {
                
        //         "text": "Puducherry",
        //         "value": "Puducherry"
        //         },
        //         {
                
        //         "text": "Punjab",
        //         "value": "Punjab"
        //         },
        //         {
                
        //         "text": "Rajasthan",
        //         "value": "Rajasthan"
        //         },
        //         {
                
        //         "text": "Sikkim",
        //         "value": "Sikkim"
        //         },
        //         {
                
        //         "text": "Tamil Nadu",
        //         "value": "Tamil Nadu"
        //         },
        //         {
                
        //         "text": "Telangana",
        //         "value": "Telangana"
        //         },
        //         {
                
        //         "text": "Tripura",
        //         "value": "Tripura"
        //         },
        //         {
                
        //         "text": "Uttar Pradesh",
        //         "value": "Uttar Pradesh"
        //         },
        //         {
                
        //         "text": "Uttarakhand",
        //         "value": "Uttarakhand"
        //         },
        //         {
                
        //         "text": "West Bengal",
        //         "value": "West Bengal"
        //         }
        //         ],
        //     filterMode: 'map',
        //     filterIcon:()=><RiFilter2Fill size={16}/>,
        //     onFilter: (value, record) => record.geography.includes(value),
        // },
        // {
        //     title: 'Language',
        //     dataIndex: 'language',
        //     key: 'language',
        //     width: "min(50px,10vw)",
        //     // render: (text,record) => <span className={`statusDiv ${record.status}`}>{record.status}</span>,
        //     filters: [
        //       {
        //         text: 'English',
        //         value: 'english',
        //       },
        //       {
        //         text: 'Hindi',
        //         value: 'hindi',
        //       },
        //       {
        //         text: 'Bengali',
        //         value: 'bengali',
        //       }
        //     ],
        //     filterMode: 'map',
        //     // filterSearch: true,
        //   onFilter: (value, record) => record.language.startsWith(value),
        //   filterIcon:()=><RiFilter2Fill size={16}/>
        // },
        // {
        //     title: 'Status',
        //     dataIndex: 'status',
        //     key: 'status',
        //     width: "min(80px,16vw)",
        //     render: (text,record) => <span className={`statusDiv ${record.status}`}>{record.status}</span>,
        //     filters: [
        //     {
        //         text: 'InProcess',
        //         value: 'inprocess',
        //     },
        //     {
        //         text: 'Contacted',
        //         value: 'contacted',
        //     },
        //     {
        //         text: 'Verified',
        //         value: 'verified',
        //     },
        //     {
        //         text: 'Refused',
        //         value: 'refused',
        //     },
        //     ],
        //     filterMode: 'map',
        //     // filterSearch: true,
        //   onFilter: (value, record) => record.status.startsWith(value),
        //   filterIcon:()=><RiFilter2Fill size={16}/>
        // },
        // {
        //     title: 'Genre',
        //     dataIndex: 'genre',
        //     key: 'genre',
        //     width: "min(80px,10vw)",
        //     render: (text,record) => <span className={`statusDiv ${record.status}`}>{record.status}</span>,
        //     filters: [
        //     {
        //         text: 'InProcess',
        //         value: 'inprocess',
        //     },
        //     {
        //         text: 'Contacted',
        //         value: 'contacted',
        //     },
        //     {
        //         text: 'Verified',
        //         value: 'verified',
        //     },
        //     {
        //         text: 'Refused',
        //         value: 'refused',
        //     },
        //     ],
        //     filterMode: 'map',
        //     // filterSearch: true,
        //   onFilter: (value, record) => record.status.startsWith(value),
        //   filterIcon:()=><RiFilter2Fill size={16}/>
        // },
        {
            title: 'Name',
            width:'min(16px,10vw)',
            dataIndex:'name',
            key:'name'
        },
        {
            title: 'geography',
            width:'min(16px,10vw)',
            dataIndex:'geography',
            key:'geography'
        },
        {
            title: 'Language',
            width:'min(16px,10vw)',
            dataIndex:'language',
            key:'language'
        }
        ,
        {
            title: 'Comment',
            width:'min(16px,10vw)',
            dataIndex:'comment',
            key:'comment'
        }
        ,
        {
            title: 'Genre',
            width:'min(16px,10vw)',
            dataIndex:'genre',
            key:'genre',
            // render: (text,record) =>{text.map((genre)=><span className="genrePill">genre</span>)}
            render: (text,record) =><>{text.map((genre)=><span className="tablePill">{genre}</span>)}</>
        }
        ,
        {
            title: 'Status',
            width:'min(16px,10vw)',
            dataIndex:'status',
            key:'status',
            // render: (text,record) =>{text.map((genre)=><span className="tablePill">genre</span>)}
            render: (text,record) =><span className={`tablePill ${text}`}>{text}</span>
        }
      ];

      const dummyData=[
        {
            "id":1,
            "name":"Demo1",
            "geography":"Kolkata, India",
            "language":"English",
            "comment":"lorem Ipsum",
            "genre":['thriller','fantasy'],
            "status":"Active"
        },
        {
            "id":2,
            "name":"Demo2",
            "geography":"Kolkata, India",
            "language":"English",
            "comment":"lorem Ipsum",
            "genre":['thriller','fantasy'],
            "status":"InProcess"
        },{
            "id":3,
            "name":"Demo3",
            "geography":"Kolkata, India",
            "language":"English",
            "comment":"lorem Ipsum",
            "genre":['thriller','fantasy'],
            "status":"InProcess"
        },
        {
            "id":4,
            "name":"Demo4",
            "geography":"Kolkata, India",
            "language":"English",
            "comment":"lorem Ipsum",
            "genre":['thriller','fantasy'],
            "status":"Active"
        },
        {
            "id":5,
            "name":"Demo5",
            "geography":"Kolkata, India",
            "language":"English",
            "comment":"lorem Ipsum",
            "genre":['thriller','fantasy'],
            "status":"Rejected"
        },
        {
            "id":6,
            "name":"Demo6",
            "geography":"Kolkata, India",
            "language":"English",
            "comment":"lorem Ipsum",
            "genre":['thriller','fantasy'],
            "status":"Active"
        },
        {
            "id":7,
            "name":"Demo7",
            "geography":"Kolkata, India",
            "language":"English",
            "comment":"lorem Ipsum",
            "genre":['thriller','fantasy'],
            "status":"Active"
        },
        {
            "id":8,
            "name":"Demo8",
            "geography":"Kolkata, India",
            "language":"English",
            "comment":"lorem Ipsum",
            "genre":['thriller','fantasy'],
            "status":"Rejected"
        },
        {
            "id":9,
            "name":"Demo9",
            "geography":"Kolkata, India",
            "language":"English",
            "comment":"lorem Ipsum",
            "genre":['thriller','fantasy'],
            "status":"Rejected"
        }
      ]
     
      const rowSelection = {
        
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
          // Column configuration not to be checked
          name: record.name,
        }),
      };

      useEffect(() => {
        dispatch(fetchStory())        
      }, []);

        useEffect(()=>{
            console.log(state)
            setTrial(state.trial)
            setMsg(state.message)
            setData(state.stories)
        },[state])


  return (
    <div>
        <div className="pageTitle">All Stories</div>
        <div className="dashboardTableWrapper">
        {trial?
        <div className="loader">
           <Spinner animation="grow" variant="dark" size="lg" />
        </div>
        :
        <div className='tableWrapper'>

            <Divider />

            <Table
                rowSelection={{
                type: "checkbox",
                ...rowSelection,
                }}
                    columns={columns}
                    dataSource={dummyData}
                    scroll={{
                        x: 1500,
                    }}
                    pagination={{ pageSize: 8 }}
                    sticky
                    rowClassName={record => (record.status=="refused"||record.status=="verified") && "disabled-row"}
                
                    onRow={(record, rowIndex) => {
                        if(record.status=="refused")
                        
                        return {
                        onClick: event => {console.log(record)}, 
                        };
                    }}
            />
            
            {/* <Pagination defaultCurrent={1} total={data.length} style={{marginTop:30}} /> */}
        </div>
        }
      
          </div>
    </div>
  )
}

export default Story