import { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Box,
    TextField,
    Button,
    Typography,
    Link,
    Paper,
} from "@mui/material";
import { signUp, login } from "../api/apiCalls";
import { ToastContainer, toast } from "react-toastify";
// @ts-ignore CSS side-effect imports do not have TypeScript declarations.
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
    const [isNewUser, setIsNewUser] = useState(false);
    const [error, setError] = useState([])

    const defaultValues = {
        name: "",
        email: "",
        password: "",
    }

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit
    } = useForm({
        defaultValues
    });


    const rules = {
        name: {
            required: "Name is required",
        },
        email: {
            required: "Email is required",
            pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
            },
        },
        password: {
            required: "Password is required",
            pattern: {
                value: /^.{6,}$/,
                message: "Password must contain letters and numbers",
            },
        },
    };

    const handleSignInAndLogin = async (data) => {
        try {
            if (isNewUser) {
                await signUp(data);
                toast.success("Account created successfully!");
            } else {
                const { name, ...loginData } = data;

                await login(loginData);

                toast.success("Login successful!");
            }
            reset(defaultValues);
        } catch (error) {
            const message = (error as { response?: { data?: { message?: string } } })
                ?.response?.data?.message;
            toast.error(message || "Something went wrong!");
        }
    };


    return (
        <>
            <ToastContainer />
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f5f5f5",
                }}
            >
                <Paper
                    elevation={4}
                    sx={{
                        width: "350px",
                        padding: "30px",
                        borderRadius: "12px",
                    }}
                >
                    <Typography
                        variant="h5"
                        align="center"
                        sx={{ mb: 3 }}
                    >
                        {isNewUser ? "Create an Account" : "Login"}
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit(handleSignInAndLogin)}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        {isNewUser && (
                            <>
                                <TextField
                                    type="text"
                                    label="Name"
                                    placeholder="Enter Name"
                                    fullWidth
                                    {...register('name', rules.name)}
                                />
                                {typeof errors.name?.message === "string" && (
                                    <Typography variant="caption" color="error">
                                        {errors.name.message}
                                    </Typography>
                                )}
                            </>
                        )}

                        <TextField
                            type="email"
                            label="Email"
                            placeholder="Enter Email"
                            fullWidth
                            {...register('email', rules.email)}
                        />
                        {typeof errors.email?.message === "string" && (
                            <Typography variant="caption" color="error">
                                {errors.email.message}
                            </Typography>
                        )}

                        <TextField
                            type="password"
                            label="Password"
                            placeholder="Enter Password"
                            fullWidth
                            {...register('password', rules.password)}
                        />
                        {typeof errors.password?.message === "string" && (
                            <Typography variant="caption" color="error">
                                {errors.password.message}
                            </Typography>
                        )}

                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                        >
                            {isNewUser ? "Sign Up" : "Login"}
                        </Button>
                    </Box>

                    <Typography align="center" sx={{ mt: 4 }}>
                        {isNewUser ? "Already have an account? " : "No Account? "}

                        <Link
                            component="button"
                            type="button"
                            onClick={() => {
                                setIsNewUser(prev => !prev);
                                reset(defaultValues);
                            }}
                            underline="hover"
                        >
                            {isNewUser ? "Login" : "Create one"}
                        </Link>
                    </Typography>
                </Paper>
            </Box>
        </>
    );
};