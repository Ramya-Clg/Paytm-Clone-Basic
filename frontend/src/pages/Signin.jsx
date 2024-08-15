import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import BottomWarning from "../components/BottomWarning"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    return <div className="bg-[#caca3e] h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-[#cccc81] w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign in"}></Heading>
            <SubHeading label={"Enter your information to sign in"}></SubHeading>
            <InputBox onChange={
                (e) => {
                    setEmail(e.target.value);
                }
            } placeholder={"john.doe@gmail.com"} label={"email"} />
            <InputBox onChange={
                (e) => {
                    setPassword(e.target.value);
                }
            } placeholder={"password"} label={"password"} />
            <div className="pt-4">
                {email} {password}
                <Button onClick={ ()=>{
                    axios.post("http://localhost:3000/api/v1/user/signin",{
                        username: email,
                        password
                    })
                    .then(response=>{
                        localStorage.setItem("token",response.data.token);
                        navigate("/dashboard");
                })
                }} label={"sign in"}></Button>
            </div>  
            <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
        </div>
    </div>
}