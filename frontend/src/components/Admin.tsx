import { useEffect, useState } from "react";

import { io } from "socket.io-client";
// import { Socket } from "socket.io-client/debug";
import { CreateProblem } from "./CreateProblem";
import { QuizControls } from "./QuizControls";

export const Admin = () => {
    const [socket, setSocket] = useState<null | any>(null);
    const [quizId, setQuizId] = useState("");
    const [roomId, setRoomId] = useState("");

    useEffect(() => {
        const socket = io("http://localhost:3000");
        setSocket(socket)

        socket.on("connect", () => {
            console.log(socket.id);
            socket.emit("joinAdmin", {
                password: "ADMIN_PASSWORD"
            })
        });
        
    },[]);
    if (!quizId) {
        return <div className="flex justify-center items-center"> 
        <label className="text-center w-64 p-2 border-2 text-black  rounded-lg shadow-sm focus:outline-none">Set Room Id</label> 
        <input type="text" className="text-center w-64 p-2 border-2 text-black border-purple-600 rounded-lg shadow-sm focus:outline-none focus:border-purple-800" onChange={(e) => {
            setRoomId(e.target.value)
        }} />
        <br />
        <button className=" bg-purple-600 text-white w-64 py-2 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-opacity-50 " onClick={() => {
            socket.emit("createQuiz", {
                roomId
            });
            setQuizId(roomId);
        }}>Create room</button>
    </div>
    }
    return <div> 
        <CreateProblem roomId={quizId} socket={socket} />
        <QuizControls socket={socket} roomId={roomId} />
    </div>
}