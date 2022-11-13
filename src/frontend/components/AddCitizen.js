import React from "react";
import { useState } from "react";

const AddCitizen = ({ voter, address }) => {
    const [ citizen, setCitizenAddress ] = useState(null);
    var dat = [];
    const [ arr, setarr ] = useState([])
    const [done,setdone] = useState(false)
    const add = (event) => {
        setCitizenAddress(event.target.value)
    }
    const addCitizen = async (votercitizen) => {
        try {
            const data = await (await voter.addCitizen(votercitizen.address)).wait();
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }
    const getAddressList = async () => {
        const number = await voter.noOfVoters()
        var num = parseInt(number._hex)
        for (var i = 0; i <num; i++){
            const data = await voter.allCitizens(i);
            dat.push(data)
        }
        if (dat.length === num) {
            console.log(dat)
            setarr(dat)
            setdone(true)
        }
    }
    
    const showList = 
        arr.map((data) => {
            return (<div>
                <><p>{parseInt(data.id)}</p>{data.addr}</>
            </div>)
        })
    
    return (
        <div>
            <button onClick={addCitizen({ address: citizen })}>
                <input onChange={add} value={citizen} type="text" placeholder="Enter the Addresss" />
            </button>
            {done ? showList : <button onClick={getAddressList}>Get all Citizens with Addressses</button>}
        </div>
    )
}


export default AddCitizen;