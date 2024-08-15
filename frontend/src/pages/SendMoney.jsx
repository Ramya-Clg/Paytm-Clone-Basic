import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SendMoney() {
    const [amount, setAmount] = useState("");
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");

    return <div className="flex justify-center h-screen bg-gray-200">
        <div className="h-full flex flex-col justify-center">
            <div className="border h-min text-card-foreground max-w-md p-4 space-y-1 w-96 bg-white shadow-lg rounded-lg">
                <div className="flex flex-col space-y-1.5 p-6">
                    <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">   
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                            <span className="text-2xl text-black-700">{name[0].toUpperCase()}</span>
                        </div>
                        <h3 className="text-2xl font-semibold capitalize">{name}</h3>
                    </div>
                    <div className="space-y-6 mt-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="amount">
                                Amount (in Rs)
                            </label>
                            <input type="number" onChange={(e)=>{
                                setAmount(e.target.value);
                            }} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" id="amount" placeholder="Enter amount" />
                        </div>
                        <button onClick={()=>{
                            axios.post("http://localhost:3000/api/v1/account/transaction",{
                                to: id,
                                amount 
                            },{
                                headers:{
                                    Authorization: `Bearer ${localStorage.getItem("token")}`
                                }
                            })
                        }} className="justify-center rounded-md text-sm font-medium ring-offset-background tansition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                            Initiate transfer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}