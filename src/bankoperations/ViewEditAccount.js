import React,{useEffect, useState} from "react";
import BankApi from "../api/BankApi";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import '../css/Styles.css';
function ViewEditAccount(){
    const history = useHistory();
    const [accs, setaccs] = useState([]);
    useEffect(() => {
        BankApi.fetchAllAccounts()
                .then(res => setaccs(res))
                .catch(err => alert(err));
    }, []);
    if(accs && accs.length !== 0){
        const editDetails = (values) => {
            history.push("/createAcc", {editOp:true, formValues: values});
        }
        return(
            <div className="container" style={{textAlign: 'center'}}>
                <h1 className='text-danger my-2 mx-2' style={{fontFamily:'Arial'}}>Accounts</h1>
                {/* <img src ={accounts} style={{border:'4px solid #555'}} height='240px' alt="Accounts pic"/> */}
                <div className="row">
                    {accs.map(acc => {
                        return(
                            <div className="col-12 col-sm-6 col-lg-4">
                                <div className="card my-2 border border-dark rounded mx-auto" height="150px" style={{maxWidth: "350px"}}>
                                    <div className="card-header bg-light">
                                        <h2 style={{fontFamily:'Arial'}}>A/c No: {acc.accountNo}</h2>
                                    </div>
                                    <div className="card-body" style={{backgroundColor: '#ccffcc'}}>
                                        <h2 className="card-title amountStyle">Rs. {acc.accountBalance}</h2>
                                        <h4 className="card-subtitle text-danger text-truncate">{acc.customerName}</h4>
                                        <h4 className="card-subtitle text-success">{acc.customerEmailId}</h4>
                                        <h4 className="card-subtitle text-dark">{acc.customerMobileNo}</h4>
                                    </div>
                                    <div className="card-footer bg-light">
                                        <button type="button" onClick={() => editDetails(acc)} className="btn btn-light" style={{width:'100%'}}>Edit</button>         
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
    else{
        return(
            <div style={{textAlign: 'center'}}>
                <h2 className="text-danger">Oops.. No Accounts found</h2>
                {/* <img src={oops} height='440px' alt="No accounts found"/> */}
            </div>
        )
    }
}
export default ViewEditAccount;