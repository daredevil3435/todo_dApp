import React from 'react'
import Navigator from './Navigator'
const DeleteTask = ({state}) => {
  
  async function deleteTask(event)
  {
    event.preventDefault();
    const {contract, account} = state;
    const taskID = document.querySelector("#taskID").value;
    
    try
     {
       const res = await fetch(`http://localhost:3000/api/ethereum/delete-task/${taskID}`,
       {
         method : "DELETE",
         headers :
         {
           "content-type":"application/json"
          },
          body:JSON.stringify({taskID:taskID})
       }
       )
       console.log(account);  
       const data = await res.json();
       console.log(data);
       if(data.status === 200){
        await contract.methods
        .deleteTask(taskID)
        .send({from:account})
       }else{
        throw new Error("Task cannot be updated due to clash")
       }

     }
     catch(error){
      console.error(error);
     }


  }
  return (
    <>
     <Navigator />
     <div className='delete_task'>

     <form className='delete-form' onSubmit={deleteTask}>
      <label>
        ID:
        <input id='taskID' />
      </label>
      <button className='deleteButton'>
        Delete Task
      </button>
     </form>
     </div>
    </>
  )
}

export default DeleteTask
