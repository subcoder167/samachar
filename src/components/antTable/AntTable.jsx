// import React,{useEffect,useRef,useState} from 'react'
// import '../empanelments/Empanelments.css';
// import Goback from '../goBack/Goback';
// import {RiSearchLine,RiShareBoxFill} from 'react-icons/ri'
// import {BiFilterAlt} from 'react-icons/bi'
// import {AiOutlineDownCircle} from 'react-icons/ai'
// import { Table} from 'antd';
// import 'antd/dist/antd.css';
// import {TiTick} from 'react-icons/ti'
// import {BsPencilSquare} from 'react-icons/bs'
// import {useSelector,useDispatch} from 'react-redux'
// // import { fetchAllEmpanelments, postEmpanelments } from '../../redux/actions/empanelment';
// const AntTable = () => {
//   const [data, setData] = useState([]);
//   const [flag,setFlag]=useState(0)
//   const EmpanelmentsData= useSelector(state=>state.empanelments.data)
//   var reverseArray= useSelector(state=>state.empanelments.data)
// const dispatch= useDispatch()
// const columns = [
//     {
//       title: 'Name',
//       width: 'min(70px,16vw)',
//       dataIndex: 'name',
//       key: 'name',
//       fixed: 'left', render: (text, record) => (
//       <section className='flexCol'>
//       <span className='boldTd'>{record.name}</span><span className='thinTd'>{record.email} </span>
//       </section>   
//       ),
//       filters: [
//         {
//           text: 'Joe',
//           value: 'Joe',
//         },
//         {
//           text: 'Category 1',
//           value: 'Category 1',
//         },
//         {
//           text: 'Category 2',
//           value: 'Category 2',
//         },
//       ],
//       filterMode: 'tree',
//       filterSearch: true,
//     onFilter: (value, record) => record.name.startsWith(value),
//     },
  
//     {
//       title: 'Mobile Number',
//       dataIndex: 'phone',
//       key: '1',
//       width: 'min(70px,16vw)',
      
//     },
//     {
//       title: 'Designation',
//       dataIndex: 'designation',
//       key: 'designation',
//       width: 'min(100px,16vw)',
//       render: (text,record) => (
//         <section className='flexCol'><span className='boldTd'>{record.designation}</span>
//           <span className='thinTd'>{record.company} </span>
//         </section>
//       )
//     },
//     {
//       title: 'Reference',
//       dataIndex: 'reference',
//       key: '3',
//       width: 'min(70px,16vw)',
//       render: (text,record) => (
//         <a href={record.reference_id} className="linkedinDiv">Linkedin <RiShareBoxFill/></a>
//       )
//     },
//     {
//       title: 'Project Topic',
//       dataIndex: 'projectTopic',
//       key: '4',
//       width: 100,
//       render:(text,record)=><span>{record.project_topic?record.project_topic:"----"}</span>
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: '5',
//       width: "min(80px,16vw)",
//       render: (text,record) => <span className={`statusDiv ${record.status}`}>{record.status}</span>,
//       filters: [
//         {
//           text: 'InProcess',
//           value: 'inprocess',
//         },
//         {
//           text: 'Contacted',
//           value: 'contacted',
//         },
//         {
//           text: 'Verified',
//           value: 'verified',
//         },
//         {
//           text: 'Refused',
//           value: 'refused',
//         },
//       ],
//       filterMode: 'map',
//       // filterSearch: true,
//     onFilter: (value, record) => record.status.startsWith(value),
//     },
    
//     {
//       title: 'Action',
//       key: 'operation',
      
//       width: 'min(50px,16vw)',
//       render: () =><div className="checkboxDiv"> <div className="checkbox tickBtn"><TiTick/></div> <div className="checkbox crossBtn">&times;</div></div>,

//     },
//     {
//       title: 'Edit',
//       key: 6,      
//       width:40,
//       render: (text,record) =><div className="editBtn" onClick={(record)=>handleEdit(record)}> <div className="editBtnIcon"><BsPencilSquare/></div></div>,
//       // onCell:(record, rowIndex)=>{console.log(record.id)}
//     },
//   ];
// const newRecordModal= useRef()
// // var reverseArray=[];
// useEffect(() => {
//   dispatch(fetchAllEmpanelments())
  
//  }, []);
//  useEffect(() => {
//   reverseArray= sortData(reverseArray)
//   setFlag(1)
//   console.log("in empanelment,",data);
//   setData([...EmpanelmentsData])
//  }, [reverseArray,flag]);
  
//   function openModal()
  
//   {
//     newRecordModal.current.style.display="flex"
//   }
//   function closeModal()
  
//   {
//     newRecordModal.current.style.display="none"
//   }

