import { useEffect, useState } from "react"
import EditTask from "./EditTask"
import { useDrag } from "react-dnd"

const ToDo = ({task , index , taskList , setTaskList}) => {

    const [time , setTime] = useState(0)
    const [running , setRunning] = useState(false)
    const [{isDragging} , drag] = useDrag(() => ({
            type : "todo" ,
            item : {
                id : index ,
                projectName : task.projectName,
                taskDescription : task.taskDescription,
                timestamp : task.timestamp,
                duration : task.duration
            },
            collect : (monitor) => ({
                isDragging : !!monitor.isDragging(),
            })
    }))

    useEffect(() => {
        let interval; 
        if(running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10)
            },10)
        } else if(!running) {
            clearInterval(interval)
        } return () => clearInterval(interval)
    })

    const handleDelete = (itemID) => {
        let removeIndex = taskList.indexOf(task)
        taskList.splice(removeIndex , 1)
        setTaskList(currentTasks => currentTasks.filter(
            todo => todo.id !== itemID
        ) )
    }
    return (
        <>
        <div className="flex  flex-col items-start justify-start bg-white my-4 ml-6 py-4 px-6 w-3/4 max-w-lg" ref={drag}>
            <div className="w-full flex flex-row justify-between">
            <p className="font-semibold text-xl">{task.projectName}</p>
           <EditTask  task={task}
            index={index} taskList={taskList} setTaskList={setTaskList}  />
            </div>
            <p className="text-lg py-2">{task.taskDescription}</p>

            <div className="w-full flex  flex-col sm:flex-row items-center justify-center sm:justify-evenly">
            <div className=" sm:w-1/4 text-xl font-semibold py-4">
                <span>{("0" + Math.floor(( time / 3600000) % 24)).slice(-2)}:</span>
                <span>{("0" + Math.floor(( time / 60000) % 60)).slice(-2)}:</span>    
                <span>{("0" + Math.floor(( time / 1000) % 60)).slice(-2)}:</span>    
                <span className="text-sm">{("0" + (( time / 10) % 100)).slice(-2)}</span>
            </div>

            <div className="w-1/3 max-w-sm flex flex-row justify-evenly gap-2">
               {
                running ? (<button className="border rounded-lg py-1 px-3"
                onClick={() => setRunning(false)}>Stop</button>) :
                 (<button className="border rounded-lg py-1 px-3"
                 onClick={() => setRunning(true)}>Start</button>)
               } 
               <button className="border rounded-lg py-1 px-3"
               onClick={() => setTime(0)}>Reset</button>
            </div>
            </div>

            <div className="w-full flex justify-center">
                <button className="bg-red-500 text-white text-sm uppercase font-semibold py-1.5 px-3 mt-6 mb-1 rounded"
                onClick={handleDelete}>Delete</button>
            </div>
        </div>
        </>
    )
}

export default ToDo