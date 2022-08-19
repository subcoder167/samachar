import React,{useState,useEffect,useRef} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {RiSearchLine} from 'react-icons/ri'
import {BiFilterAlt} from 'react-icons/bi'
import {AiOutlineDownCircle,AiOutlineEye} from 'react-icons/ai'
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pagination } from 'antd'


// import { fetchAllMeta, removeSingleMeta } from '../../redux/actions/metaExperts'
import { sortData } from '../../functions'
import './MetaExpert.css'
import { Link } from 'react-router-dom'
import Goback from '../goBack/Goback'


// const MetaExpert = () => {
//   const [trial, setTrial] = useState(false);
//   const [data, setData] = useState([]);
//   const [flag,setFlag]=useState(0)
//   const [val,SetVal] = useState(10)
//   const [minVal,setMinVal]=useState(0)
//   const [maxVal,setMaxVal]=useState(val)

//   const metaData=useSelector(state=>state.meta.data)
//   var reverseArray=useSelector(state=>state.meta.data)
//   const dispatch= useDispatch()


//   useEffect(() => {
//     dispatch(fetchAllMeta())
//     dispatch(removeSingleMeta())
   
//   }, [])
  
//     useEffect(() => {
//       reverseArray= sortData(reverseArray)
//       setFlag(1)
//       setData([...metaData])
//       console.log("in meta,",data);
//       return()=>dispatch(removeSingleMeta())
//     }, [reverseArray,flag]);

//     const handleSearchChange=(e)=>
//     {
//       var value=(e.target.value)
//       var searchArray= metaData.filter(item=>item.first_name.includes(value)||item.last_name.includes(value)||item.middle_name.includes(value)||item.email.includes(value)||item.phone.includes(value)||item.company.includes(value)||item.designation.includes(value))
//       if(searchArray.length>0)
//       {
//         setData(searchArray)
//       }
//       else if(searchArray.length==0)
//       {
//         setData([])
//       }
//       console.log(searchArray)
//     }

//     const handlePaginationChange=(value)=>{
//       if (value <= 1) {
//         setMinVal(0)
//         setMaxVal(val)
//       } else {        
//           setMinVal(maxVal)
//           setMaxVal(value * val)
        
//       }
//     }


//   return (
//     <div>
//         <div className="pageTop">
//         <Goback/>
//             <div className="pageTitle">Meta Experts</div>
//             {/* <div className="newRecordButton">+&nbsp;&nbsp;&nbsp;&nbsp;Create New Record</div> */}
//         </div>

//         <div className="dashboardPageWrapper">


//             <div className="dashboardFilterDivWrapper">
//                 <form className='searchForm col-md-8'>
//                 <button type="submit"><RiSearchLine/></button>
//                 <input type="text" placeholder='Search for names, emails, numbers'onChange={(e)=>handleSearchChange(e)}  />
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

//       {data.length>0?<>
//         <div className="dashboardCardWrapper">
        
//         {data.slice(minVal, maxVal).reverse().map((e,index)=>(
//             <div className="dashboardCard col-lg-4 col-md-6 col-sm-12" key={index}>
//               <div className="cardTop">
//                 <div className="Id">ID: <span>{e.id}</span></div>
//                 <div className={!e.profile_complete?"completeBtn":" completeBtn trialCompleteBtn"}>{!e.profile_complete?'Mark as completed':<Spinner animation="border" variant="light" size="sm" />}</div>
//               </div>
//               <div className="cardDetailsWrapper">
//                   <div className="cardDetail">
//                     <div className="cardDetailParameter">Name:</div>
//                     <div className="cardDetailValue">{e.first_name}&nbsp;{e.last_name.charAt(0)}</div>
//                   </div>

//                   <div className="cardDetail">
//                     <div className="cardDetailParameter">Email:</div>
//                     <div className="cardDetailValue">{e.email}</div>
//                   </div>

//                   <div className="cardDetail">
//                     <div className="cardDetailParameter">Mobile:</div>
//                     <div className="cardDetailValue">{e.phone}</div>
//                   </div>

//                   <div className="cardDetail">
//                     <div className="cardDetailParameter">Designation:</div>
//                     <div className="cardDetailValue">{e.designation}</div>
//                   </div>

//                   <div className="cardDetail">
//                     <div className="cardDetailParameter">Company:</div>
//                     <div className="cardDetailValue">{e.company}</div>
//                   </div>

//                   <div className="cardDetail">
//                     <div className="cardDetailParameter">Domain:</div>
//                     <div className="cardDetailValue">Trading Scores</div>
//                   </div>

//               </div>
//               <div className="cardBottom">
//                 <Link to={e.id.toString()} className="viewIcon cardBottomIcon"><AiOutlineEye/></Link>
//                 <Link to={'edit/'+e.id.toString()}className="editBtn cardBottomIcon">Edit</Link>

//               </div>
//             </div>
      
//         ))}

//         </div>

//       <Pagination
//       defaultCurrent={1}
//       defaultPageSize={val}
//       onChange={handlePaginationChange}
//       total={data.length}
//     />

      
//       </>:<div className='fullHeightCenter'><Spinner animation="border" variant="secondary"  /></div>}
           

//         </div>
//     </div>
//   )
// }
const MetaExpert=()=>{
  return<></>
}
export default MetaExpert