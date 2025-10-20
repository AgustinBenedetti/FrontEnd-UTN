import React from "react";
import useFetch from "../../hooks/useFetch";
import { register } from "../../serivce/authService";
import useForm from "../../hooks/useForm";
import { Link } from "react-router";

const Register = () => {
    //Guardamos los campos que tendra nuestro form
    const REGISTER_FORM_FIELDS = {
        USERNAME: 'username',
        EMAIL: 'email',
        PASSWORD: 'password'
    }

    //Que valor tendra inicialmente el estado de formulario
    const initial_form_state = {
        [REGISTER_FORM_FIELDS.USERNAME]: '',
        [REGISTER_FORM_FIELDS.EMAIL]: '',
        [REGISTER_FORM_FIELDS.PASSWORD]: ''
    }

    //Estados para manejar una consulta al servidor
    const {response, error, loading, sendRequest} = useFetch()

    function onRegister (form_state_sent) {
        sendRequest(
            () => {
                return register(
                    form_state_sent[REGISTER_FORM_FIELDS.USERNAME], 
                    form_state_sent[REGISTER_FORM_FIELDS.EMAIL], 
                    form_state_sent[REGISTER_FORM_FIELDS.PASSWORD]
                )
            }
        )
    }

    
    //Alternativa, usar react hook forms / React formik
    const {
        form_state, 
        onInputChange, 
        handleSubmit, 
        resetForm
    } = useForm(
        initial_form_state, 
        onRegister
    )
    
    
  return (
    <div>
        <div className="Session-container">
            <Link to="/login"><button>Login</button></Link>
            <button>Register</button>
        </div>
        <form onSubmit={handleSubmit}>
            <div className='form-field'>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    placeholder='pepe' 
                    value={form_state[REGISTER_FORM_FIELDS.USERNAME]}
                    name={REGISTER_FORM_FIELDS.USERNAME}
                    id='username'
                    onChange={onInputChange}
                />
            </div>
            <div className='form-field'>
                <label htmlFor="email">Email:</label>
                <input 
                    type="text" 
                    placeholder='pepe@mail.com' 
                    value={form_state[REGISTER_FORM_FIELDS.EMAIL]}
                    name={REGISTER_FORM_FIELDS.EMAIL}
                    onChange={onInputChange}
                    id={'email'}
                />
            </div>
            <div className='form-field'>
                <label htmlFor="password">Password:</label>
                <input 
                    type="text" 
                    placeholder='pepe-123' 
                    value={form_state[REGISTER_FORM_FIELDS.PASSWORD]}
                    name={REGISTER_FORM_FIELDS.PASSWORD}
                    onChange={onInputChange}
                    id={'password'}
                />
            </div>
            {error && <span style={{color: 'red'}}> {error} </span>}
            {response && <span style={{color: 'green'}}> User successfully registered </span>}
            {
                loading 
                ? <button disabled>Registering</button>
                : <button>Register</button>
            }
            
        </form>
    </div>
  )
}

export default Register