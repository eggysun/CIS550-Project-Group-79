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
<<<<<<< HEAD
      <img className="d-block w-100" src={ Banner1 } alt="Philadelphia"/>
      <div class="carousel-caption">
        <h1 style={{ fontSize: '50px'}}>Philadelphia</h1>
      </div>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src={ Banner2 } alt="Food" />
      <div class="carousel-caption">
      <h1 style={{ fontSize: '50px'}}>Food</h1>
      </div>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src={ Banner3 } alt="Places" />
      <div class="carousel-caption" >
        <h1 style={{ fontSize: '50px'}} >Dining</h1>
      </div>
    </div>
  </div>

  
=======
      <img className="d-block w-100" src={ Banner1 } alt="..."/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src={ Banner2 } alt="..."/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src={ Banner3 } alt="..."/>
    </div>
  </div>
>>>>>>> b3e855aa08e4dd8e66f8f371954c4d2c47b83f07
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

