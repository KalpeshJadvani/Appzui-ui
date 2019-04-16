import React, { Component } from 'react';
import axios from 'axios';
class Caclulate extends Component {
    constructor(props){
        super(props);
        this.state = {
            sets:'',
            triggerText:'',
                
        }
        this.LCMFindnumbers = this.LCMFindnumbers.bind(this);
    }

    gettriggerNumber(e){
        this.setState({triggerText:e.target.value});
    }
    submiteNumber(e){
        e.preventDefault();
        const re = /^[0-9\b]+$/;
        if (re.test(this.state.triggerText)) {
            let val ;

            if(this.state.sets===''){
                val = this.state.triggerText;    
            }else{
                val = this.state.triggerText+", "+this.state.sets;  
            }
            this.setState({
                sets: val,
                triggerText:'',
            });
        }else{
            this.setState({triggerText:''},()=>{
                alert("Please Enter only Number");
            });
        }
    }
    calculatLCM(e){
        e.preventDefault(); 
        if(this.state.sets!==''){
            var Aarry = this.state.sets.split(',').map(function(item) {
                return parseInt(item, 10);
            });


            axios
                .post(`/api`, {
                    indexnumber: 1,
                    pairs: this.state.sets,
                    result:this.LCMFindnumbers(Aarry),
                    datetime:this.formatAMPM(new Date()),
                })
                .then(res => {
                    this.setState({
                        sets:'',
                    });
                    this.props.refreshData();
                })
                .catch(err => {
                    console.log("err", err)
                });
       
        }else{
            alert("Please Enter only Number");
        }

    }
    formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
    }

    LCMFindnumbers(lcm_array) {
        if (toString.call(lcm_array) !== "[object Array]")  
            return  false;  
        var r1 = 0, r2 = 0;
        var l = lcm_array.length;
        for(let i=0;i<l;i++) {
            r1 = lcm_array[i] % lcm_array[i + 1];
            if(r1 === 0) {
                lcm_array[i + 1] = (lcm_array[i] * lcm_array[i+1]) / lcm_array[i + 1];
            }
            else {
                r2 = lcm_array[i + 1] % r1;
                if(r2 === 0) {
                    lcm_array[i + 1] = (lcm_array[i] * lcm_array[i + 1]) / r1;
                }
                else {
                    lcm_array[i+1] = (lcm_array[i] * lcm_array[i + 1]) / r2;
                }
            }
        }
        return lcm_array[l - 1];
    }
    

    render() {
        return (
            <div className="container container-custom mx-auto w-50 p-3">
                <div className="row border border-primary bg-primary border-bottom-0 " style={{ 'borderTopLeftRadius': '5px', 'borderTopRightRadius': '5px' }} >
                    <div className="col-md-12 flot-left" style={{ padding: '10px' }}>
                        <div className="text-left text-white text-bold"> LCM Search Project </div>
                    </div>
                </div>
                <div className="row border border-primary" style={{ 'borderBottomLeftRadius': '5px', 'borderBottomRightRadius': '5px' }} >
                    <div className="col-md-12 text-center mx-auto" style={{ padding: '15px' }}>
                        <div className="col-md-12" style={{ padding: '10px' }}>&nbsp; </div>
                        <div className="btn-group">
                                <button type="button" className=" btn btn-primary btn-md clear-button" onClick={this.submiteNumber.bind(this)}>No-Clear</button>
                                <input type="number" className="form-control input-number" value = {this.state.triggerText} placeholder="Enetr number" onChange={this.gettriggerNumber.bind(this)}></input>
                                <button type="button" className=" btn btn-primary btn-md pluse-button" onClick={this.submiteNumber.bind(this)}>No-Pluse</button>       
                        </div>
                        <div className="col-md-12">&nbsp; </div>
                        <div className="btn-group">
                            <label className="btn clear-button"> Sets</label>
                            <input type="text" value = {this.state.sets} className="form-control input-number" disabled></input>
                            <label className="btn clear-button">&nbsp;&nbsp;&nbsp;</label>
                        </div>
                        <div className="col-md-12">&nbsp; </div>
                        <div className="btn-group">
                            <button type="button" className=" btn btn-primary btn-md clear-button" onClick={this.calculatLCM.bind(this)}>Calculat LCM</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Caclulate;