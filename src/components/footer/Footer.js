import React, {useRef, useState} from 'react';
import InputField from "../inputfield/InputField";
import './Footer.css';
import Button from "../button/Button";
import emailjs from '@emailjs/browser';



const Footer = () => {
    const [successMessage, setSuccessMessage] = useState(false);

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_ya411t2', 'template_eo2fb9s', form.current, '2oQ1A0nvaNQ_52uUJ')
            .then((result) => {
                setSuccessMessage(true);
                // console.log(result.text);
                setTimeout(() => {
                    setSuccessMessage(false);
                }, 5000);
            }, (error) => {
                console.log(error.text);
            });
    };


    return (
        <footer className="footer" >
            <h3 className="footer-title">Contact</h3>
            { successMessage ? (<h5>message send!</h5>) : (<form className="contact-form" onSubmit={sendEmail}
            ref={form}>
                <label htmlFor="firstname">First Name</label>
                <InputField
                    type="text"
                    placeholder="John"
                    id="firstname"
                    className="contact-input"
                    name="first_name"
                />
                <label htmlFor="lastname">Last Name</label>
                <InputField
                    type="text"
                    placeholder="Doe"
                    id="lastname"
                    className="contact-input"
                    name="last_name"
                />
                <label htmlFor="email">Email</label>
                <InputField
                    type="email"
                    placeholder="John-Doe@mail.com"
                    id="email"
                    className="contact-input"
                    name="email"
                />
                <label htmlFor="message">Message</label>
                <textarea className="message" name="message"/>

                <Button
                    buttonName="Submit"
                    type="submit"
                    className="contact-button"
                    value="Send"
                />
            </form>)}

        </footer>
    );
};

export default Footer;