import React, {useState} from "react";
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup'
import BankApi from '../api/BankApi';
import '../css/Styles.css';
import DialogBoxSuccess from "../modalboxes/DialogBoxSuccess";
const AccountValidationSchema = Yup.object().shape({
    fromAccNo: Yup.number()
                .required("Account No to be debited is required"),
    toAccNo: Yup.number()
                .notOneOf([Yup.ref('fromAccNo'),null], 'From Account No and To Account No can\'t be same')
                .required("Account No to be credited is required"),
    amount: Yup.number()
            .required("Amount is required")
            .min(10, "Minimum amount to be transferred must be greater than 10")
});
function FundsTransfer(){
    const[message, setmessage] = useState(false);
    return(
        <div className="container" style={{height:'400px', flex:1, justifyContent: 'center'}}>
            <Formik
                initialValues={{fromAccNo:"", toAccNo: "", amount: ""}}
                validationSchema={AccountValidationSchema}
                onSubmit={(values)=>{
                    console.log(values);
                    BankApi.fundsTransfer(values.fromAccNo, values.toAccNo, values.amount)
                            .then(res =>{
                                console.log(res.data);
                                setmessage(true);
                            })
                            .catch(err => alert(err.response?.data?.message))
                }}
            >
            {({touched, errors, isSubmitting, values}) =>
                <div className="styleForm">
                    <div style={{textAlign: 'center'}}>
                        <h1 className="text-danger">Funds Transfer</h1>
                        {/* <img src={fundstransfer} height='340px' className="fundTrans" alt="FundsTransfer"></img> */}
                    </div>
                    <Form>
                        <div>
                            <div className="my-3 row">
                                <label htmlFor="fromAccNo" className="col-sm-3 col-form-label">From Account no</label>
                                <div className="col-sm-6 col-10">
                                    <Field className="form-control" id="fromAccNo" type="number" name="fromAccNo" placeholder="account no"/>
                                    {touched.fromAccNo && errors.fromAccNo && <div style={{color: 'red'}}>{errors.fromAccNo}</div>}
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="toAccNo" className="col-sm-3 col-form-label">To Account no</label>
                                <div className="col-sm-6 col-10">
                                    <Field className="form-control" id="toAccNo" type="number" name="toAccNo" placeholder="account no"/>
                                    {touched.toAccNo && errors.toAccNo && <div style={{color: 'red'}}>{errors.toAccNo}</div>}
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="amount" className="col-sm-3 col-form-label">Amount</label>
                                <div className="col-sm-6 col-10">
                                    <Field className="form-control" id="amount" type="number" name="amount" placeholder="amount"/>
                                    {touched.amount && errors.amount && <div style={{color: 'red'}}>{errors.amount}</div>}
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="mb-3 btn btn-primary">Transfer Amount</button>
                    </Form>
                    {message && <DialogBoxSuccess setMessage={setmessage} amount={values.amount} tranferFunds={true}/>}
                </div>
            }
            </Formik>
        </div>
    )
}
export default FundsTransfer;