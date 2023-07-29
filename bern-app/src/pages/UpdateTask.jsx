import React, { useState } from 'react'
import Navigator from './Navigator'
const UpdateTask = ({state}) => {
  
  const [modalVisible,setModalVisible] = useState(false);
  const [modalContent,setModalContent] = useState("");

  const closeModal = () => {
    setModalVisible(false);
    setModalContent("");

  }



  async function updateTask(event){
     event.preventDefault();
     const {account, contract}= state;
     const taskName = document.querySelector("#taskName").value;
     const taskDate = document.querySelector("#taskDate").value;
     const taskID = document.querySelector("#taskID").value;

     try
     {
       const res = await fetch("http://localhost:3000/api/ethereum/update-task",
       {
         method : "POST",
         headers :
         {
           "content-type":"application/json"
          },
          body:JSON.stringify({taskDate:taskDate})
       }
       )
       console.log(account);  
       const data = await res.json();
       console.log(data);

       if(data.status === 200){
        await contract.methods
        .updateTask(taskID,taskName,taskDate)
        .send({from:account});
        setModalContent(
          `Task ID ${taskID} updated with task name ${taskName} and date ${taskDate}`
        );
        setModalVisible(true);
       }else{
        throw new Error("Task cannot be updated due to clash")
       }

     }
     catch(error){
      setModalContent("Task cannot be updated");
      setModalVisible(true);
      console.error(error);
     }
  }   
  return (
    <>
     <Navigator />
     <div className='update_task todo_btn'>

     <form  onSubmit={updateTask}>
      <label>
        ID:
        <input id="taskID"/>

      </label>

      <label>
        Name:
        <input id="taskName"/>
        
      </label>

      <label>
        Date:
        <input id="taskDate"/>
        
      </label>
      <button type='submit'>
       
        Update Task
      
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
     
     </div>
    </>
  )
}

export default UpdateTask

