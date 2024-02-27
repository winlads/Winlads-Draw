import React, { useEffect, useState } from "react";
// import "./Draw.css";
import winladsGive from "../assets/draw/winlads-give2.png";
import logo from "../assets/draw/logo.png";
import Confetti from "react-confetti";
import logoColor from "../assets/draw/logo-color.png";
import congrats1 from "../assets/draw/congrats1.png";
import buttonBg from "../assets/draw/button-bg.png";
import winnersData from "../draw.json";
import ALogo from "../assets/logo.gif"
import { useLocation } from 'react-router-dom';

const Draw = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const [drawStarted, setDrawStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [winnerImg, setWinnerImg] = useState("");
  const [oldImg, setOldImg] = useState("");
  const [progress, setProgress] = useState(0);
  const [winner, setWinner] = useState(null);
  const [accessGranted, setAccessGranted] = useState(false);
   
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessKey = queryParams.get('source'); // Replace 'accessKey' with your parameter's name

    if(accessKey == "EI1QtQt2brluJPBx7RYcnWJcIWHF4Y9q8zyLxMSHBk8hAsFECh0ViivwGGl5vBsv"){
      setAccessGranted(true);
    }
    
  }, []);

  const createWeightedPool = (data) => {
    let pool = [];
    data.forEach((item) => {
      for (let i = 0; i < item.number; i++) {
        pool.push(item.name);
      }
    });
    return pool;
  };

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const startDraw = () => {
    setLoading(true);
    const intervalId = setInterval(() => {
      if (progress < 99) {
        setProgress((prev) => (prev < 99 ? prev + 1 : 100));
      } else {
        clearInterval(intervalId);
      }
    }, 50);

    setTimeout(() => {
      const pool = createWeightedPool(winnersData);
      const rmd = Math.floor(Math.random() * pool.length);
      const selectedName = pool[rmd];
      const winnerData = winnersData.find((item) => item.name === selectedName);
      setWinner(winnerData);
      setDrawStarted(true);
      setLoading(false);
    }, 5000);
  };


  if (!accessGranted) {
    return <div>Access Denied. You do not have permission to view this site.</div>;

  }


  if (loading) {
    return (
      <>
        <div className="flex items-start justify-between gap-3  lg:flex-row relative top-0 bg-black h-screen txtwhite">
          <div className="w-full flex items-center flex-col mt-10 object-center h-screen">
            <div
              style={{
                marginTop: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div className="">
                <img src={ALogo} className="h-[350px]" alt="" />
              </div>

              <div className="border-2 border-white rounded-full p-1 w-5/6">
                <div
                  className="p-1 bg-cyan-500 rounded-full"
                  style={{ width: progress + "%" }}
                ></div>
              </div>
              <span
                style={{
                  fontSize: 40,
                  fontWeight: "bold",
                  marginTop: 50,
                  marginBottom: 20,
                }}
              >
                Drawing Winner
              </span>
            </div>
          </div>
        </div>
      </>
    );
  } else if (drawStarted) {
    return (
      <>
        <div className="flex items-start min-h-screen justify-between gap-3  lg:flex-row relative top-0 bg-black txtwhite overflow-hidden ">
          {/* <img src={DrawAgBtn} alt="" onClick={() => startDraw()} style={{ position: 'absolute', zIndex: 10, right: 10, top: 10, height: 30, cursor: 'pointer' }} /> */}
          <Confetti
            style={{ overflow: "hidden" }}
            width={window.innerWidth}
            height={window.innerHeight}
          />
          <div className="w-full flex items-center  flex-col justify-center mt-10 text-center space-y-4">
            <img
              src={logo}
              className="w-1/4 absolute left-0 -translate-x-1/2 top-1/3"
            />
            <img
              src={logo}
              className="w-1/4 absolute right-0 translate-x-1/2 top-2/3"
            />
            <img src={congrats1} className="w-5/6 lg:-mb-5 pt-20" />
           
            {/* <span style={{ fontSize: 40, fontWeight: 'bold', marginTop: -20, marginBottom: 20 }}>Giveaway Winner</span>


            <span className="mt-3" style={{ fontWeight: "bold" }}>11-02-2024</span>
            <img src={Money} className="h-[200px]" alt="" /> */}

            <div className="relative w-full lg:w-2/3 no-wrap hover:hue-rotate-90 hover:brightness-75 cursor-pointer px-4 pt-12">
              {/* <img src={buttonBg} className="w-full h-full object-contain" /> */}
              <div className="py-8 px-12 border-8 border-white">
                <h3 className="text-4xl md:text-5xl xl:text-6xl font-bold">
                  {winner?.name}
                </h3>
              </div>
            </div>
            <h1 className="font-bold text-white  pt-6 uppercase text-2xl lg:text-5xl mb-5">
              FOR WINNING THIS WEEK'S MYSTERY GIFT
            </h1>

            {/* <div style={{ position: 'relative' }}>

              <img src={winnerImg} alt="" className="cursor-pointer" />
              <br /><br /><br />    <br /><br /><br />    <br />
            </div> */}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex items-center justify-between gap-3  lg:flex-row relative top-0 bg-black h-screen txtwhite overflow-hidden">
          <div className="w-full flex items-center flex-col mt-10">
            <div className="w-2/3 mx-auto mb-10">
              <img src={winladsGive} className="w-full h-full object-contain" />
            </div>
            <img
              src={logo}
              className="w-1/4 absolute left-0 -translate-x-1/2 top-1/3"
            />
            <img
              src={logo}
              className="w-1/4 absolute right-0 translate-x-1/2 top-2/3"
            />
            <button
              className="border-2 border-white py-4 px-10 text-4xl text-black rounded-xl font-extrabold bg-[#78D2E6] hover:bg-cyan-500"
              onClick={() => startDraw()}
            >
              DRAW NOW
            </button>
          </div>
        </div>
      </>
    );
  }
};
export default Draw;
