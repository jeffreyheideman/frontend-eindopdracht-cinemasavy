import {useRef, useState, useEffect} from "react";
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from 'axios';
import './register.css';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const Register = () => {
    const userRef = useRef();
    const emailRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        const isValidEmail = email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        setValidEmail(isValidEmail);
    }, [email]);


    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signup", {
                username: user,
                email: email,
                password: pwd,
                role: ["user", "admin"]
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer xxx.xxx.xxx",
                }
            });
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            <main className="registration-page">
                {success ? (
                    <section className="form-container">
                        <h1>Success!</h1>
                        <p>
                            <a href="#">Sign In</a>
                        </p>
                    </section>
                ) : (
                    <section className="form-container">
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1>Register</h1>
                        <form className="registration-form" onSubmit={handleSubmit}>
                            <label className="auth-label" htmlFor="username">
                                Username:
                                <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"}/>
                                <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"}/>
                            </label>
                            <input
                                className="username-input"
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                4 to 24 characters.<br/>
                                Must begin with a letter.<br/>
                                Letters, numbers, underscores, hyphens allowed.
                            </p>

                            <label className="auth-label" htmlFor="email">
                                Email:
                                {validEmail && email ? (
                                    <FontAwesomeIcon icon={faCheck} className="valid" />
                                ) : (
                                    <FontAwesomeIcon icon={faTimes} className={!email ? "hide" : "invalid"} />
                                )}
                            </label>
                            <input
                                className="email-input"
                                type="text"
                                id="email"
                                ref={emailRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="emailnote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                            <p id="emailnote"
                               className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                Must contain a @<br/>
                                Letters, numbers, underscores, hyphens allowed.
                            </p>


                            <label className="auth-label" htmlFor="password">
                                Password:
                                <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"}/>
                                <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"}/>
                            </label>
                            <input
                                className="pwd-input"
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                8 to 24 characters.<br/>
                                Must include uppercase and lowercase letters, a number and a special character.<br/>
                                Allowed special characters: <span aria-label="exclamation mark">!</span> <span
                                aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span
                                aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>


                            <label className="auth-label" htmlFor="confirm_pwd">
                                Confirm Password:
                                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"}/>
                                <FontAwesomeIcon icon={faTimes}
                                                 className={validMatch || !matchPwd ? "hide" : "invalid"}/>
                            </label>
                            <input
                                className="pwd-confirm-input"
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}/>
                                Must match the first password input field.
                            </p>

                            <button className="login-btn" disabled={!validName || !validPwd || !validMatch}>Sign Up</button>
                        </form>
                        <p>
                            Already registered?<br/>
                            <span className="line">
                            {/*put router link here*/}
                                <a href="#">Sign In</a>
                        </span>
                        </p>
                    </section>
                )}
            </main>
        </>
    )
}

export default Register