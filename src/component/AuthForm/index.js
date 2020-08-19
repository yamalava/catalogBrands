import React from 'react';
import styles from './authForm.module.scss';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

export function AuthForm({ title, btnTitle, getDataForm }) {
    const [showPassword, setShowPassword] = React.useState(false);
    const [formData, setFormData] = React.useState({
        login: '',
        password: ''
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const getFormProperty = event => {
        event.preventDefault();
        getDataForm(formData)
    };

    return (
        <section className={styles.auth}>
            <div className={styles.auth__form}>
                <div className={styles.auth__form_header}>
                    <p>{title}</p>
                </div>
                <form className={styles.form} onSubmit={getFormProperty}>
                    <TextField
                        label="Login"
                        autoFocus
                        onChange={event => setFormData({ ...formData, login: event.target.value })}
                        value={formData.login}
                        variant="outlined"
                    />
                    <FormControl fullWidth className={styles.margin} variant="outlined">
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                labelWidth={70}
                                onChange={event => setFormData({ ...formData, password: event.target.value })}
                                value={formData.password}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </FormControl>
                    <Button type="submit" variant="contained">{btnTitle}</Button>
                </form>
            </div>

        </section>
    )
}