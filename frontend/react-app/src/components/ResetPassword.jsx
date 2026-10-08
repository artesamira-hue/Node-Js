import { useState } from "react";
import { Alert, Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router";
import { resetPassword } from "../api/apiCalls";

export const ResetPassword = ({ token }) => {
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState("");
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const password = watch("password");

    const submitNewPassword = async ({ password: newPassword }) => {
        setServerError("");
        try {
            await resetPassword(token, newPassword);
            setSuccess(true);
        } catch (error) {
            setServerError(
                error.response?.data?.message || "Could not reset the password. Please try again."
            );
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
                p: 2,
            }}
        >
            <Paper
                elevation={4}
                sx={{ width: "100%", maxWidth: 380, p: 4, borderRadius: 3 }}
            >
                <Typography variant="h5" align="center" sx={{ mb: 3 }}>
                    Reset Password
                </Typography>

                {success ? (
                    <>
                        <Alert severity="success" sx={{ mb: 2 }}>
                            Your password has been changed.
                        </Alert>
                        <Button component={RouterLink} to="/" variant="contained" fullWidth>
                            Back to Login
                        </Button>
                    </>
                ) : (
                    <Box
                        component="form"
                        onSubmit={handleSubmit(submitNewPassword)}
                        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                        {serverError && <Alert severity="error">{serverError}</Alert>}

                        <TextField
                            type="password"
                            label="New password"
                            fullWidth
                            {...register("password", {
                                required: "New password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                            error={Boolean(errors.password)}
                            helperText={errors.password?.message}
                        />

                        <TextField
                            type="password"
                            label="Confirm new password"
                            fullWidth
                            {...register("confirmPassword", {
                                required: "Please confirm your new password",
                                validate: (value) =>
                                    value === password || "Passwords do not match",
                            })}
                            error={Boolean(errors.confirmPassword)}
                            helperText={errors.confirmPassword?.message}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Saving..." : "Save New Password"}
                        </Button>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};
