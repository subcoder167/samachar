// import React,{useState,useEffect} from 'react'
// import {Link, useHistory,useParams} from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux';
// import {BiLinkExternal} from 'react-icons/bi'
// import {AiOutlineEdit} from 'react-icons/ai'
// import './MetaExpert.css'
// import Goback from '../goBack/Goback';
// import { setSingleMeta,fetchAllMeta, removeSingleMeta } from '../../redux/actions/metaExperts';

// const MetaExpertProfile = () => {
//   const params= useParams()
//   const dispatch = useDispatch()
//   const state = useSelector(state=>state.meta.currentrecord)

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
//   }, [state]);



//   return (
//     <div>

//         <div className="pageTop">
//         <Goback/>
//             <div className="pageTitle">Meta Expert: {params.id}</div>
//             <Link to={'/dashboard/metaExperts/edit/'+params.id} className="editDiv">
//               <AiOutlineEdit/> 
//               Edit
//             </Link>
//         </div>
//         <section className="dashboardPageWrapper">
//         {state.id!=null?
//           <div className="metaProfileDetailWrapper">
//             <div className="metaProfileTop">
//                 <div className="metaProfileImage">
//                   <img src="https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
//                 </div>
//                 <div className="metaProfileDetail">
//                   <div className="metaProfileName"> {state.first_name} &nbsp; {state.last_name}</div>
//                   <div className="metaProfileDesignation">{state.designation} , {state.company}</div>
//                 </div>
//             </div>
//             <section className="metaProfileSkillWrapper metaProfileSection">
//               <div className="metaProfileSectionTitle">Overview</div>
//               <div className="metaProfileOverviewDiv" >
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ipsam obcaecati debitis sapiente at in necessitatibus cumque, adipisci corporis quasi libero numquam magni eos. Quidem explicabo impedit molestiae accusamus quibusdam?
//               </div>
//             </section>
//             <section className="metaProfileSkillWrapper metaProfileSection">
//               <div className="metaProfileSectionTitle">Skills</div>
//               <div className="metaProfileSkillsDiv">
//                 {state.skills.length>0?<>{state.skills.map((e,index)=><div className='metaProfileSkill' key={index}>{e}</div>)}</>:<>No skills added</>}
       
//               </div>
//             </section>

//             <section className="metaProfileOtherDetails metaProfileSection">
//             <div className="metaProfileDetailDivWrapper col-lg-2 col-md-3">
//                   <div className="metaProfileSectionTitle">Location</div>
//                   <div className="metaProfileDetailDiv">{state.geography}</div>
//               </div>
//               <div className="metaProfileDetailDivWrapper col-lg-2 col-md-3">
//                   <div className="metaProfileSectionTitle">Contact</div>
//                   <div className="metaProfileDetailDiv">{state.email}</div>
//               </div>
//               <div className="metaProfileDetailDivWrapper col-lg-2 col-md-3">
//                   <div className="metaProfileSectionTitle">Price</div>
//                   <div className="metaProfileDetailDiv">${state.price}</div>
//               </div>
//               <div className="metaProfileDetailDivWrapper col-lg-2 col-md-3">
//                   <div className="metaProfileSectionTitle">Company</div>
//                   <div className="metaProfileDetailDiv">{state.company}</div>
//               </div>
//               <div className="metaProfileDetailDivWrapper col-lg-2 col-md-3">
//                   <div className="metaProfileSectionTitle">Reference</div>
//                   <div className="metaProfileDetailDiv"><a href={state.reference_id} target="_blank" rel="noopener noreferrer">LinkedIn</a><BiLinkExternal/></div>
//               </div>
//             </section>

//             <section className="metaProfileBiographyDetails metaProfileSection">
//             <div className="metaProfileSectionTitle">Experience</div>
//             {state.experience.length>0?<>
//             {state.experience.map((e,index)=><div className="metaExperienceSection metaBiographySection" key={index}>
//                       <div className="metaBiographyDiv">
//                         <div className="metaBiographyTitle">Designation</div>
//                         <div className="metaBiographyValue">{e.designation}</div>
//                       </div>     
//                       <div className="metaBiographyDiv">
//                         <div className="metaBiographyTitle">Company</div>
//                         <div className="metaBiographyValue">{e.company}</div>
//                       </div>
//                       <div className="metaBiographyDiv">
//                         <div className="metaBiographyTitle">Time</div>
//                         <div className="metaBiographyValue">{e.time}</div>
//                       </div>       
//                       <div className="metaBiographyDiv">
//                         <div className="metaBiographyTitle">Description</div>
//                         <div className="metaBiographyValue metaBiographyPara">{e.description}</div>
//                       </div>                 
//               </div>)}
            
//             </>
//             :<>Nothing to show here</>}
              

             
//             </section>

//             <section className="metaProfileBiographyDetails metaProfileSection">
//             <div className="metaProfileSectionTitle">Education</div>
//             {state.education.length>0?<>
//             {state.education.map((e,index)=>
//               <div className="metaEducationSection metaBiographySection" key={index}>
//               <div className="metaBiographyDiv">
//                 <div className="metaBiographyTitle">School</div>
//                 <div className="metaBiographyValue">{e.school} <div style={{fontSize:'14px'}}>Bachelor of Medicine - BE, Medicine and Surgery</div></div>
//               </div>     
//               <div className="metaBiographyDiv">
//                 <div className="metaBiographyTitle">Time</div>
//                 <div className="metaBiographyValue">{e.time}</div>
//               </div>       
//               <div className="metaBiographyDiv">
//                 <div className="metaBiographyTitle">Grade</div>
//                 <div className="metaBiographyValue">{e.grade}</div>
//               </div> 
//               <div className="metaBiographyDiv">
//                 <div className="metaBiographyTitle">Description</div>
//                 <div className="metaBiographyValue metaBiographyPara">{e.description}</div>
//               </div>                 
//       </div>)}
//             </>:<>Nothing to show here</>}
            
//             </section>
           
//           </div>
//         :<>Loading...</>}
         
         
          
        
          
//         </section>
//     </div>
//   )
// }
const MetaExpertProfile=()=>{
  return<></>
}

export default MetaExpertProfile