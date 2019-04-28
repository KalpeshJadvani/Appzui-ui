import React, { Component } from 'react';
import './App.css';
import Caclulate from './components/Caclulate';
import Result from './components/Result';
import axios from 'axios';
class App extends Component {

  constructor(){
    super()
    this.state ={
      data:[],
    }
   this.refreshData = this.refreshData.bind(this);
  }

  componentDidMount(){
    this.refreshData();  
  }
  refreshData(){
     // fetch("/api")
        // .then(response => response.json())
        // .then(data => this.setState({ data: data }));
        axios
        .get(`/api`)
        .then(res => {
            //console.log("@@@@", res)
            this.setState({
                data:res.data,
            });
        })
        .catch(err => {
            console.log("err", err)
        });
  }
  

  render() {
    return (
      <div className="App">
          <Caclulate refreshData={this.refreshData }/>
          <Result  data = {this.state.data}/>
      </div>
    );
  }
}

export default App;
