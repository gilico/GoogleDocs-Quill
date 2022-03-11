import React,{ useState, useEffect } from 'react';
import './formStyle.css';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import { register } from '../../redux/actions/userActions';
import Expire from '../../components/Expire';


const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
   
    const dispatch = useDispatch();
    const navigate =  useNavigate();

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

   

    
    const submitHandler = async (e) => {
        e.preventDefault();
        
        dispatch(register(name, email, password, confirmPassword))
        
    }

    useEffect(() => {
        if(userInfo)
        {
            navigate('/login');
        }
    }, [navigate, userInfo])

    return (
        <div className="form-sign-log">
             <form action="/signup" className="signup" onSubmit={submitHandler}>
                <h2>Sign up</h2>
                { error &&<Expire delay="3000"><ErrorMessage> {error} </ErrorMessage></Expire> }
                <div id="inputs-cont">
                    <div className="form-part">
                        <label>Full Name</label>
                        <input type="text" name="name" required autoComplete="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label>Email</label>
                        <input type="text" name="email" required autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-part">
                            <label>Password</label>
                        <input id="password" type="password" name="password" required autoComplete="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <label>Confirm Password</label>
                        <input type="password" name="confPassword" required autoComplete="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className='form-footer'>

                    { loading && <Loading />}
                    <button>Sign up</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp
