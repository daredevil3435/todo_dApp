import React from 'react'
import {useState} from 'react'
import Web3 from 'web3'
import ABI from './ABI.json'
import { useNavigate } from 'react-router-dom'

const Wallet = ({saveState}) => {

  const navigateTo = useNavigate();
  const [walletAddress, setWalletAddress] = useState('');
  const address = "0x576B859f44F41Cdd218aA9E229ed08Ea47F249C5";

  const connectWallet = async() => {
    try{
      if(window.ethereum){
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method : "eth_requestAccounts"
        })
        console.log(web3, accounts);
        setWalletAddress(accounts[0]);
        const contract = new  web3.eth.Contract(ABI, address);
        console.log(contract);
        saveState({web3:web3, contract:contract, account:accounts[0]});
        navigateTo("/view-all-tasks");
      }
      else{
        throw new Error
      }

    }catch(error){
      console.log(error);
    }
  }
  return (

    <div>
      
      <div>
        <h1>Welcome!!!</h1>
        <h3>Connect MetaMask to access To-Do dApp</h3>
      <button className='connectwalletbutton' onClick={connectWallet}>Connect Wallet</button><br/><br/>
       
      </div>
      
    </div>
  )
}

export default Wallet
