//signup.js
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function Signup({ signupVisible, toggleSignupVisible, toggleLoginVisible }) {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errormsg, setErrormsg] = useState('');

	useEffect(() => {
		if (errormsg) {
			toast.info(errormsg, {
				position: 'top-center',
				autoClose: 1500,
				hideProgressBar: true,
				closeButton: false
			});
			setErrormsg('');
		}
	}, [errormsg]);

	const googleAuth = () => {
		window.open(
			`${process.env.REACT_APP_API_URL}/auth/google/callback`,
			"_self"
		);
	};

	const handleSignup = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, {
				username,
				email,
				password,
			});
			if (response.data.message === 'User created successfully') {
				handleLoginVisible();
			} else {
				setErrormsg(response.data.message);
			}
		} catch (error) {
			if (error.response && error.response.status === 400) {
				setErrormsg(error.response.data.message);
			} else {
				setErrormsg('An unexpected error occurred. Please try again.');
			}
		}
	};

	const handleSignupVisible = () => {
		toggleSignupVisible();
	}

	const handleLoginVisible = () => {
		toggleLoginVisible();
	}

	const handleContainerClick = (event) => {
		// Prevent propagation of click event to parent elements
		event.stopPropagation();
	}

	return (
		<>
			<ToastContainer />
			{signupVisible && (
				<div className="auth-bg" onClick={handleSignupVisible}>
					<div className="cardContainer" onClick={handleContainerClick}>
						<div className="card">
							<p className="auth-title">SIGN UP</p>
							<form className="signup-form" onSubmit={handleSignup}>
								<input type="text" className="auth-input" name="username" onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
								<input type="email" className="auth-input" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
								<input
									type="password"
									className="auth-input"
									name="password"
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Password"
									required
								/>
								<button type="submit" className="login-btn">Sign Up</button>
							</form>
							<div className="separator">
								<div></div>
								<span>OR</span>
								<div></div>
							</div>
							<button className="signin" onClick={googleAuth}>
								<svg
									viewBox="0 0 256 262"
									preserveAspectRatio="xMidYMid"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
										fill="#4285F4"
									></path>
									<path
										d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
										fill="#34A853"
									></path>
									<path
										d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
										fill="#FBBC05"
									></path>
									<path
										d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
										fill="#EB4335"
									></path>
								</svg>
								Sign up with Google
							</button>
							<p className="auth-switch">
								Already Have Account ? <span className="switch-link" onClick={handleLoginVisible}>Login</span>
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Signup;