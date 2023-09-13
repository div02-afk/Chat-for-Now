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
    // console.log(store.getState().key)
    return(
      <div className="chat">
        {Object.keys(contactData).map((item) =>(
          <div key={item} className={contactData[item]["type"] ==="recieved"?"recieved":"sent"}>
            <div className={contactData[item]["type"] ==="recieved"?"message recieved":"message sent"}><h3>{"   "+contactData[item]["message"]+"   "}</h3>
          </div>
          </div>
        ))}
      </div>
      
    )
  }
  

}
class ContactName extends React.Component{
  constructor(props){
    super(props)
    this.state={
      name:""
    }
  }
  render(){
    const change = ()=>{
      this.setState({
        name:store.getState().key
      })
    }
    store.subscribe(change)
    return(
      <div className='contact-name'>
        <h2>{data[store.getState().key]["name"]}</h2>
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
                <input type="search" className='search form-control input'></input>
                <div class = "contact-list">
                <this.Contacts />
                </div>
              </div>
    )
  }
}

class Message extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className='send-message'>
        <input type='text' className='form-control input type-message'></input>
        <button className='btn btn-primary'><i class="fa-solid fa-paper-plane fa-lg" style={{"color": "#ffffff"}}></i></button>      </div>
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
          <div className='message-place'>
            <ContactName/>
            <div className='chats'>
              <Chat />
              <Message/>
            </div>
          </div>
          
        </div>
    )
  }
}

export default App