//   function handleChange(e)
//   {
//     console.log(e.target.value)
//     var value=(e.target.value)
//     var searchArray= EmpanelmentsData.filter(item=>item.name.includes(value)||item.email.includes(value)||item.company.includes(value)||item.designation.includes(value))
//     if(searchArray.length>0)
//     {
//       setData(searchArray)
//     }
//     console.log(searchArray)
//   }
//   function handleEdit(record)
//   {
//     // console.log(record.target.parentElement.parentElement.parentElement.parentElement.firstElementChild)
//   }
//   function handleSubmit(e)
//   {
//     e.preventDefault()
//     var formData= new FormData(e.target)
//     dispatch(postEmpanelments(formData))
//     closeModal()
//   }
//   const sortData = (data) => {
//     // Call slice to create a new Array and prevent mutating it if it's stored in state
//    const newData= [...data]
//    return newData.reverse()
//   }

//   return (
//       <>
//     <div>
//         <div className="pageTop">
//            <Goback/>
//             <div className="pageTitle">Empanelments</div>
//             <div className="newRecordButton" onClick={openModal}>+&nbsp;&nbsp;&nbsp;&nbsp;Create New Record</div>
//         </div>

//         <div className="dashboardPageWrapper">
//             <div className="dashboardFilterDivWrapper">
//                 <form className='searchForm col-md-8'>
//                 <button type="submit"><RiSearchLine/></button>
//                 <input type="text" placeholder='Search for names, emails, numbers' onChange={(e)=>handleChange(e)} />
//                 </form>
//                 <div className="filterDivWrapper col-md-3">
//                 <div className="searchDiv col-xs-5">
//                     <BiFilterAlt/> Filter
//                 </div>
//                 <div className="searchDiv col-xs-5">
//                     <AiOutlineDownCircle/> Export
//                 </div>
//                 </div>
//             </div>
//           <div className="dashboardTableWrapper">
//           <Table
//       columns={columns}
//       dataSource={sortData(data)}
//       scroll={{
//         x: 1500,
//       }}
//       pagination={{ pageSize: 5 }}
//       sticky
//       onRow={(record, rowIndex) => {
//         return {
//           onClick: event => {}, 
//         };
//       }}
//     />
//           </div>
//         </div>
//     </div>
//     <div className="newRecordModalWrapper" ref={newRecordModal}>
//         <div className="newRecordModal">
//             <div className="newRecordModalTop">Create New Record <div className="modalCloseBtn" onClick={closeModal}>X</div></div>
            

//             <form className="newRecordModalForm" onSubmit={(e)=>handleSubmit(e)}>
//               <div className="modalFormInputWrapper">
//                 <label htmlFor="Name">Name*</label>
//                 <input type="text" name='name' className="modalFormInput"  placeholder="Enter Expert Name" id="Name" required />
//               </div>

//               <div className="modalFormInputWrapper">
//                 <label htmlFor="status">Current Status*</label>
//                 <select name='status'  className="modalFormInput" required id='status' >
//                   <option selected disabled>Select Current Status</option>
//                   <option value="inprocess">In process</option>
//                   <option value="contacted">Contacted</option>
//                   <option value="verified">Verified</option>
//                   <option value="refused">Refused</option>
//                 </select>
//               </div>

//               <div className="modalFormInputWrapper">
//                 <label htmlFor="reference">Reference*</label>
//                 <input type="text" name='reference_id' className="modalFormInput" placeholder="Enter Reference URL" required id='reference'/>
//               </div>
//               <div className="modalFormInputWrapper">
//                 <label htmlFor="email">Email</label>
//                 <input type="email" name='email' className="modalFormInput" placeholder="Enter Email Id" required id='email'/>
//               </div>

//               <div className="modalFormInputWrapper">
//                 <label htmlFor="mobileNumber">Mobile Number</label>
//                 <input type="text" name='phone' className="modalFormInput" placeholder="Enter Mobile Number" required id='mobileNumber'/>
//               </div>

//               <div className="modalFormInputWrapper">
//                 <label htmlFor="designation">Enter Latest Designation*</label>
//                 <input type="text" name='designation' className="modalFormInput" placeholder="Enter Latest Designation" required id='designation'/>
//               </div>

//               <div className="modalFormInputWrapper">
//                 <label htmlFor="company">Enter Latest Company*</label>
//                 <input type="text" name='company' className="modalFormInput" placeholder="Enter Latest Company" required id='company'/>
//               </div>

//               <div className="modalFormInputWrapper modalFormSubmitWrapper">
//                 <button type='submit'>Submit</button>
//               </div>

//             </form>
//         </div>
//     </div>
//       </>
//   )
// }
const AntTable=()=>{
  return<></>
}
export default AntTable