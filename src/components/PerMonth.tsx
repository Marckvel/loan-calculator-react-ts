
import React from "react";


interface item {
    pmItem:{
    id:number;
    bgBalance:number;
    pmInterest:number;
    pmPrincipal:number;
    enBalance:number;
    }[];
}

const PerMonth = ({pmItem}:item) =>{
    
    const NewRow = pmItem.map(pmItem => 
        <tr className={"tr"+pmItem.id} key={pmItem.id}>

            
            <td>{pmItem.id + 1}</td>
            <td>${Math.round(pmItem.bgBalance*100)/100}</td>
            <td>${Math.round(pmItem.pmInterest*100)/100}</td>
            <td>${Math.round(pmItem.pmPrincipal*100)/100}</td>
            <td>${Math.round(pmItem.enBalance*100)/100}</td>
        </tr>
    )

    return(
    <div className="amortization-table">
        <table>
            <tbody>
                <tr className="first-row">
                    <td>Nº</td>
                    <td>Beginning Balance</td>
                    <td>Interest</td>
                    <td>Principal</td>
                    <td>Ending Balance</td>
                </tr>
                {NewRow}
            </tbody>
        </table>
    </div>
    )
}

export default PerMonth