import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import PMT from "../functions/pmt"
import PerMonth from "./PerMonth" 

ChartJS.register(ArcElement, Tooltip, Legend);

const Result = (props:any) =>{
    

    const [hidden, setHidden] = useState(true);
    let payBack = 0;
    if (props.data.payBack >= 12) {
        payBack = props.data.loanTermMonths*Math.round(props.data.payBack/12)
    }
    else if (props.data.payBack === "4"){
        payBack = Math.round(props.data.loanTermMonths/3)
    }
    else if (props.data.payBack === "2") {
        payBack = Math.round(props.data.loanTermMonths/6)
    }
    else if (props.data.payBack === "1") {
        payBack = Math.round(props.data.loanTermMonths/12)
    }
    let compound = props.data.compound
    let numberOfPeriods:number = (props.data.loanTermYears*props.data.payBack )+payBack

    let pmt = PMT ((props.data.interestRate/100)/compound,numberOfPeriods,props.data.loanAmount,0,0)
    let perMonthToPay:number = +pmt
    let total:number = +(perMonthToPay*numberOfPeriods)
    let totalInterest:number = +(total-props.data.loanAmount)

    const paymentPerMonth: {id: number, bgBalance:number, pmInterest:number, pmPrincipal:number, enBalance:number}[] = [
        {
        "id": 0,
        "bgBalance":props.data.loanAmount, 
        "pmInterest": ((props.data.interestRate/100)/compound)*props.data.loanAmount, 
        "pmPrincipal":perMonthToPay-(((props.data.interestRate/100)/compound)*props.data.loanAmount), 
        "enBalance":props.data.loanAmount-(perMonthToPay-(((props.data.interestRate/100)/compound)*props.data.loanAmount))
        }
    ]
    for (let i =1; i<numberOfPeriods; i++) {
        paymentPerMonth.push({
            "id": i,
            "bgBalance": paymentPerMonth[i-1].enBalance,
            "pmInterest": ((props.data.interestRate/100)/compound)*paymentPerMonth[i-1].enBalance,
            "pmPrincipal": perMonthToPay-(((props.data.interestRate/100)/compound)*paymentPerMonth[i-1].enBalance),
            "enBalance": (paymentPerMonth[i-1].enBalance)-(perMonthToPay-(((props.data.interestRate/100)/compound)*paymentPerMonth[i-1].enBalance))
        })
    }
   

    const data = {
        labels: ['Principal', 'Interest'],
        datasets: [
          {
            label: '#',
            data: [props.data.loanAmount, +totalInterest],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',

            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',

            ],
            borderWidth: 1,
          },
        ],
      };
      

    return (
        <div className="result">
            <h3>Results:</h3>
            <table>
                <tbody>
                    <tr>
                        <td>Payment Every Month	</td>
                        <td>${perMonthToPay.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Total of {numberOfPeriods} Payments</td>
                        <td>${total.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Total Interest</td>
                        <td>${totalInterest.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
                {props.count === 0 ?
                (<span>
                    <button style={{color: "#797979", pointerEvents: "none"}}>View Amortization Table</button>
                </span>) :
                (<span>
                    {hidden ? (
                        <button onClick={() => setHidden(false)}>View Amortization Table</button>
                    ) : (
                        <button onClick={() => setHidden(true)}> Dismis Amortization Table</button>
                    )}
                </span>)
                }
            <div className="pie-data">
                <Pie data={data} /> 
            </div>
            {hidden === false &&<PerMonth pmItem={paymentPerMonth}/>}
        </div>
    )
}

export default Result