import React from "react";
import Modal from 'react-bootstrap/Modal';
function DialogBoxSuccess({setMessage, amount, tranferFunds}){
    let msg = '';
    if(tranferFunds)
        msg = 'Congratulations your amount Rs.'+amount+' is successfully transferred';
    else
        msg = 'Congratulations your amount Rs.'+amount+' is deposited successfully';
    return(
        <Modal show = {true}>
            <Modal.Header style = {{backgroundColor: 'azure'}}>
                <h4 className="modal-title text-danger fw-bold">{'Success'}</h4>
                <button type="button" className="btn-close" onClick={() => setMessage(false)} aria-label="Close"></button>
            </Modal.Header>
            <Modal.Body style={{backgroundColor:"azure"}}>
                <h3 style={{color:"green"}}>{msg}</h3>
            </Modal.Body>
            <Modal.Footer style={{backgroundColor: "azure"}}>
                <button type="button" className="btn btn-primary text-center mx-auto" data-bs-dismiss="modal" onClick={()=>setMessage(false)}>OK</button>
            </Modal.Footer>
        </Modal>
    );
}
export default DialogBoxSuccess