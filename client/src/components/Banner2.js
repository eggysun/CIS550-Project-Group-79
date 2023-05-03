import React from 'react';
import Banner4 from '../components/4.jpeg';
import Banner5 from '../components/5.jpeg';
import Banner6 from '../components/6.jpeg';

function Banner() {
  return (
    <React.Fragment>
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100" src={ Banner4 } alt="Philadelphia"/>
      <div class="carousel-caption">
      <h1 style={{ fontSize: '50px'}}>Restaurant</h1>
      </div>
    </div>

    <div className="carousel-item">
      <img className="d-block w-100" src={ Banner5 } alt="Food"/>
      <div class="carousel-caption">
      <h1 style={{ fontSize: '50px'}}>Market</h1>
      </div>
    </div>

    <div className="carousel-item">
      <img className="d-block w-100" src={ Banner6 } alt="Places"/>
      <div class="carousel-caption">
      <h1 style={{ fontSize: '50px'}} >Tourism</h1>
      </div>
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

