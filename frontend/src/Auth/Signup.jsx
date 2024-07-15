import React from 'react'
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firbase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { Box, CircularProgress, Typography } from '@mui/material';
const Signup = () => {
    const [showLoading, setshowLoading] = useState(false);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [userName, setuserName] = useState("");
    const [success, setSuccess] = useState("");
    const [err, setErr] = useState("");

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    if (loading) {
        return (
            <Box sx={{ display: "flex" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: "flex" }}>
                <Typography variant="h1" color="error">
                    {" "}
                    ERROR{" "}
                </Typography>
            </Box>
        );
    }

    if (user) {
        if (!user.emailVerified) {
            return (
                <div>
                    <p>We send you an email to verify your Account</p>
                </div>
            );
        }
    }

    if (!user) {
        return (
            <>
                <form>
                    <p style={{ fontSize: "23px", marginBottom: "22px" }}>
                        Create a new account <span> </span>💛
                    </p>
                    <input
                        onChange={(eo) => {
                            setuserName(eo.target.value);
                        }}
                        required
                        placeholder=" UserName : "
                        type="text"
                    />
                    <input
                        onChange={(eo) => {
                            setemail(eo.target.value);
                        }}
                        required
                        placeholder=" E-mail : "
                        type="email"
                    />
                    <input
                        onChange={(eo) => {
                            setpassword(eo.target.value);
                        }}
                        required
                        placeholder=" Password : "
                        type="password"
                    />
                    <button
                        onClick={async (eo) => {
                            eo.preventDefault();
                            setshowLoading(true);
                            await createUserWithEmailAndPassword(auth, email, password)
                                .then((userCredential) => {
                                    // Signed in
                                    const user = userCredential.user;
                                    sendEmailVerification(auth.currentUser).then(() => {
                                        //
                                        console.log("Email verification sent!");
                                    });
                                    updateProfile(auth.currentUser, {
                                        displayName: userName,
                                    })
                                        .then(() => {
                                            setSuccess("Your Account has been created successfully")
                                            navigate("/signin");
                                        })
                                        .catch((error) => {
                                            console.log(error.code);
                                            // ...
                                        });
                                    // ...
                                })
                                .catch((error) => {
                                    const errorCode = error.code;
                                    switch (errorCode) {

                                        case "auth/invalid-email":
                                            setErr("Wrong Email")
                                            break;


                                        case "auth/user-not-found":
                                            setErr("Wrong Email")
                                            break;


                                        case "auth/wrong-password":
                                            setErr("Wrong Password")
                                            break;


                                        case "auth/too-many-requests":
                                            setErr("Too many requests, please try aganin later")
                                            break;


                                        default:
                                            setErr("Please check your email & password")
                                            break;

                                    }
                                    // ..
                                });
                            setshowLoading(false);
                        }}
                    >
                        {showLoading ? (
                            <div style={{ justifyContent: "center" }} className="flex">
                                <CircularProgress />
                            </div>
                        ) : (
                            "Sign up"
                        )}
                    </button>
                    <p className="account">
                        Already hava an account <Link to="/signin"> Sign-in</Link>
                    </p>
                    {success}
                    {err}
                </form>
            </>
        );
    }

}

export default Signup