// import React,{useState,useEffect,useRef} from 'react'
// import {useHistory,useNavigate,useParams} from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux';
// import {BiLinkExternal} from 'react-icons/bi'

// import './MetaExpert.css'
// import Goback from '../goBack/Goback';
// import { setSingleMeta,fetchAllMeta, updateMeta, removeSingleMeta } from '../../redux/actions/metaExperts';

// const MetaExpertProfileEdit = () => {
//   const [meta,setMeta]= useState(0)
  
//   const params= useParams()
//   const dispatch = useDispatch()
//   const navigate=useNavigate()
//   const state = useSelector(state=>state.meta.currentrecord)
  
//   const [currentEdit,setCurrentEdit]= useState(state)
//   const educationCounter=useRef(state.education?.length||0)
//   const experienceCounter=useRef(state.experience?.length||0)
//   const metaEdit = useRef()
//   console.log(params.id)

//   useEffect(() => {
//     dispatch(setSingleMeta(params.id))   

//     return ()=>
//     {
//       dispatch(removeSingleMeta())
//     }
//   }, []);

//   useEffect(() => {
    
//     console.log(state) 
//     setCurrentEdit(state)
//     console.log('experience count = ',experienceCounter.current)
//   }, [state]);

// const handleSubmit=(e)=>
// {
//   e.preventDefault()
//   var education=[]
//   var experience=[]
//   var objEducation = {}
//   var objExperience = {}
//   const formdata = new FormData(metaEdit.current)
//   for(let i=0;i<state.education?.length;i++)
//   {
    
//     objEducation.school=formdata.get(`school${i}`)
//     objEducation.time=formdata.get(`educationTime${i}`)
//     objEducation.grade=formdata.get(`grade${i}`)
//     objEducation.description=formdata.get(`educationDesc${i}`)
//     education.push(objEducation);
//     objEducation={}
    
    
//   }
//   for(let i=0;i<state.experience?.length;i++)
//   {
//     objExperience.designation=formdata.get(`designation${i}`)
//     objExperience.company=formdata.get(`company${i}`)
//     objExperience.time=formdata.get(`experienceTime${i}`)
//     objExperience.description=formdata.get(`experienceDesc${i}`)
//     experience.push(objExperience);
//     objExperience={}
//   }

// const meta=
//     {
//       "biography":formdata.get('biography'),
//       "education":education,
//       "experience":experience,
//       "company": formdata.get('company'),
//       "designation": formdata.get('designation'),
//       "email": formdata.get('email'),
//       "first_name": formdata.get('first_name'),
//       "geography": formdata.get('geography'),
//       "id": state.id,
//       "last_name": formdata.get('last_name'),
//       "middle_name": formdata.get('middle_name'),
//       "phone": formdata.get('phone'),
//       "price": formdata.get('price'),
//       "reference_id": formdata.get('reference_id'),
//       "skills": []
//       }
  
//   console.log(meta)
//   dispatch(updateMeta(params.id,meta))
//   // navigate(`/dashboard/metaExperts/${state.id}`)
// setMeta(meta+1)
// }

// useEffect(() => {
  
//   dispatch(setSingleMeta(params.id))  
// }, [meta]);

// const ExperienceDiv=()=>
// {
//   experienceCounter.current++;

//   return (
//                       <div className="metaExperienceSection metaBiographySection">
//                       <div className="metaBiographyDiv">
//                         <div className="metaBiographyTitle">Designation</div>
//                         <input className="metaBiographyValue" type="text" name={'designation'+experienceCounter.current} required/>
//                       </div>     
//                       <div className="metaBiographyDiv">
//                         <div className="metaBiographyTitle">Company</div>
//                         <input className="metaBiographyValue" type="text" name={'company'+experienceCounter.current} />
//                       </div>
//                       <div className="metaBiographyDiv">
//                         <div className="metaBiographyTitle">Time</div>
//                         <input className="metaBiographyValue" type="text" name={'experienceTime'+experienceCounter.current}/>
//                       </div>       
//                       <div className="metaBiographyDiv">
//                         <div className="metaBiographyTitle">Description</div>
//                         <input className="metaBiographyValue metaBiographyPara" type="text" name={'experienceDesc'+experienceCounter.current}/>
//                       </div>                 
//               </div>
//               )
  
// }

// const addExperience=(e)=>
// {
//   console.log(e.target.parentElement)
//   e.target.parentElement.appendChild(<ExperienceDiv/>)
// }




//   return (
//     <div>
//         {currentEdit.first_name?
//         <>
//           <div className="pageTop">
//         <Goback/>
//             <div className="pageTitle">Meta Expert: {params.id}</div>
//         </div>
//         <section className="dashboardPageWrapper">

//         {state.id!==null?
//           <div className="metaProfileDetailWrapper">
//             <form ref={metaEdit} onSubmit={(e)=>handleSubmit(e)}>
//             <div className="metaProfileTop">
//                 <div className="metaProfileImage">  
//                   <img src="https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
//                 </div>
//                 <div className="metaProfileDetail">
//                     <div className="profileNameEdit">
//                   <input type="text" className="metaProfileName" name='first_name' defaultValue={currentEdit.first_name} placeholder="Enter first name"/> 
//                   <input type="text" className="metaProfileName" name='last_name' defaultValue={currentEdit.last_name} placeholder="Enter last name"/> 
//                   </div>
//                   <div className="profileDesignationEdit">
//                   <input type="text" className="metaProfileDesignation" name="designation" placeholder="Enter designation" defaultValue={currentEdit.designation}/> <input type="text" className='metaProfileDesignation' name="company" placeholder="Enter company" defaultValue={currentEdit.company}/>
//                   </div>
//                 </div>
//             </div>
//             <section className="metaProfileSkillWrapper metaProfileSection">
//               <div className="metaProfileSectionTitle">Overview</div>
//               <textarea className="metaProfileOverviewDiv" defaultValue={currentEdit.biography} placeholder='Enter your bio' name='biography'>              
//               </textarea>
//               <div className="metaProfileSectionTitle">Phone</div>
//               <input type="text" name='phone' defaultValue={currentEdit.phone} placeholder="Enter your phone number" required />
//             </section>
//             <section className="metaProfileSkillWrapper metaProfileSection">
//               <div className="metaProfileSectionTitle">Skills</div>
//               <div className="metaProfileSkillsDiv">
//               {currentEdit.skills?.map((e,index)=><div className='metaProfileSkill' key={index}>{e}</div>)}
//               </div>
//             </section>

