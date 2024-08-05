import { useState } from "react"

const Button = ({taskList , setTaskList}) => {

    const [overlay , setOverlay] = useState(false)
    const [projectName , setProjectname] = useState("")
    const [taskDescription , setTaskDescription] = useState("")
    const [errorMessage , setErrorMessage] = useState("")

    const handleInput = (e) => {
        const {name , value} = e.target;

        if(name === "projectName") {
            setProjectname(value)
            setErrorMessage("")
        }

        if(name === "projectName" && value === "") {
            setErrorMessage("Enter Project Name to Continue")
        }

        if (name === "taskDescription") setTaskDescription(value)
    }

    const handleAdd = e => {
        e.preventDefault();
        if(!projectName) {
            setErrorMessage("Enter Project Name to Continue")
        } else {
            let timestamp = new Date().getTime()
        setTaskList(
            [...taskList , {projectName ,
                 taskDescription , timestamp : timestamp}]
        )
        setOverlay(false);
        setProjectname("");
        setTaskDescription("");
    }
}

    return(
        <>
        <button className="bg-blue-500 text-white uppercase
        text-sm font-semibold py-1 px-2 mx-2 pl-2 pr-2.5 rounded hover:opacity-70" type="button" onClick={() => setOverlay(true)}>+New</button>

        {
            overlay ? (
                <>
                <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100" >

                    <div className="w-9/12 bg-white  rounded-lg shadow-md mx-w-lg relative flex flex-col" >

                    <div className="flex flex-row justify-between p-5 border  bg-white">

                            <h3 className="text-3xl font-semibold">Add New Task</h3>

                            <button className="px-1 text-gray-400 float-right text-3xl leading-none font-semibold black "
                            onClick={() => setOverlay(false)}>  X </button>
                    </div>

                    <form className="px-6 pt-6 pb-4">

                        <div>
                        <label className="track-white uppercase text-gray-700 text-xs font-semibold mb-2 block"
                        htmlFor="project-name">Project Name</label>

                        <input 
                        className="w-full bg-gray-200 text-gray-700 border  border-gray-200 rounded py-3 px-4  leading-tight 
                        focus:outline-none focus:bg-white"
                        id="project-name"
                        name="projectName"
                        value={projectName}
                        onChange={handleInput}
                        type="text"
                        placeholder="Project Name"/>

                        <p className="text-red-500 text-center mt-2 mb-5">{errorMessage}</p>
                        </div>

                        <div>

                            <label className="track-white uppercase text-gray-700 text-xs font-semibold mb-2 block"
                        htmlFor="project-name">Task Description </label>

                            <textarea className="w-full bg-gray-200 text-gray-700 border 
                             border-gray-200 rounded py-3 px-4 mb-5 leading-tight 
                            focus:outline-none focus:bg-white"
                            id="task-description"
                            name="taskDescription"
                            value={taskDescription}
                            onChange={handleInput}
                            rows={5}
                            placeholder=" Add Task Desription" />
                        </div>

                        <div className="flex justify-end p-6 border-t border-slate-200 rounded-b">
                            <button className="bg-blue-500 text-white font-semibold
                            uppercase text-sm px-6 py-3 rounded hover:opacity-70"
                            onClick={handleAdd}>Add Task</button>
                        </div>
                    </form>
                    </div>
                </div>
                </>
            ) : null
        }
        </>
    )
}

export default Button