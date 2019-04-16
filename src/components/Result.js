import React, { Component } from 'react';

class Result extends Component {
    constructor(props){
        super(props);
        this.state = {
          data:[],  
        }
        this.getTabelRow = this.getTabelRow.bind(this);
    }   
    componentWillReceiveProps(props){
        this.setState({data:props.data});
    } 

    componentDidMount(){

    }
    getTabelRow(){
      const  jsx =  this.state.data.map(function(item, index) {
            return(
                <tr key={index}>
                    <td>{item.indexnumber}</td>
                    <td>{item.pairs}</td>
                    <td>{item.result}</td>
                    <td>{item.datetime}</td>
                </tr>
            );
        })
       return jsx;
    }

    render() {
        return (
            <div className="container container-custom mx-auto w-50 p-3">
                <div className="row border border-primary bg-primary border-bottom-0 " style={{ 'borderTopLeftRadius': '5px', 'borderTopRightRadius': '5px' }} >
                    <div className="col-md-12 flot-left" style={{ padding: '10px' }}>
                        <div className="text-left text-white text-bold"> LCM Calculat History </div>
                    </div>
                </div>
                <div className="row border border-primary" style={{ 'borderBottomLeftRadius': '5px', 'borderBottomRightRadius': '5px' }} >
                    <div className="col-md-12 text-center mx-auto" style={{ padding: '15px' }}>       
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Pairs</th>
                                    <th>Result</th>
                                    <th>Time</th>
                                </tr>
                                </thead>
                                <tbody>
                                  { this.getTabelRow()}
                                </tbody>
                            </table>
                      
                    </div>
                </div>
            </div>
        );
    }
}

export default Result;