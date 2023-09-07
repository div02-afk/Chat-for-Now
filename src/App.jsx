// import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import data from './contacts.json'
import React, { useState, useEffect } from 'react';

function Contacts() {

  // useEffect(() => {
  //   // Fetch and load the JSON data when the component mounts
  //   fetch('contacts.json')
  //     .then((response) => response.json())
  //     .then((jsonData) => setData(jsonData))
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, []);

  return (
    <div>
      {Object.keys(data).map((key) => (
        <div key={key} className='contact'>
          <h2>{data[key]["name"]}</h2>
          <p>{data[key]["phone"]}</p>
          {console.log(data[key])}
          {/* Add more elements based on your JSON structure */}
        </div>
      ))}
    </div>
  );
}

class Chat extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <></>
    )
  }

}
class Contactlist extends React.Component{
  constructor(props){
    super(props)
    
  }
  render(){
    return(
        <div className='contacts'>
                <input type="search" className='search form-control'></input>
                <div class = "contact-list">
                <Contacts />
                </div>
                
              </div>
      
    )
  }
}

class App extends React.Component{
  constructor(props){
    super(props)
    
  }
  render(){
    return(
        <div className='outer'>
          <Contactlist />
          <div className='chats'>
            <div className='un-selected text-center'>
              Welcome to Chat!!
            </div>
          </div>
        </div>
      
    )
  }
}

export default App
