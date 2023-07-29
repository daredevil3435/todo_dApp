import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './App.css'
import CreateTask from './pages/CreateTask';
import DeleteTask from './pages/DeleteTask';
import ViewTask from './pages/ViewTask';
import Navigator from './pages/Navigator';
import Wallet from './pages/Wallet';
import UpdatTask from './pages/UpdateTask';
import ViewAllTask from './pages/ViewAllTask';

function App() {
  
  const [state,setState] = useState({web3:null,contract:null,account:null})
  
  const saveState = ({ web3, contract, account})=>{
    setState({web3:web3,contract:contract,account:account});
  }
  const router = createBrowserRouter([
    {path:'/', element: <Wallet saveState={saveState}/>},
    {path:'/update',element : <UpdatTask state={state}/>},
    {path:'/view',element : <ViewTask />},
    {path:'/view-all-tasks',element : <ViewAllTask />},
    {path:'/create',element : <CreateTask state={state} />},
    {path:'/navigator',element : <Navigator />},
    {path:'/delete',element : <DeleteTask state={state}/>}
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
