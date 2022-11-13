import React from "react";
import { useState } from "react";

const AddParticipant = ({ voter, address }) => {
    const [ done, setdone ] = useState(false);
    const [ leader, setleaderAddress ] = useState(null);
    const [leadername,setleaderName] =useState(null);
    var dat = [];
    const [ arr, setarr ] = useState([])
    
    const addParticipant = async(participant) => {
        try {
            const data = await(await voter.addParticipant(participant.name,participant.address)).wait();
        } catch (err) {
            console.log(err)
        }
        
    }
    const getAddressList = async () => {
        const number = await voter.noOfParticipants();
        var num = parseInt(number._hex)
        console.log(number)
        for (var i = 0; i < num; i++) {
            const data = await voter.participants(i);
            console.log(data)
            dat.push(data)
        }
        if (dat.length === num) {
            console.log(dat)
            setarr(dat)
            setdone(true)
        }
        
    }
    const showList = arr.map((data) => {
        return (<div>
            <>
                <p>{parseInt(data.id)}</p>
                <p>{data.addr}</p>
                <p>{data.name}</p>
            </>
        </div>)
    })
    return (
        <div>
            <button onClick={addParticipant({ address: leader,name:leadername })}>
                <input onChange={(event)=>{setleaderName(event.target.value)}} value ={leadername} type ="text" placeholder="Enter the Name of the Participant" />
                <input onChange={(event)=>{setleaderAddress(event.target.value)}} value={leader} type="text" placeholder="Enter the Addresss" />
            </button>
            {done ? showList : <button onClick={getAddressList}>Get all Participants in Elections with Addressses</button>}
        </div>
    )


}

export default AddParticipant;