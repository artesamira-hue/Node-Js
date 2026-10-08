import { useUserContext } from "../context/userContext.jsx";
import { Box, Button, Paper, Typography } from "@mui/material";

export const Profile = () => {
    const { profile, logout } = useUserContext();

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
            <Paper elevation={4} sx={{ width: "100%", maxWidth: 420, p: 4, borderRadius: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome, {profile.name}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                    You are signed in.
                </Typography>
                <Typography>
                    <strong>Name:</strong> {profile.name}
                </Typography>
                <Typography sx={{ mb: 3 }}>
                    <strong>Email:</strong> {profile.email}
                </Typography>
                <Button variant="contained" onClick={logout}>
                    Log out
                </Button>
            </Paper>
        </Box>
    );
};
