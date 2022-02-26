import React, { useState, useEffect, useRef } from "react";
import ButtonSliderDirection from "./ButtonSliderDirection";
export default function Slider() {
  const [timer, setTimer] = useState(2000);
  const [direction, setDirection] = useState("forward");
  const [images, setImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(1);
  const [changeDirection, setChangeDirection] = useState("");
  const timeoutRef = useRef(null);
  const durationTime = useRef(null);
  const nextSlide = () => {
   
    if (imageIndex !== images.length) {
      setImageIndex(imageIndex + 1);
    } else if (imageIndex === imageIndex.length) {
      setImageIndex(1);
    }
  };

  const prevSlide = () => {
      
    if (imageIndex !== 1) {
      setImageIndex(imageIndex - 1);
    } else if (imageIndex === 1) {
        
      setImageIndex(images.length);
   
    }
   
  };

  const moveDot = (index) => {
    setImageIndex(index);
  };
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  useEffect(() => {
    // https://demo5110359.mockable.io/images
    // make the auto slides using the time input
    const apiCall = async () => {
      var myHeaders = new Headers();
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      const result = await fetch(
        "https://demo5110359.mockable.io/images",
        requestOptions
      );

      const res = await result.json();
      setImages(res.images);
    };
    apiCall();
  }, []);
  useEffect(() => {
  
    if (direction === "forward") {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () =>
          setImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
          ),
        timer
      );

     

      return () => {
        resetTimeout();
      };
    } else {
      //
        resetTimeout();
      timeoutRef.current = setTimeout(
        () =>
          setImageIndex((prevIndex) =>
          prevIndex !== 1 ? prevIndex - 1 : images.length
          ),
        timer
      );
      
        return () => {
          resetTimeout();
        };
    }
  }, [imageIndex, timer, direction]);

  const handleSettingChange = (e) => {
    e.preventDefault();
   
    if (direction !== changeDirection) {
      setDirection(changeDirection);
    }
    
    if(durationTime.current.value!=="")
    {
    setTimer(Number(durationTime.current.value) * 1000);
    }
  };
  return (
    <>
      <div className="container-slider">
        {images.map((img, index) => {
          return (
            <div
              className={
                imageIndex === index + 1 ? "slide active-anim" : "slide"
              }
              key={index}
            >
              <img src={img} alt="" />
            </div>
          );
        })}
        <ButtonSliderDirection moveSlide={nextSlide} direction={"next"} />
        <ButtonSliderDirection moveSlide={prevSlide} direction={"prev"} />
        <div className="container-dots">
          {Array.from({ length: images.length }).map((item, index) => (
            <div
            key={index}
              onClick={() => moveDot(index + 1)}
              className={imageIndex === index + 1 ? "dot active" : "dot"}
            ></div>
          ))}
        </div>
      </div>

      <div className="actionChange" style={{textAlign:"center",marginTop:"20px"}}>
        <p>
          Duration: <input type={"number"} ref={durationTime}></input>
        </p>
        <p>
          Direction:
          <input
            type="radio"
            id="forward"
            name="fav_language"
            value="forward"
            onChange={(e) => setChangeDirection("forward")}
            checked={direction==="forward"?true:false}
          />
            <label htmlFor="forward">Forward</label> {" "}
          <input
            type="radio"
            id="reverse"
            name="fav_language"
            value="reverse"
            onChange={(e) => setChangeDirection("reverse")}
            checked={direction==="reverse"?true:false}
          />
            <label htmlFor="reverse">Reverse</label>
        </p>
        <button onClick={handleSettingChange}>Submit</button>
      </div>
    </>
  );
}
