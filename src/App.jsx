// import { useState } from 'react'
import { createSlice, configureStore } from '@reduxjs/toolkit'
import ReactDOM from 'react-dom/client'
import './App.css'
import data from './contacts.json'
import chatData from './chat.json'
import React, { useState, useEffect } from 'react';

const initialState = {key:"123456789"}

function keyReducer(state = initialState,action){
  if (action.type === 1){
     return{
      ...state,
      key:action.key
     }
  }
  else return state
}

const store = configureStore({reducer:keyReducer})
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state={
      val:""
    }
  }
  
  render(){
    const change = ()=>{
      this.setState({
        val:store.getState().key
      })
    }
    store.subscribe(change)
    const contactData = chatData[(store.getState().key)]
    console.log(store.getState().key)
    return(
      
      <div className="chat">
        {Object.keys(contactData).map((item) =>(
          <div key={item} className={contactData[item]["type"] ==="recieved"?"recieved":"sent"}>
            <h3 className='text-message'>{contactData[item]["message"]}</h3>
          </div>
        ))}
      </div>
      
    )
  }
  

}
class Contactlist extends React.Component{
  constructor(props){
    super(props)
    this.state={
      key:1
    }
    this.handleClick = this.handleClick.bind(this)
    this.Contacts = this.Contacts.bind(this)
    // this.handleReturn = this.handleReturn.bind(this)
  }
  handleClick(keys){
    this.setState({
      key:keys
    })
    const keyHandler = {
      type:1,
      key:keys
    }
    store.dispatch(keyHandler)
    console.log("clicked")
    // console.log(store.getState())
    
    
  }
  handleReturn(){
    console.log(this.state.key)
    return this.state.key
  }
  Contacts() {
    return (
      <div>
        {Object.keys(data).map((key) => (
          <div key={key} id = {key} onClick={()=>this.handleClick(key)} className='contact'>
            <h2>{data[key]["name"]}</h2>
            <p>{data[key]["phone"]}</p>
            
            {/* Add more elements based on your JSON structure */}
          </div>
        ))}
      </div>
    );
  }
  render(){
    return(
        <div className='contacts'>
                <input type="search" className='search form-control'></input>
                <div class = "contact-list">
                <this.Contacts />
                </div>
              </div>
    )
  }
}

class App extends React.Component{
  constructor(props){
    super(props)
    // this.state = {
    //   key : Contactlist.handleReturn
    // }
  }
  render(){

    return(
        <div className='outer'>
          <Contactlist />
          <div className='chats'>
            
             
              <Chat />

          </div>
        </div>
    )
  }
}

export default App