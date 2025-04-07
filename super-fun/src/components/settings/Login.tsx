import { ReactElement, useState } from "react";
import { Button, Card, FormControl, Grid2 as Grid, IconButton, Input, InputAdornment, InputLabel, TextField, Typography } from "@mui/material";
import { VisibilityOff, Visibility, Home } from '@mui/icons-material';
import { Item } from "../shared/Item";
import LoadingSpinner from "../shared/LoadingSpinner";

const Login = (): ReactElement => {
    const [user, setUser] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    /**
     * 
     * @returns Mouse actions
     */
    const handleClickShowPassword = () => setShowPassword(!showPassword)
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    /**
     * Text inputs
     */
    const handleChange = () => { };

    const handleLogin = () => {
        setTimeout(() => { setIsLoading(true); }, 500)
        window.location.href = "/Dashboard"
    }

    return <>{isLoading ? <LoadingSpinner /> :
        <div style={{ maxWidth: '650px', minWidth: '380px', marginInline: 'auto' }}>
            <Card>
                <Grid container spacing={1}>
                    <Grid size={12}>
                        <Typography variant="h4">Welcome to Admin Dashboard</Typography>
                    </Grid>
                    <Grid size={1} />
                    <Grid size={3}>
                        <Item>User Name</Item>
                    </Grid>
                    <Grid size={1} />
                    <Grid size={6}>
                        <TextField variant="standard" id="userText" fullWidth={true} onChange={() => handleChange()} />
                    </Grid>
                    <Grid size={1} />
                    <Grid size={1} />
                    <Grid size={3}>
                        <Item>Password</Item>
                    </Grid>
                    <Grid size={1} />
                    <Grid size={6}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                fullWidth={true}
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showPassword ? 'hide the password' : 'display the password'
                                            }
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid size={1} />
                    <Grid size={7} />
                    <Grid size={3}>
                        <Button variant="outlined" onClick={() => window.location.href = "/"}><Home /> go home</Button>
                    </Grid>
                    <Grid size={2}>
                        <Button variant="contained" onClick={() => handleLogin()}>Login</Button>
                    </Grid>
                </Grid>
                <p />
            </Card>
        </div>}
    </>
}

export default Login;
