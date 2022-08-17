import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { stringifyData } from '../../functions'
import { updateEmpanelments } from '../../redux/actions/empanelment'
const ConfirmModal = ({parentCallback,closeParent}) => {
  const currentRecord=useSelector(state=>state.empanelments.currentrecord)
  const dispatch=useDispatch()


  return (
    <div className="newRecordModal confirmModal">
           <div className="newRecordModalTop">Confirm your action <div className="modalCloseBtn" onClick={()=>closeParent()}>X</div></div>

           <div className="confirmModalDetails">
             <h3 className="confirmModalDesc">Are you sure you want to refuse this empanelment?</h3>
           </div>
           <div className="confirmModalButtonWrapper">
             <div className="failureBtn confirmModalBtn" onClick={()=>closeParent()}>Cancel</div>
             <div className="successBtn confirmModalBtn" onClick={()=>parentCallback()}>Refuse</div>
           </div>
    </div>
  )
}

export default ConfirmModal