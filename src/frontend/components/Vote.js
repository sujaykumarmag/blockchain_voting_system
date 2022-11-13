import React from "react";
import { useState } from "react";

const Vote = ({ voter, address }) => {
    const [ done, setdone ] = useState(false);
    const [ leader, setleaderAddress ] = useState(null);
    const [ leadername, setleaderName ] = useState(null);

    const [choose,setChoosen] = useState(null)
    var dat = [];
    const [ arr, setarr ] = useState([])

 
    
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
    const voteUp = async(_address) => {
        await voter.voteLeader(_address);
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
            {done ? showList : <button onClick={getAddressList}>Agree To all the Terms and Conditions</button>}
            <button onClick={voteUp(choose)}>
                <input onChange={(event)=>{setChoosen(event.target.value)}} placeholder="Enter the address who u wanna Vote" />
            </button>
        </div>
    )


}

export default Vote;