//             <section className="metaProfileOtherDetails metaProfileSection">
//             <div className="metaProfileDetailDivWrapper col-lg-2 col-md-3">
//                   <div className="metaProfileSectionTitle">Location</div>
//                   <input type="text" name='geography' placeholder='Enter your country' defaultValue={currentEdit.geography} className="metaProfileDetailDiv"required/>
//               </div>
//               <div className="metaProfileDetailDivWrapper col-lg-2 col-md-3">
//                   <div className="metaProfileSectionTitle">Contact</div>
//                   <input type="text" name='email' placeholder='Enter your email' className="metaProfileDetailDiv" defaultValue={currentEdit.email}  required/>
//               </div>
//               <div className="metaProfileDetailDivWrapper col-lg-2 col-md-3">
//                   <div className="metaProfileSectionTitle">Price</div>
//                   <input type="text" name='price' placeholder='Enter price' className="metaProfileDetailDiv" defaultValue={currentEdit.price}  required/>
//               </div>
//               <div className="metaProfileDetailDivWrapper col-lg-2 col-md-3">
//                   <div className="metaProfileSectionTitle">Company</div>
//                   <input type="text" name='company' placeholder='Enter company' className="metaProfileDetailDiv" defaultValue={currentEdit.company}  required/>
//               </div>
//               <div className="metaProfileDetailDivWrapper col-lg-2 col-md-3">
//                   <div className="metaProfileSectionTitle">Reference</div>
//                   <input type="text" name='reference_id' placeholder='Enter linkedin Url' className="metaProfileDetailDiv"style={{overflowX:'visible'}} defaultValue={currentEdit.reference_id} required/>
                  
//               </div>
//             </section>
//             <section className="metaProfileBiographyDetails metaProfileSection">
//             <div className="metaProfileSectionTitle">Experience</div>
//             {currentEdit.experience?.length>0?<>
//             {currentEdit.experience.map((e,index)=><div className="metaExperienceSection metaBiographySection" key={index}>
//                       <div className="metaBiographyDiv">
//                         <div className="metaBiographyTitle">Designation</div>
//                         <input type="text" className="metaBiographyValue" defaultValue={e.designation} name={'designation'+index}/>
//                       </div>     
//                       <div className="metaBiographyDiv">
//                         <div className="metaBiographyTitle">Company</div>
//                         <input type="text" className="metaBiographyValue"defaultValue={e.company} name={'company'+index}/>
//                       </div>
//                       <div className="metaBiographyDiv">
//                         <div className="metaBiographyTitle">Time</div>
//                         <input type="text" className="metaBiographyValue"defaultValue={e.time}name={'experienceTime'+index}/>
//                       </div>       
//                       <div className="metaBiographyDiv">
//                         <div className="metaBiographyTitle">Description</div>
//                         <input type="text" className="metaBiographyValue metaBiographyPara"defaultValue={e.description}name={'experienceDesc'+index}/>
//                       </div>                 
//               </div>)}
            
//             </>
//             :<></>}
              
//                 <div style={{cursor:"pointer"}} onClick={(e)=>addExperience(e)}>Add Experience</div>
             
//             </section>

//             <section className="metaProfileBiographyDetails metaProfileSection">
//             <div className="metaProfileSectionTitle">Education</div>
//             {currentEdit.education?.length>0?<>
//             {currentEdit.education.map((e,index)=>
//               <div className="metaEducationSection metaBiographySection" key={index}>
//               <div className="metaBiographyDiv">
//                 <div className="metaBiographyTitle">School</div>
//                 <div>
//                 <input type="text" className="metaBiographyValue" defaultValue={e.school} name={'school'+index}/>
//                 {/* <div style={{fontSize:'14px'}}>Bachelor of Medicine - BE, Medicine and Surgery</div> */}
//                 </div>
//               </div>     
//               <div className="metaBiographyDiv">
//                 <div className="metaBiographyTitle">Time</div>
//                 <input type="text" className="metaBiographyValue" defaultValue={e.time} name={'educationTime'+index}/>
//               </div>       
//               <div className="metaBiographyDiv">
//                 <div className="metaBiographyTitle">Grade</div>
//                 <input type="text" className="metaBiographyValue" defaultValue={e.grade} name={'grade'+index}/>
//               </div> 
//               <div className="metaBiographyDiv">
//                 <div className="metaBiographyTitle">Description</div>
//                 <input type="text" className="metaBiographyValue" defaultValue={e.description} name={'EducationDescription'+index}/>
//               </div>                 
//       </div>)}
//             </>:<>Add Education</>}
            

//             </section>
          
//             <button type="submit" className='submitBtn' >Save</button>
//             </form>
//           </div>
//         :<>Loading...</>}
         
         
          
        
          
//         </section>
        
//         </>:<>Loading</>}
     
//     </div>
//   )
// }
const MetaExpertProfileEdit=()=>{
  return<></>
}
export default MetaExpertProfileEdit