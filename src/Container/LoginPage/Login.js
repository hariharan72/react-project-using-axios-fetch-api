import Axios from 'axios';
import React from 'react';
import classes from './Login.module.css';

class Loginpage extends React.Component {
    onLoginClick = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value
        if(username !== password) {
            alert('Please Enter Valid Credentials!!')
        } else {
            Axios.post('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/login', {username: username, password: password})
            .then(res => {
                alert('Login Successful!')
                localStorage.setItem('loginStatus', true);
                this.props.onUserLoggedIn();
            })
            .catch()
        }
    }

    render() {
        return(
            <div className={classes.MainContainer}>
                <form className={classes.Signin} onSubmit={this.onLoginClick}>
                    <h1 className={classes.FormHeading}>Sign In</h1>
                    <input className={classes.InputItems} type="text" name="username" placeholder="Enter Username" />
                    <input className={classes.InputItems} type="password" name="password" placeholder="Enter Password" />
                    <input className={classes.LoginBtn} type="submit" value="Login" />
                </form>
            </div>
        );
    }
}

export default Loginpage;