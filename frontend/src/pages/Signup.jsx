export default function Signup(){
  return <>
    <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign Up"}></Heading>
                <Subheading label={" Enter you informatino to create a new account "} ></Subheading>
                <InputBox placeholder={"john"} label={"First Name"} > </InputBox>
                <InputBox placeholder={"doe"} label={"Last Name"} > </InputBox>
                <InputBox placeholder={"john.doe@gmail.com"} label={"Email"} > </InputBox>
                <InputBox placeholder={"password"} label={"Password"} > </InputBox>
                <div className="pt-4">
                    <Button label={"Sign up"}></Button>
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}></BottomWarning>
            </div>
        </div>
    </div>
  </>  
};