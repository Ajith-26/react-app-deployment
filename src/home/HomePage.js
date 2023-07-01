import React from 'react';
import {Link} from 'react-router-dom';
import Carousel from './Carousel';
import '../css/Styles.css'
function HomePage() {
  return (
    <div className='container my-2'>
        <div className='row'>
            <h1 className='mt-4 welcomeText'>Welcome to AJ banking application</h1>
        </div>
        <marquee style={{color:'green'}}>Hello All!!! Welcome to our AJ banking application</marquee>
        <Carousel/>
        <div className='row serviceStyle'>
            <h3>Services we provide</h3>
            <div className='row'>
                <div className='col-sm-4'>
                    <Link to ="/allaccounts" className='btn btn-info mt-2 btnSize'>View all accounts</Link><br></br>
                </div>
                <div className='col-sm-4'>
                    <Link to ="/createAcc" className='btn btn-info mt-2 btnSize'>Create Account</Link><br></br>
                </div>
                <div className='col-sm-4'>
                    <Link to ="/depositAmount" className='btn btn-info mt-2 btnSize'>Deposit Amount</Link><br></br>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-sm-4'>
                    <Link to="/viewBalance" className="btn btn-info my-2 btnSize">View Balance</Link>
                </div>
                <div className='col-sm-4'>
                    <Link to="/fundsTransfer" className="btn btn-info my-2 btnSize">Funds Transfer</Link>
                </div>
                <div className='col-sm-4'>
                    <Link to="/deleteAccount" className="btn btn-info my-2 btnSize">Delete Account(s)</Link>
                </div>
            </div>
        </div>
    </div>
  )
}
export default HomePage;