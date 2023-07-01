import React from "react";
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import {Prompt} from 'react-router-dom';
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import BankApi from "../api/BankApi";
const AccountValidationSchema = Yup.object().shape({
    customerName: Yup.string()
        .required("Customer name is required")
        .min(3, "Customer name must contain atleast 3 characters")
        .matches(/^[A-Z]{1}[a-zA-Z]* [a-zA-Z]+$/,"Must contain only alphabet, first character should be caps, should be in format {firstname lastname}"),
    customerEmailId:Yup.string()
        .email("Invalid email id")
        .matches(/^[a-zA-Z]{1}[a-zA-Z0-9.]+@abc.com$/, "Email id should be in the form xxx@abc.com and first letter character should be alphabet")  
        .required("Customer mail-id is required"),
    customerMobileNo: Yup.string()
        .required("Mobile No is required")
        .length(10, "Mobile number must contain 10 digits")
        .matches(/[6-9]{1}[0-9]{9}/,"Only digits are allowed and first digit should be 6 or 7 or 8 or 9"),
    accountType: Yup.string()
        .required("Account type is required")   

});
function CreateAccount(){
    const location = useLocation();
    let editOp = false;
    let formValues = {};
    let initValues = {customerName:"", customerEmailId:"", customerMobileNo:"", accountType:""};
    if(location.state?.editOp)
        editOp = location.state.editOp;
    if(location.state?.formValues){
        formValues = location.state.formValues;
        initValues = {customerName: formValues.customerName, customerEmailId: formValues.customerEmailId, customerMobileNo: formValues.customerMobileNo, accountType: formValues.accountType}
    }
    console.log(editOp);
    console.log(formValues);
    const editOperation = (vals) => {
        if(vals.customerEmailId === formValues.customerEmailId && vals.customerMobileNo === formValues.customerMobileNo && vals.customerName === formValues.customerName){
            alert("Updated...");
        }
        if(vals.customerEmailId !== formValues.customerEmailId){
            //update emailId
            BankApi.editCustomerEmailIdByAccNo(formValues.accountNo, vals.customerEmailId)
                    .then(res => alert(res.data))
                    .catch(err => alert(err.response.data.message))
        }
        if(vals.customerMobileNo !== formValues.customerMobileNo){
            //update mobileNo
            BankApi.editCustomerMobileNoByAccNo(formValues.accountNo, vals.customerMobileNo)
                    .then(res => alert(res.data))
                    .catch(err => alert(err.response.data.message))
        }
        if(vals.customerName !== formValues.customerName){
            //update customer name
            BankApi.editCustomerNameByAccNo(formValues.accountNo, vals.customerName)
                    .then(res => alert(res.data))
                    .catch(err => alert(err.response.data.message))
        }
    }
    return(
        <div className="container" style ={{height:'400px',flex:1,justifyContent:'center'}}>
            <Formik
                initialValues={initValues}
                validationSchema={AccountValidationSchema}
                onSubmit={(values)=>{
                    console.log(values);
                    editOp? (editOperation(values)) :(BankApi.saveAccount(values)
                            .then(res => alert('Account created successfully and your account No is' +res.data.accountNo))
                            .catch(err => alert(err.response.data.message)));
                }}
            >
                {({touched, errors, isSubmitting, values}) =>
                    <div className='styleForm'>
                    <h3 style={{fontFamily:'sans-serif'}} className="my-3">{editOp? 'Edit Account holder details' : 'Create Account'}</h3>
                    <Form>
                        <div>
                            <div className="mb-3 row">
                                <label htmlFor="customerName" className="col-sm-3 col-form-lable">Customer Name</label>
                                <div className="col-sm-6 col-10">
                                    <Field className ="form-control" id="customerName" type="text" name="customerName" placeholder="firstname lastname"/>
                                    {touched.customerName && errors.customerName && <div style={{color: 'red'}}>{errors.customerName}</div>}
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="customerEmailId" className="col-sm-3 col-form-lable">Customer Mail-Id</label>
                                <div className="col-sm-6 col-10">
                                    <Field className ="form-control" id="customerEmailId" type="email" name="customerEmailId" placeholder="customer mail-Id"/>
                                    {touched.customerEmailId && errors.customerEmailId && <div style={{color: 'red'}}>{errors.customerEmailId}</div>}
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="customerMobileNo" className="col-sm-3 col-form-lable">Customer Mobile No</label>
                                <div className="col-sm-6 col-10">
                                    <Field className ="form-control" id="customerMobileNo" type="text" name="customerMobileNo" placeholder="customer mobile-no"/>
                                    {touched.customerMobileNo && errors.customerMobileNo && <div style={{color: 'red'}}>{errors.customerMobileNo}</div>}
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <div id ="my-radio-group" className="mb-2 col-10">Account Type</div>
                                <div role="group" aria-labelledby="my-radio-group">    
                                    <Field className ="form-check-input" type="radio" name="accountType" value="Savings" disabled={editOp}/>
                                    <label htmlFor="accountType" className="form-check-label ms-3">Savings</label><br></br>
                                    <Field className ="form-check-input" type="radio" name="accountType" value="Current" disabled={editOp}/>
                                    <label htmlFor="accountType" className="form-check-label ms-3">Current</label><br></br>
                                    {touched.accountType && errors.accountType && <div style={{color:'red'}}>{errors.accountType}</div>}
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="mb-3 btn btn-primary">{editOp?'Submit':'Create Account'}</button>
                    </Form>
                    <Prompt message ={"Are you sure want to go back"} when = {touched?true:false}/>
                    </div>
                }
            </Formik>              
                   
        </div>
    )
}
export default CreateAccount