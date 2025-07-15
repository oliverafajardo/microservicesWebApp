import { useState } from "react";
import axios from "axios";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log('Submitting signup form');
    const onSubmit = async (event) => {
        try {
        event.preventDefault();
        
        const response = await axios.post('/api/users/signup', {
            email,
            password
        });
        console.log('this is the response', response.data);
    } catch (error) {
        console.log('this is the error', error);
    }
    }

    return (
        <form className="p-4" onSubmit={onSubmit}>
            <h1 className="mb-3">Sign Up</h1>
            <div className="form-group">
            <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    );
};

export default Signup;