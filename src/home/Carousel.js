import React from "react";
import '../css/Styles.css';
import img1 from '../assets/image1.jpg';
import img2 from '../assets/image2.jpg';
import img3 from '../assets/image3.png';
function Carousel(){
    return(
        <div id = "demo" className="carousel slide" data-bs-ride="carousel">
            {/* <!-- indicators/dots --> */}
            <div className="carousel-indicators">
                <button type="button" style ={{backgroundColor:'black'}} data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
                <button type="button" style ={{backgroundColor:'black'}} data-bs-target="#demo" data-bs-slide-to="1"></button>
                <button type="button" style ={{backgroundColor:'black'}} data-bs-target="#demo" data-bs-slide-to="2"></button>
            </div>
            {/* <!-- The slideshow/carousel --> */}
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={img1} alt="Image1" height='440px' className="d-block w-100"/>
                </div>
                <div className="carousel-item">
                    <img src= {img2} alt="Image2" height = '440px' className="d-block w-100"/>
                </div>
                <div className="carousel-item">
                    <img src= {img3} alt ="Image3" height= '440px' className="d-block w-100"/>
                </div>
            </div>
            {/* <!-- Left and right controls/icons --> */}
            <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                <span className="carousel-control-prev-icon"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                <span className="carousel-control-next-icon"></span>
            </button>
        </div>
    );
}
export default Carousel;