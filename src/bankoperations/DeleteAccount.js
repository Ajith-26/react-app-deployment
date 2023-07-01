import React from "react";
import BankApi from "../api/BankApi";
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import {Prompt} from 'react-router-dom';

const AccountValidationSchema = Yup.object().shape({
    accNo: Yup.number()
    .required("Account No is required")
});
function DeleteAccount(){
    const deleteAllAccs = () => {
        BankApi.deleteAllAccounts()
                .then(res => alert(res.data))
                .catch(err => alert(err?.response?.data?.message))
    }
    return(
        <div className="container">
            <Formik
                initialValues={{accNo: ""}}
                validationSchema={AccountValidationSchema}
                onSubmit={(values)=>{
                    console.log(values);
                    BankApi.deleteAccountByAccNo(values.accNo)
                            .then(res => alert(res?.data))
                            .catch(err => alert(err?.response?.data?.message))
                }}      
            >
            {({touched, errors, isSubmitting, values}) =>
                <div className='styleForm container'>
                    <div style={{textAlign: 'center'}}>
                        <h1 style={{color:'brown'}} className="mt-2">Delete Account(s)</h1>
                    </div>
                    <Form>
                        <div>
                            <div className="mb-3 row">
                                <label htmlFor="accNo" className="col-sm-3 col-form-label">Account No</label>
                                <div className="col-sm-6">
                                    <Field className ="form-control" id="accNo" type="number" name="accNo" placeholder="accountNo"/>
                                    {touched.accNo && errors.accNo && <div style={{color: 'red'}}>{errors.accNo}</div>}
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="mb-3 btn btn-primary">Delete Account</button>
                    </Form>
                    <button type="submit" onClick={()=> deleteAllAccs()} className="mb-3 btn btn-primary">Delete Accounts</button>
                    <Prompt message ={"Are you sure want to go back"} when = {touched?true:false}/>
                    </div>
                }
                </Formik>
        </div>
    );
}
export default DeleteAccount