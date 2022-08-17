import React,{useRef,useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { empanelmentToMeta, updateEmpanelments } from '../../redux/actions/empanelment';

const RecordModal = ({parentCallback,modalType }) => {
    const [state, setstate] = useState();
    const [Flag, setFlag] = useState(0);
    const dispatch= useDispatch()
    const currentRecord=useSelector(state=>state.empanelments.currentrecord)
    console.log(currentRecord,modalType)
  
  useState(()=>{
    setstate(currentRecord)
    setFlag(1)
    console.log('====================================');
    console.log(currentRecord);
    console.log('====================================');
  },[currentRecord])
  
    function handleSubmit(e)
    {
    e.preventDefault()
      var formData= new FormData(e.target)
      formData.append("id",currentRecord.id)
      dispatch(updateEmpanelments(formData))
      // {modalType==="update"?:dispatch(updateEmpanelments(formData))}
      if(modalType==="verify")
      { var empanelment_id= new FormData()
        empanelment_id.append('empanelment_id',currentRecord.id)
        dispatch(empanelmentToMeta(empanelment_id))

      }
      else
      console.log('updateModal')
      parentCallback();
    }

  return (
    <div className="newRecordModal">
            <div className="newRecordModalTop">{modalType=="verify"?"Verify":"Update"} Record <div className="modalCloseBtn" onClick={parentCallback}>X</div></div>
            

            <form className="newRecordModalForm" 
            onSubmit={(e)=>handleSubmit(e)}
            >
              <div className="modalFormInputWrapper">
                <label htmlFor="Title">Title*</label>
                <select name='title'  className="modalFormInput" required id='Title' >
                  <option value="null" disabled>Select Title</option>
                  <option value="dr." selected={currentRecord.title=="dr."?true:false}>Dr.</option>
                  <option value="mr." selected={currentRecord.title=="mr."?true:false}>Mr.</option>
                  <option value="mrs." selected={currentRecord.title=="mrs."?true:false}>Mrs.</option>
                  <option value="ms." selected={currentRecord.title=="ms."?true:false}>Ms.</option>
                  
                </select>
              </div>
               <div className="modalFormInputWrapper">
                <label htmlFor="FName">First Name*</label>
                <input type="text" name='first_name' className="modalFormInput"  placeholder="Enter First Name" id="FName" required defaultValue={currentRecord.first_name}/>
              </div>
              <div className="modalFormInputWrapper">
                <label htmlFor="MName">Middle Name</label>
                <input type="text" name='middle_name' className="modalFormInput"  placeholder="Enter Middle Name" id="MName"  
                defaultValue={currentRecord.middle_name}/>
              </div>
              <div className="modalFormInputWrapper">
                <label htmlFor="LName">Last Name*</label>
                <input type="text" name='last_name' className="modalFormInput"  placeholder="Enter Last Name" id="LName" required 
                defaultValue={currentRecord.last_name}/>
              </div>


              <div className="modalFormInputWrapper">
                <label htmlFor="status">Current Status*</label>
                {modalType==="verify"?
                <select name='status'  className="modalFormInput" required id='status' defaultValue="verified"  >
                <option value="verified" >Verified</option>
          
              </select>
              :
              <select name='status'  className="modalFormInput" required id='status' defaultValue={currentRecord.status} >
                  <option disabled>Select Current Status</option>
                  <option value="inprocess" selected={currentRecord.status=="inprocess"?true:false}>In process</option>
                  <option value="contacted" selected={currentRecord.status=="contacted"?true:false}>Contacted</option>
                  {/* <option value="verified"selected={currentRecord.status=="verified"?true:false}>Verified</option>
                  <option value="refused"selected={currentRecord.status=="refused"?true:false}>Refused</option> */}
                </select>}
                
              </div>

              <div className="modalFormInputWrapper">
                <label htmlFor="reference">Reference*</label>
                <input type="text" name='reference_id' className="modalFormInput" placeholder="Enter Reference URL" required id='reference' defaultValue={currentRecord.reference_id}/>
              </div>
              {modalType==="verify"?<div className="modalFormInputWrapper">              
                <label htmlFor="email">Email*</label>
                <input type="email" name='email' className="modalFormInput" placeholder="Enter Email Id" required id='email'defaultValue={currentRecord.email}/>
              </div>:
              <div className="modalFormInputWrapper">              
              <label htmlFor="email">Email</label>
              <input type="email" name='email' className="modalFormInput" placeholder="Enter Email Id" id='email'defaultValue={currentRecord.email}/>
            </div>}
              
            {modalType==="verify"?<div className="modalFormInputWrapper">
                <label htmlFor="mobileNumber">Mobile Number*</label>
                <input type="text" name='phone' className="modalFormInput" placeholder="Enter Mobile Number" required id='mobileNumber'defaultValue={currentRecord.phone}/>
              </div>: <div className="modalFormInputWrapper">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input type="text" name='phone' className="modalFormInput" placeholder="Enter Mobile Number"  id='mobileNumber'defaultValue={currentRecord.phone}/>
              </div>}
              

              <div className="modalFormInputWrapper">
                <label htmlFor="designation">Enter Latest Designation*</label>
                <input type="text" name='designation' className="modalFormInput" placeholder="Enter Latest Designation" required id='designation' defaultValue={currentRecord.designation}/>
              </div>

              <div className="modalFormInputWrapper">
                <label htmlFor="company">Enter Latest Company*</label>
                <input type="text" name='company' className="modalFormInput" placeholder="Enter Latest Company" required id='company' defaultValue={currentRecord.company}/>
              </div>

              {/* <div className="modalFormInputWrapper">
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
                <input type="text" name='project_topic' className="modalFormInput" placeholder="Enter Project Title" required id='projectTitle' defaultValue={currentRecord.project_topic}/>
              </div>

              <div className="modalFormInputWrapper">
                <label htmlFor="comment">Comment</label>
                <input type="text" name='comment' className="modalFormInput" placeholder="Enter comment" required id='comment' />
              </div>
              <div className="modalFormInputWrapper modalFormSubmitWrapper">
                <button type='submit'>Submit</button>
              </div>

            </form>
        </div>
  )
}

export default RecordModal