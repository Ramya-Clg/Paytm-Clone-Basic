import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Signup(){
    const [firstName,setFirstName] = useState("");  
    const [lastName,setLastName] = useState("");   
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
  return <>
    <div className="bg-[#caca3e] h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-[#cccc81] w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign Up"}></Heading>
                <SubHeading label={" Enter you informatin to create a new account "} ></SubHeading>
                <InputBox onChange={e=>{
                    setFirstName(e.target.value);
                }} placeholder={"john"} label={"First Name"} > </InputBox>
                <InputBox onChange={e=>{
                    setLastName(e.target.value);
                }}placeholder={"doe"} label={"Last Name"} > </InputBox>
                <InputBox onChange={e=>{
                    setEmail(e.target.value);
                }}placeholder={"john.doe@gmail.com"} label={"Email"} > </InputBox>
                <InputBox onChange={e=>{
                    setPassword(e.target.value);
                }}placeholder={"password"} label={"Password"} > </InputBox>
                <div className="pt-4">
                    <Button onClick={async ()=>{
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                            firstName,
                            lastName,
                            password,
                            username:email
                        });
                        localStorage.setItem("token",response.data.token);
                        navigate("/dashboard");
                    }} label={"Sign up"}></Button>
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}></BottomWarning>
            </div>
        </div>
    </div>
  </>  
};