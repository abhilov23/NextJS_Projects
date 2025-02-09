"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";



export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  })
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async()=>{
     try {
      setLoading(true);
      console.log(user);
      const response = await axios.post("http://localhost:3000/api/users/login", user);
      console.log(response);
      toast.success("Successfully logged in");
      router.push('/profile');
     } catch (error:any) {
      console.log(error);
      toast.error(error.message);
     } finally {
       setLoading(false);
     }

  }
  useEffect(()=>{
    const isFormValid = user.email && user.password;
    if (isFormValid) {
      setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true);
    }
  }, [user])




    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
           <h1>{loading? "processing" : "Login"}</h1>
           <hr/>
           
            <label htmlFor="email">email</label>
           <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            type="text"
            id="email"
            placeholder="email"
            value={user.email}
            onChange={(e)=>setUser({...user, email: e.target.value})}
            />
            <label htmlFor="password">password</label>
           <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            type="text"
            id="password"
            placeholder="password"
            value={user.password}
            onChange={(e)=>setUser({...user, password: e.target.value})}
            />
            <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled?"enter credentials":"Login"}</button>
            <Link href="/signup">Visit Signup page</Link>
            </div>
    );
}