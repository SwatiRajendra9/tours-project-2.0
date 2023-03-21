import React, { useEffect, useState } from "react";
import './App.css';
import axios from "axios";




function Tours_useeffect() {

  let [toursArray,setToursArray] = useState();
  let [slicedInfo,readMoreInfo] = useState(true);
  let [gotResponse,setGotResponse] = useState(false);
  let [showDivArray,setShowDivArray] = useState([true,true,true,true,true]);
  let [showRefreshButton,setShowRefreshButton] = useState(false);
  


 useEffect(()=> {
  axios({
    method : 'get',
    url : 'https://course-api.com/react-tours-project'
  }) 
  
  .then((response) => {
    if(gotResponse === false) {
      setToursArray(response.data);
      setGotResponse(true);
    }
  }) 
 })
 
  return(
    gotResponse ?
    <div id='main'>
    <h1>Our Tours</h1>
      
      <div id='package'>
        
        
        {toursArray.map((element,index) => (
          showDivArray[index] ?
          <div id='tour-package'>
              
              <img id='image' src={element.image} alt={''}></img>
              <div id='price'>{element.price}</div>
              <div id='name'>{element.name}</div>
              <div id='info'>{slicedInfo ? element.info.slice(0,300) : element.info}
                  <button id='read-more'onClick={toggle}>{slicedInfo ? '...Read more' : 'Show less'}</button>
              </div>
              <button id='no-interest' onClick={() => disappear(index)}>Not Interested</button> 
                      
          </div> : null
        )) 
        }

        {showRefreshButton ? <button id='refresh' onClick={refresh}>Refresh</button> : null }
      
      </div>
    </div> : <h1>Loading...</h1> 
  )

  function toggle() {
    if(slicedInfo === true) {
        readMoreInfo(slicedInfo=false);
    }
    else {
        readMoreInfo(slicedInfo=true);
    }
  }

  function disappear(pos) {
    let arr=[];
    arr = [...showDivArray];
    console.log(showDivArray);
    if(showDivArray[pos] === true) {
      arr[pos] = false;
      console.log(showDivArray)
      setShowDivArray(arr);
    }
    if(pos===4) {
      setShowRefreshButton(true);
    }
    
  }

  function refresh() {
    window.location.reload();
  }

  

  


}

export default Tours_useeffect;