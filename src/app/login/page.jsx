"use client";
import React, {useState} from "react";
import Link from "next/link";
import './login.css';
import {baseUrl} from "@/app/api/api";
import {useRouter} from "next/navigation";
import {toast} from "react-hot-toast";

export default function Login() {

    const router = useRouter();

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`${baseUrl}api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    console.log(data)
                    toast.success("Login successful");
                    localStorage.setItem("token", data.token)
                    router.push("/mycloud");
                }
                else {
                    toast.error(data.message);
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error(err)
            })
        }



    return (
        <div className="loginPage">
            <div className="login-container">
                <div className="logo-container">
                    <img src="/dcloud.png" alt="dCloud" className="logo-img"/>
                </div>
                <h2 className="title">Sign in to your account</h2>

                <form action="src/app#" method="POST" className="form">
                    <div className="form-group">
                        <label htmlFor="email" className="label">Email address</label>
                        <input value={data.email} onChange={handleChange} id="email" name="email" type="email" required className="input"/>
                    </div>

                    <div className="form-group">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="label">Password</label>
                        </div>
                        <input value={data.password} onChange={handleChange} id="password" name="password" type="password" required className="input"/>
                    </div>
                    <div className="form-group">
                        <button onClick={handleSubmit} type="submit" className="button">Sign in</button>
                    </div>
                </form>
                <p className="not-a-member">Not a member? <Link href="/signup" className="signup-link">Sign Up</Link>
                </p>
            </div>
        </div>
    )
}
