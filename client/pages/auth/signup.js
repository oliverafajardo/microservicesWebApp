import { useState } from "react";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(email, password);
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