import React from 'react';
import Banner1 from '../components/1.jpg';
import Banner2 from '../components/2.jpeg';
import Banner3 from '../components/3.jpeg';

function Banner() {
  return (
    <React.Fragment>
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100" src={ Banner1 } alt="..."/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src={ Banner2 } alt="..."/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src={ Banner3 } alt="..."/>
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>
</React.Fragment>

  );
}

export default Banner;

