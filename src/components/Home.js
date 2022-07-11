import React from "react";
import './Home.scss'
import noteImg from '../assets/note.png'

const Home = () => {
  return (
    <div className="home-wrapper">
      <div className="intro-container">
        <h1>
          Access your Notes <br />
          from Anywhere <br />
          on any device
        </h1>
        <p>Now save your notes on cloud and access anytime</p>
        <button>Get started</button>
      </div>
      <div className="noteImg">
            <img src={noteImg} alt="" />
      </div>
    </div>
  );
};

export default Home;
