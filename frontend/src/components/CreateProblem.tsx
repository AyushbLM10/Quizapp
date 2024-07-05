import { useState } from "react"

export const CreateProblem = ({socket, roomId}: {socket: any; roomId: string;}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [answer, setAnswer] = useState(0);
    const [options, setOptions] = useState([{
        id: 0,
        title: ""
    },{
        id: 1,
        title: ""
    },{
        id: 2,
        title: ""
    },{
        id: 3,
        title: ""
    }])

    return <div>
        <label className="text-center w-64 p-2 border-2 text-black shadow-sm focus:outline-none">
            Create problem 
        </label><br />
        <label className="text-center w-64 p-2 border-2 text-black  shadow-sm focus:outline-none">
            Title
        </label><input type="text" 
            className="text-center w-64 p-2 border-2 text-black border-purple-600 shadow-sm focus:outline-none focus:border-purple-800"
            onChange={(e) => {
            setTitle(e.target.value)
        }}></input>
        <br /><br />
        <label className="text-center w-64 p-2 border-2 text-black  shadow-sm focus:outline-none">
            Description
        </label> <input type="text" 
            className="text-center w-64 p-2 border-2 text-black border-purple-600  shadow-sm focus:outline-none focus:border-purple-800"
            onChange={(e) => {
            setDescription(e.target.value)
        }}></input>
        <br />
        
        {[0, 1, 2, 3].map(optionId => <div> 
            <input type="radio" checked={optionId === answer} onChange={() => {
                setAnswer(optionId)
            }}></input>
            <label className="text-center w-64 p-2 border-2 text-black  shadow-sm focus:outline-none">
            Option {optionId+1}
            </label>
            <input className="text-center w-32 p-1 border-2 text-black border-purple-600  shadow-sm focus:outline-none focus:border-purple-800" 
            type="text" onChange={(e) => {
                setOptions(options => options.map(x => {
                    if (x.id === optionId) {
                        return {
                            ...x,
                            title: e.target.value
                        }
                    }
                    return x;
                }))
            }}></input>
        <br />
        </div>)}
 
        <button
        className=" bg-purple-600 text-white w-64 py-2 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-opacity-50 "
        onClick={() => {
            socket.emit("createProblem", {
                roomId,
                problem: {
                    title,
                    description,
                    options,
                    answer,
                }
            });
        }}>Add problem</button>       
        
    </div>
}