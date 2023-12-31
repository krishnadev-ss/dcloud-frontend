"use client"
import React, {Fragment} from 'react';
import Image from "next/image";
import Link from "next/link";
import "./style.css";
import {useRouter} from "next/navigation";
import {baseUrl} from "@/app/api/api";
import {toast} from "react-hot-toast";

const Page = () => {
    const router = useRouter();

    const handleClick = async () => {
        fetch(`${baseUrl}api/auth/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        })
            .then(res => res.json())
            .then(data => {

                if (data.success) {
                    router.push("/mycloud");
                } else {
                    toast("Please login to continue")
                   router.push("/login");
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error(err)
            })
    }

    return (
        <Fragment>
            <div className="container">
                <div className="left">
                    <div>
                        <h1>All your files in </h1>
                        <h2>one safe place</h2>
                        <h3>Free file storage for everyone. Store your</h3>
                        <h4>document, music, images for a low price</h4>
                    </div>
                    <button className="upload-button" onClick={handleClick}>
                        <span className="button-text">Start Uploading</span>
                    </button>
                </div>
                <div className="right">
                    <img src="home.png"/>
                </div>
            </div>

        </Fragment>
    )
};

export default Page;
