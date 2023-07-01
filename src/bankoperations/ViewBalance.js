import React,{useState} from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import BankApi from "../api/BankApi";
import DialogBoxBalance from "../modalboxes/DialogBoxBalance";
const AccountValidationSchema = Yup.object().shape({
    accNo: Yup.number()
        .required("Account No is required")
})
function ViewBalance(){
    const[msg, setmsg] = useState(' ');
    const[message, setmessage] = useState(false);
    return(
        <div className="container" style={{height: '400px', flex:1, justifyContent:'center'}}>
            <Formik
                initialValues={{accNo: ""}}
                validationSchema={AccountValidationSchema}
                onSubmit={(values) =>{
                    console.log(values);
                    BankApi.viewBalance(values.accNo)
                            .then(res => {
                                setmsg(res.data);
                                console.log(res);
                                console.log(msg);
                                setmessage(true);
                            })
                            .catch(err =>{
                                console.log('Error');
                                console.log(err?.response)
                                alert(err?.response?.data?.message);
                            }) 
                }}
            >
            {({touched, errors, isSubmitting, values}) => 
                <div className="styleForm">
                    <div style={{textAlign: 'center'}}>
                        <h1 style={{color: 'brown'}} className="mt-4">View Balance</h1>
                    </div>                    
                    <Form>
                        <div>
                            <div className="mb-3 row">
                                <label htmlFor="accNo" className="col-sm-3 col-form-label">Account No</label>
                                <div className="col-sm-6">
                                    <Field className="form-control" id="accNo" type="number" name="accNo" placeholder="account no"/>
                                    {touched.accNo && errors.accNo && <div style={{color:'red'}}>{errors.accNo}</div>}
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="mb-3 btn btn-primary">Check Balance</button>
                    </Form>
                    {message && <DialogBoxBalance setMessage={setmessage} msg={msg}/>}
                </div>    
            }
            </Formik>
        </div>
    )
}
export default ViewBalance