import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import BottomWarning from "../components/BottomWarning"

export default function Signin() {
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign in"}></Heading>
            <SubHeading label={"Enter your information to sign in"}></SubHeading>
            <InputBox placeholder={"john.doe@gmail.com"} label={"email"} />
            <InputBox placeholder={"password"} label={"password"} />
            <div className="pt-4">
                <Button label={"sign in"}></Button>
            </div>  
            <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
        </div>
    </div>
}