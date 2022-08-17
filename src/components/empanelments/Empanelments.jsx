import React,{useEffect,useRef,useState} from 'react'
import {Table} from 'antd';
import 'antd/dist/antd.css';
import {useSelector,useDispatch} from 'react-redux'
import {RiSearchLine,RiShareBoxFill,RiFilter2Fill} from 'react-icons/ri'
import {BiFilterAlt} from 'react-icons/bi'
import {AiOutlineDownCircle} from 'react-icons/ai'
import {BsPencilSquare} from 'react-icons/bs'
import {TiTick} from 'react-icons/ti'
import {CSVLink} from "react-csv"


import RecordModal from '../recordModal/RecordModal';
import { sortData, stringifyData } from '../../functions';
import ConfirmModal from '../recordModal/ConfirmModal';
import { fetchAllEmpanelments, postEmpanelments, setSingleEmpanelment, updateEmpanelments } from '../../redux/actions/empanelment';
import './Empanelments.css'
import Goback from '../goBack/Goback';

const Empanelments = () => {
  const [data, setData] = useState([]);
  const [flag,setFlag]=useState(0)
  const [currentRecord,setCurrentRecord]=useState({})
  const [refuseRecord,setRefuseRecord]=useState({})

  const EmpanelmentsData= useSelector(state=>state.empanelments.data)
  var reverseArray= useSelector(state=>state.empanelments.data)
  var errorMsg= useSelector(state=>state.empanelments.error)
  // const currentRecord=useSelector(state=>state.empanelments.currentrecord)
  var refuseData= new FormData()
  const dispatch= useDispatch()

  const newRecordModal= useRef()
  const updateRecordModal=useRef()
  const verifyRecordModal= useRef()
  const confirmRejectModal= useRef()
  const newRecordForm= useRef()
  const errorMsgRef= useRef()
  

  const columns = [
      {
        title: 'Name',
        width: 'min(70px,16vw)',
        dataIndex: 'name',
        key: 'name',
        fixed: 'left', render: (text, record) => (
        <section className='flexCol'>
        <span className='boldTd'>{record.title} {record.first_name}&nbsp;{record.last_name.charAt(0)}.</span><span className='thinTd emailTd'>{record.email} </span>
        </section>   
        ),
        filters: [
          {
            text: '@gmail',
            value: 'gmail',
          },
        ],
        filterMode: 'map',
        filterIcon:()=><RiFilter2Fill size={16}/>,
        onFilter: (value, record) => record.email.includes(value),
      },
    
      {
        title: 'Mobile Number',
        dataIndex: 'phone',
        key: '1',
        width: 'min(70px,16vw)',
        
      },
      {
        title: 'Designation',
        dataIndex: 'designation',
        key: 'designation',
        width: 'min(100px,16vw)',
        render: (text,record) => (
          <section className='flexCol'><span className='boldTd'>{record.designation}</span>
            <span className='thinTd'>{record.company} </span>
          </section>
        )
      },
      {
        title: 'Reference',
        dataIndex: 'reference',
        key: '3',
        width: 'min(70px,16vw)',
        render: (text,record) => (
          <a target="_blank" rel="noreferrer noopener" href={record.reference_id} className="linkedinDiv">Linkedin <RiShareBoxFill/></a>
        )
      },
      {
        title: 'Project Topic',
        dataIndex: 'projectTopic',
        key: '4',
        width: 100,
        render:(text,record)=><span>{record.project_topic?record.project_topic:"----"}</span>
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: '5',
        width: "min(80px,16vw)",
        render: (text,record) => <span className={`statusDiv ${record.status}`}>{record.status}</span>,
        filters: [
          {
            text: 'InProcess',
            value: 'inprocess',
          },
          {
            text: 'Contacted',
            value: 'contacted',
          },
          {
            text: 'Verified',
            value: 'verified',
          },
          {
            text: 'Refused',
            value: 'refused',
          },
        ],
        filterMode: 'map',
        // filterSearch: true,
      onFilter: (value, record) => record.status.startsWith(value),
      filterIcon:()=><RiFilter2Fill size={16}/>
      },
      
      {
        title: 'Action',
        key: 'operation',
        
        width: 'min(50px,16vw)',
        render: (text,record) =><div className="checkboxDiv"> <div className="checkbox tickBtn" onClick={()=>handleAccept(text,verifyRecordModal)}><TiTick/></div> <div className="checkbox crossBtn"onClick={()=>handleRefuse(text,confirmRejectModal)}>&times;</div></div>,

      },
      {
        title: 'Edit',
        key: 6,      
        width:40,
        render: (text,record) =><div className="editBtn" onClick={()=>handleEdit(text,updateRecordModal)}> <div className="editBtnIcon"><BsPencilSquare/></div></div>,
      },
    ];



  
    useEffect(() => {
      // dispatch(fetchAllEmpanelments())    
    }, []);

    useEffect(() => {
      reverseArray= sortData(reverseArray)
      setFlag(1)
      setData([...EmpanelmentsData])
      console.log("in empanelment,",data);
    }, [reverseArray,flag]);
    

    const openModal=(ref)=>
    
    {
      ref.current.style.display="flex"
    }
    const closeModal=(ref)=>
    
    {
      ref.current.style.display="none"
    }

    const handleChange=(e)=>
    {
      console.log(e.target.value)
      var value=(e.target.value)
      var searchArray= EmpanelmentsData.filter(item=>item.first_name.includes(value)||item.last_name.includes(value)||item.middle_name.includes(value)||item.email.includes(value)||item.company.includes(value)||item.designation.includes(value))
      if(searchArray.length>0)
      {
        setData(searchArray)
      }
      else if(searchArray.length==0)
      {
        setData([])
      }
      console.log(searchArray)
    }
    const handleEdit=(record,ref)=>
    {
      ref.current.style.display="flex"
      setCurrentRecord(record)
      dispatch(setSingleEmpanelment(record))
      // console.log(currentRecord)
    }
    const handleAccept=(record,ref)=>
    {
      handleEdit(record,ref) 
    }
    const handleSubmit=(e)=>
    {
      e.preventDefault()
      var formData= new FormData(e.target)
      dispatch(postEmpanelments(formData))
      closeModal(newRecordModal)
      if(errorMsg==="")
      {
        errorMsgRef.current.style.display="none"
        newRecordForm.current.reset()
        
      }
      else
      {
        alert(errorMsg)
      }
      
    }

    const handleRefuse=(record,ref)=>
    { 
      handleEdit(record,ref)  
    }
    

    const handleRefusedEmpanelment=()=>
    {
      confirmRejectModal.current.style.display="none"
      
      refuseData.append('id',currentRecord.id)
      refuseData.append('name',currentRecord.name)
      refuseData.append('status',"refused")
      refuseData.append('reference_id',currentRecord.reference_id)
      refuseData.append('project_topic',currentRecord.project_topic)
      refuseData.append('phone',currentRecord.phone)
      refuseData.append('email',currentRecord.email)
      refuseData.append('company',currentRecord.company)
      refuseData.append('designation',currentRecord.designation)
      // refuseData.append('comments',currentRecord.comments)
      console.log("in final func",stringifyData(refuseData))
      dispatch(updateEmpanelments(refuseData))
    }
  return (
      <>
    <div>
        <div className="pageTop">
           <Goback/>
            <div className="pageTitle">Empanelments</div>
            <div className="newRecordButton" onClick={()=>openModal(newRecordModal)}>+&nbsp;&nbsp;&nbsp;&nbsp;Create New Record</div>
        </div>

        <div className="dashboardPageWrapper">
            <div className="dashboardFilterDivWrapper">
                <form className='searchForm col-md-8'>
                <button type="submit"><RiSearchLine/></button>
                <input type="text" placeholder='Search for names, emails, numbers' onChange={(e)=>handleChange(e)} />
                </form>
                <div className="filterDivWrapper col-md-3">
                <div className="searchDiv col-xs-5">
                    <BiFilterAlt/> Filter
                </div>
                <div className="searchDiv exportDiv col-xs-5">
                <CSVLink
              filename={"Empanelments.csv"}
              data={sortData(data)}
              
            >
              <AiOutlineDownCircle/><span> Export</span>
            </CSVLink>
                    
                </div>
                </div>
            </div>
          <div className="dashboardTableWrapper">
          <Table
      columns={columns}
      dataSource={sortData(data)}
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
          </div>
        </div>
    </div>


    <div className="newRecordModalWrapper" ref={newRecordModal}>
        <div className="newRecordModal">
            <div className="newRecordModalTop">Create New Record <div className="modalCloseBtn" onClick={()=>closeModal(newRecordModal)}>X</div></div>
            

            <form className="newRecordModalForm" onSubmit={(e)=>handleSubmit(e)} ref={newRecordForm}>
            <div className="modalFormInputWrapper">
                <label htmlFor="Title">Title*</label>
                <select name='title'  className="modalFormInput" required id='Title'defaultValue="null"  >
                  <option value="null" disabled>Select Title</option>
                  <option value="dr.">Dr.</option>
                  <option value="mr.">Mr.</option>
                  <option value="mrs.">Mrs.</option>
                  <option value="ms.">Ms.</option>
                  
                </select>
              </div>
              <div className="modalFormInputWrapper">
                <label htmlFor="FName">First Name*</label>
                <input type="text" name='first_name' className="modalFormInput"  placeholder="Enter First Name" id="FName" required />
              </div>
              <div className="modalFormInputWrapper">
                <label htmlFor="MName">Middle Name</label>
                <input type="text" name='middle_name' className="modalFormInput"  placeholder="Enter Middle Name" id="MName"  />
              </div>
              <div className="modalFormInputWrapper">
                <label htmlFor="LName">Last Name*</label>
                <input type="text" name='last_name' className="modalFormInput"  placeholder="Enter Last Name" id="LName" required />
              </div>

              <div className="modalFormInputWrapper">
                <label htmlFor="status">Current Status*</label>
                <select name='status'  className="modalFormInput" required id='status'defaultValue="null" >
                  <option value="null" disabled>Select Current Status</option>
                  <option value="inprocess">In process</option>
                  <option value="contacted">Contacted</option>
                  
                </select>
              </div>

              <div className="modalFormInputWrapper">
                <label htmlFor="reference">Reference*</label>
                <input type="text" name='reference_id' className="modalFormInput" placeholder="Enter Reference URL" required id='reference'/>
              </div>
              <div className="modalFormInputWrapper">
                <label htmlFor="email">Email</label>
                <input type="email" name='email' className="modalFormInput" placeholder="Enter Email Id"  id='email'/>
              </div>

              <div className="modalFormInputWrapper">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input type="text" name='phone' className="modalFormInput" placeholder="Enter Mobile Number"  id='mobileNumber'/>
              </div>

              <div className="modalFormInputWrapper">
                <label htmlFor="designation">Enter Latest Designation*</label>
                <input type="text" name='designation' className="modalFormInput" placeholder="Enter Latest Designation" required id='designation'/>
              </div>

              <div className="modalFormInputWrapper">
                <label htmlFor="company">Enter Latest Company*</label>
                <input type="text" name='company' className="modalFormInput" placeholder="Enter Latest Company" required id='company'/>
              </div>
{/*          
              <div className="modalFormInputWrapper">
              <label htmlFor="company">Enter Project Type</label>
              <select name='status'  className="modalFormInput" required id='projectType'>
                <option value="" disabled selected>Select a project Type</option>
                <option value="cloudComputing" >Cloud Computing</option>
                <option value="business" >business Analysis</option>
                <option value="software" >software Development</option>
              </select>
              </div> */}

              <div className="modalFormInputWrapper">
                <label htmlFor="projectTitle">Enter Project Title*</label>
                <input type="text" name='project_topic' className="modalFormInput" placeholder="Enter Project Title" required id='projectTitle' />
              </div>

              <div className="modalFormInputWrapper">
                <label htmlFor="comment">Comment</label>
                <input type="text" name='comment' className="modalFormInput" placeholder="Enter comment" required id='comment' />
              </div>
                  <div className="errorMessageDiv" ref={errorMsgRef}>{errorMsg}</div>
              <div className="modalFormInputWrapper modalFormSubmitWrapper">
                <button type='submit'>Submit</button>
              </div>

            </form>
        </div>
    </div>

    <div className="newRecordModalWrapper" ref={updateRecordModal}>
      <RecordModal modalType="update" parentCallback={()=> updateRecordModal.current.style.display="none"} />
    </div>
    <div className="newRecordModalWrapper" ref={verifyRecordModal}>
      <RecordModal modalType="verify" parentCallback={()=> verifyRecordModal.current.style.display="none"} />
    </div>


    <div className="newRecordModalWrapper confirmModalWrapper" ref={confirmRejectModal}>
    <div className="newRecordModal confirmModal">
           <div className="newRecordModalTop">Confirm your action <div className="modalCloseBtn" onClick={()=>closeModal(confirmRejectModal)}>X</div></div>

           <div className="confirmModalDetails">
             <h3 className="confirmModalDesc">Are you sure you want to refuse this empanelment?</h3>
           </div>
           <div className="confirmModalButtonWrapper">
             <div className="failureBtn confirmModalBtn" onClick={()=>closeModal(confirmRejectModal)}>Cancel</div>
             <div className="successBtn confirmModalBtn" onClick={()=>handleRefusedEmpanelment()}>Refuse</div>
           </div>
    </div>
    </div>

      </>
  )
}

export default Empanelments