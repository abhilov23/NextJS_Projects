"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";




export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  })

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);


  const onSignup =async ()=>{
     try {
       setLoading(true);
       const res = await axios.post("/api/users/signup", user);
       console.log(res);
       router.push("/login");
     } catch (error) {
      toast.error("sign up failed", error);
     }
     finally{
      setLoading(false);
    }
  }
   
  useEffect(()=>{
    if (user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false);
    }
    else{
      setButtonDisabled(true);
    } 


  },[user])



    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
           <h1>{loading? "processing" : "Signup"}</h1>
           <hr/>
           <label htmlFor="username">username</label>
           <input className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            type="text"
            id="username"
            placeholder="username"
            value={user.username}
            onChange={(e)=>setUser({...user, username: e.target.value})}
            />
            <label htmlFor="email">email</label>
           <input className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            type="text"
            id="email"
            placeholder="email"
            value={user.email}
            onChange={(e)=>setUser({...user, email: e.target.value})}
            />
            <label htmlFor="password">password</label>
           <input className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            type="text"
            id="password"
            placeholder="password"
            value={user.password}
            onChange={(e)=>setUser({...user, password: e.target.value})}
            />
            <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "fill the values to signup" : "Sign up"}</button>
            <Link href="/login">Visit Login page</Link>
            </div>
    );
}