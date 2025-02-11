// BACK in 3 mins

import { Socket } from "socket.io";
import { QuizManager } from "./QuizManager";
const ADMIN_PASSWORD = "ADMIN_PASSWORD";

export class UserManager {
    private quizManager;

    constructor() {
        this.quizManager = new QuizManager
    }

    addUser(socket: Socket) {
        this.createHandlers(socket);
    }

    private createHandlers(socket: Socket) {
        socket.on("join", (data) => {
            const userId = this.quizManager.addUser(data.roomId, data.name)
            socket.emit("init", {
                userId,
                state: this.quizManager.getCurrentState(data.roomId)
            });
            socket.join(data.roomId);
        });

        socket.on("joinAdmin", (data) => {
            if (data.password !== ADMIN_PASSWORD) {
                return;
            }
            console.log("join admin called");
            
            socket.on("createQuiz", data => {
                console.log("inside create quiz")
                this.quizManager.addQuiz(data.roomId);
            })
        
            socket.on("createProblem", data => {
                console.log("inside create problem");
                this.quizManager.addProblem(data.roomId, data.problem);

            });

            socket.on("next", data => {
                console.log("inside next");
                this.quizManager.next(data.roomId);
            });
        });

        socket.on("submit", (data) => {
            const userId = data.userId;
            const problemId = data.problemId;
            const submission = data.submission;
            const roomId = data.roomId;
            if (submission != 0 && submission != 1 && submission != 2 && submission != 3 ) {
                console.error("issue while getting input " + submission )
                return;
            }
            console.log("submitting")
            console.log(roomId);
            this.quizManager.submit(userId, roomId, problemId, submission)
        });
    }


}