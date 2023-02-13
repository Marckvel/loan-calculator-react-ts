import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Result from "./Result"


type FormValues = {
    loanAmount: number;
    loanTermYears: number;
    loanTermMonths: number;
    interestRate: number;
    compound: string;
    payBack: string;
  }

const Calculator = () => {
    
    const {register, handleSubmit/* , formState: { errors } */} = useForm<FormValues>()
    const [result, setResult] = useState("");
    const onSubmit = (data:any) => setResult(data)

    const [step, setStep] = useState(0);
    

    return(  
        <div className="calculator">
            <form onSubmit={handleSubmit(onSubmit)}>
                <table>
                    <tbody>
                        <tr>
                            <td>Loan Amount</td>
                            <td>
                                <input type="number" {...register("loanAmount", {required: true})} />
                            </td>
                        </tr>

                        <tr>
                            <td>Loan Term</td>
                            <td>
                                <input type="number" {...register("loanTermYears", {required: true})} />
                            </td>
                            <td>Years</td>
                        </tr>

                        <tr>
                            <td></td>
                            <td>
                                <input type="number" {...register("loanTermMonths", {required: true})}/>
                            </td>
                            <td>months</td>
                        </tr>

                        <tr>
                            <td>Interest Rate</td>
                            <td>
                                <input type="number" {...register("interestRate", {required: true})}/>
                            </td>
                            <td>%</td>
                        </tr>

                        <tr>
                            <td>Compound</td>
                            <td>
                                <select {...register("compound")} defaultValue='12'>
                                    <option value="1">Annually (APY)</option>
                                    <option value="2">Semi-annually</option>
                                    <option value="4">Quarterly</option>
                                    <option value="12" >Monthly (APR)</option>
                                    <option value="24">Semi-monthly</option>
                                    <option value="26">Biweekly</option>
                                    <option value="52">Weekly</option>
                                    <option value="365">Daily</option>
                                    <option value="100">Continuously</option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td>Pay Back</td>
                            <td>
                                <select {...register("payBack")} defaultValue='12'>
                                    <option value="365">Every Day</option>
                                    <option value="52">Every Week</option>
                                    <option value="26">Every 2 Weeks</option>
                                    <option value="24">Every Half Month</option>
                                    <option value="12" >Every Month</option>
                                    <option value="4">Every Quarter</option>
                                    <option value="2">Every 6 Months</option>
                                    <option value="1">Every Year</option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td></td>
                            <td>
                                <input className="submit" type="submit" onClick={() => setStep(step+1)}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <Result data={result} count={step}/>
        </div>
    )
}
export default Calculator

