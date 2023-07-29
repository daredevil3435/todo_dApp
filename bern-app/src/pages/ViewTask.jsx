import React, {useState} from 'react'
import Navigator from './Navigator';
const ViewTask = () => {

  const [task, setTask] =  useState([]);
  const [modalContent, setModalContent] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const viewTask = async(event) =>{
       try{
          event.preventDefault();
          const taskID = document.querySelector("#taskID").value;
          const res = await fetch(`http://localhost:3000/api/ethereum/view-task/${taskID}`,{
            method : "GET",
            headers:{
              "content-type":"application/json"
            }
          })

          const data = await res.json();
          if(data.status === 200){
            setTask(data.taskObj);
          }
          else{
            throw new Error();
          }
          console.log(data);

       }
       catch(error){
         setModalContent("Task does not exist");
         setModalVisible(true);
         console.error(error);
       }
  }
  
  const closeModal = () =>{
    setModalVisible(false);
    setModalContent("");
    
  }
  return (
    <>
    <Navigator />
    <div className='view_task todo_btn'>
    {task.numId!==null && task.name!==null && task.date!==null ? (
          <div className="view_task_by_id  view_all_tasks_card">
            <p>Task ID: {task.numId}</p>
            <p>Task Name: {task.name}</p>
            <p>Task Date: {task.date}</p>
          </div>
        ) : (
          <div className="empty_div"></div>
        )}
      <form onSubmit={viewTask}>
       <label>
        ID:
        <input id="taskID" type='Number' />
       </label>
       <button type='submit'>
          submit
       </button>
      </form>
      {modalVisible && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <p>{modalContent}</p>
            </div>
          </div>
        )}


      {/* <div>
        {task}
      </div> */}
    </div>
    </>
  )
}

export default ViewTask
