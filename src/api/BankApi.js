import axios from 'axios';
const baseUrl = "http://localhost:8899/account-mgmt";
export default class BankApi{
    static fetchAllAccounts(){
        const response = axios.get(baseUrl+"/all")
                            .then(res =>{
                                console.log(res.data);
                                return res.data;
                            })
                            .catch(err => console.log(err?.response?.data))
        console.log(response)
        return response;
    }

    static depositAmount(accNo, amount){
        const response = axios.post(baseUrl+"/depositAmount/"+accNo,{
            accountNo:accNo,
            amountToBeDeposited: amount
        });
        console.log(response);
        return response;
    }

    //"/getBalance/{accNo}"
    static viewBalance(accNo){
        const response = axios.get(baseUrl+"/getBalance/"+accNo);
        console.log(response);
        return response;
    }

    //"/account"
    static saveAccount(accDetails){
        const response = axios.post(baseUrl+"/account", accDetails);
        console.log(response);
        return response;
    }

    //"/transferAmount/{senderAccountNo}/{receiverAccountNo}/{amountToBeTransferred}"
    static fundsTransfer(senderAccountNo, receiverAccountNo, amountToBeTransferred){
        const response = axios.put(baseUrl+ "/transferAmount/"+senderAccountNo+"/"+receiverAccountNo+"/"+amountToBeTransferred);
        console.log(response);
        return response;
    }

    static deleteAccountByAccNo(accNo){
        const response = axios.delete(baseUrl +"/"+accNo);
        console.log(response);
        return response;
    }

    static deleteAllAccounts(){
        const response = axios.delete(baseUrl +"/all");
        console.log(response);
        return response;
    }

    static editCustomerNameByAccNo(accNo, customerName){
        const response = axios.put(baseUrl+"/name/"+accNo+"/"+customerName);
        console.log(response);
        return response;
    }

    static editCustomerMobileNoByAccNo(accNo, customerMobileNo){
        console.log(accNo);
        console.log(customerMobileNo);
        const response = axios.put(baseUrl+"/mobileNo/"+accNo+"/"+customerMobileNo);
        console.log(response);
        return response;
    }

    static editCustomerEmailIdByAccNo(accNo, customerEmailId){
        const response = axios.put(baseUrl +"/emailId"+accNo+"/"+customerEmailId);
        console.log(response);
        return response;
    }
}