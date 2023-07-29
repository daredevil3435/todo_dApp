const express = require("express");
const {Web3} = require('web3');
const cors = require("cors");
const ABI = require('./ABI.json');

const address = "0x576B859f44F41Cdd218aA9E229ed08Ea47F249C5"

const app = express();

app.use(cors())
app.use(express.json());  //to be able to accept data in json
const PORT = 3000;
app.listen(PORT);
const web3 = new Web3("https://serene-spring-hill.ethereum-sepolia.discover.quiknode.pro/c3076bfe23edf6b2bad445cdf4159b518182f9a1/");
const contract = new web3.eth.Contract(ABI, address);

console.log(contract);


const dateClashCheck= async(taskDate) =>{
    const tasks = await contract.methods.allTask().call();

    const foundTask = tasks.find(task => task.date === taskDate);

    if(foundTask){
        return foundTask.name;

    }
    return "No task found";
}

// const priorityCheck = async(id) => {
//     const tasks = await contract.methods.allTask().call();
//     const result = tasks[id].name.includes("priority")

//     return result;
// }

const isValidID = async(taskID) => {
    const tasks = await contract.methods.allTask().call();
    const validID = tasks.find(task => task.id);
    if(validID < taskID){
        return "Invalid ID";
    }
    
    return "valid ID";
}

app.post("/api/ethereum/create-task",async(req,res)=>{
   const {taskDate} = req.body;
   const task = await dateClashCheck(taskDate);
   try
   {
     if(task !== "No task found"){
        res.status(409).json({status:409,message:"Date clashed : Task cannot be added"})
     }else{
        res.status(200).json({status:200,message:"Task can be added"});
     }


   }catch(error){
        console.error(error);
   }
})

app.delete("/api/ethereum/delete-task/:taskID",async(req,res)=>{
    const {taskID} = req.params;
    // const task = await dateClashCheck(taskDate);
    const validity = await isValidID(taskID);

    try
    {
        if(validity === "Invalid ID"){
            res.status(409).json({status:409,message:"Invalid task ID"})
        }
        else{
            res.status(200).json({status:200,message:"Task can be deleted"});
        }
      
 
 
    }catch(error){
         console.error(error);
    }
 })

 app.post("/api/ethereum/update-task", async(req,res)=>{
    const {taskDate} = req.body;
   const task = await dateClashCheck(taskDate);
   try
   {
     if(task !== "No task found"){
        res.status(409).json({status:409,message:"Date clashed : Task cannot be updated"})
     }else{
        res.status(200).json({status:200,message:"Task can be updated"});
     }


   }catch(error){
        console.error(error);
   }
})

app.get("/api/ethereum/view-task/:taskId",async(req,res)=>{
    try{

        const {taskId} = req.params;
        
        const task = await contract.methods.viewTask(taskId).call();
        console.log(task);
        const {id,name,date} = task;
        const numId = String(id);
        const taskObj = {
            numId,name,date
        }
        console.log(taskObj);
        res.status(200).json({status:200, taskObj,message:"task exists"})

    }catch(error){
        res.status(500).json({status:500,message:"Task Id does not exist"})
        // console.error(error);
    }
})
//sequece of req,res does matter
app.get("/api/ethereum/view-all-task", async(req,res)=>{
    try{
       const tasks = await contract.methods.allTask().call();

       if(tasks.length<0){
           res.status(500).json({status:500,message:"Task does not exist"})
       }
       else{
            const taskList = tasks.map(({id,name,date})=>{
               const taskid = Number(id);
               return {taskid,name,date}
            })
            res.status(200).json({status:200,taskList,message:"List of all tasks"})
        }


    }catch(error){
        console.error(error);
        res.status(400).json({status:400,message:"No task here"})
    }
})

// viewTask();