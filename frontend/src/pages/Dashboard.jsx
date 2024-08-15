import axios from 'axios';
import AppBar from '../components/AppBar';
import Balance from '../components/Balance';
import Users from '../components/Users';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [bal,setBal] = useState(0);
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response=>{
            setBal(response.data.balance);
        }),[]});

    return <>
        <AppBar></AppBar>
        <div className="m-8">
            <Balance value={bal}></Balance>
            <Users></Users>
        </div>
    </>
}