import {Formik, Form, Field} from 'formik'
import { useState } from "react";
import DialogBoxSuccess from "../modalboxes/DialogBoxSuccess";
import * as Yup from 'yup'
import BankApi from '../api/BankApi';

const AccountValidationSchema = Yup.object().shape({
    accNo: Yup.number()
        .required("Account No is required"),
    amount: Yup.number()
        .required("Amount is required")
        .min(10, "Minimum amount to be deposited must be greater than 10")
})
function DepositAmount(){
    const [message, setmessage] = useState(false);
    return(
        <div className="container">
            <Formik
                initialValues={{accNo: "", amount: ""}}
                validationSchema={AccountValidationSchema}
                onSubmit={(values) => {
                    console.log(values);
                    BankApi.depositAmount(values.accNo, values.amount)
                            .then(res =>{
                                console.log(res)
                                setmessage(true);
                            })
                            .catch(err => {
                                alert('Account No doesn\'t exist');
                            })  
                }}
                >
                {({touched, errors, isSubmitting, values}) =>
                    <div className="styleForm container">
                        <div style={{textAlign: 'center'}}>
                            <h1 style={{color: 'brown'}} className="mt-4">Deposit Amount in Account</h1>
                            {/* <img src={deposit} className="my-2 depImg" alt="Deposit Amount" height='300px'/> */}
                        </div>
                        <Form>
                            <div>
                                <div className="mb-3 row">
                                    <label htmlFor="accNo" className="col-sm-3 col-form-label">Account No</label>
                                    <div className="col-sm-6 col-10">
                                        <Field className="form-control" id="accNo" type ="number" name="accNo" placeholder="account no"/>
                                        {touched.accNo && errors.accNo && <div style={{color: 'red'}}>{errors.accNo}</div>}
                                    </div>
                                </div> 
                                <div className="mb-3 row">
                                    <label htmlFor="amount" className="col-sm-3 col-form-label">Amount</label>
                                    <div className="col-sm-6 col-10">
                                        <Field className="form-control" id="amount" type ="number" name="amount" placeholder="amount"/>
                                        {touched.amount && errors.amount && <div style={{color: 'red'}}>{errors.amount}</div>}
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="mb-3 btn btn-primary">Deposit amount</button>
                        </Form>
                        {message && <DialogBoxSuccess setMessage = {setmessage} amount={values.amount} transferFunds ={false}/>}
                    </div>
                }    
                </Formik>
        </div>
    )
}
export default DepositAmount