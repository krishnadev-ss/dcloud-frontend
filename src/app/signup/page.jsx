"use client"
import React, {useState} from "react";
import "./signup.css"
import Link from "next/link";
import {useRouter} from "next/navigation";
import {baseUrl} from "@/app/api/api";
import {toast} from "react-hot-toast";

export default function Signup() {

    const router = useRouter();

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`${baseUrl}api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    toast.success("Register successful");
                    localStorage.setItem("token", data.token)
                    router.push("/mycloud");
                } else {
                    console.log(data)
                    toast.error(data.message);
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error(err)
            })
    }


    return (
        <div className="login-container">
            <div className="logo-container">
                <img src="/dcloud.png" alt="dCloud" className="logo-img"/>
            </div>
            <h2 className="title">Sign Up</h2>

            <form action="src/app#" method="POST" className="form">
                <div className="form-group">
                    <label htmlFor="name" className="label">Name</label>
                    <input value={data.name} onChange={handleChange} id="name" name="name" type="text" required className="input"/>
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="label">Email address</label>
                    <input value={data.email} onChange={handleChange} id="email" name="email" type="email" required className="input"/>
                </div>

                <div className="form-group">
                        <label htmlFor="password" className="label">Password</label>
                    <input value={data.password} onChange={handleChange} id="password" name="password" type="password"  required
                           className="input"/>
                </div>
                <div className="form-group">
                    <button onClick={handleSubmit} type="submit" className="button">Sign Up</button>
                </div>
            </form>

            <p className="already-a-member">Already a member? <Link href="/login" className="signin-link">Login</Link>
            </p>
        </div>
    )
}
