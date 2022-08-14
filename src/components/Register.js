import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./Alert";
import Layout from "./Layout";

const Register = ()=>{
  const [ user, setUser] = useState({
    email : '',
    password : '',
    repassword: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); //FUNCION PARA NAVEGAR
  const { signup } = useAuth();
  const handleSubmit = async(e)=>{

    try {
      setError('');
      e.preventDefault();
      //validando que ambas contraseñas sean iguales
      if(user.password !== user.repassword) return setError('Las contraseñas no coinciden');
      await signup(user.email, user.password);
      navigate('/login');
    } catch (error) {
      console.log(error.message);
      if(error.code === 'auth/missing-email') setError('Escriba el correo');
      if(error.code === 'auth/internal-error') setError('Correo invalido');
      if(error.code === 'auth/weak-password') setError('La contraseña debe tener mas de 6 digitos');
      if(error.code === 'auth/email-already-in-use') setError('El correo ya existe');
    }
  };

  //OBTENEMOS EL EMAIL Y EL PASSWORD
  const handleChange = ({ target : {name, value} })=>{
    console.log(name,value)
      setUser({ ...user, [name] : value});
    };

  return(
    <Layout>
      <div>
        {error && <Alert message={error} />}
        <form onSubmit={handleSubmit} className="mt-3">
          <h1 className="font-black text-2xl leading-7 not-italic mb-2">Welcome</h1>
          <p className="font-normal text-lg leading-5 not-italic mb-5">Register for free</p>
          <div className="w-72 h-12 flex items-center justify-center mb-6 containerInput">
            <i className='bx bxs-envelope text-3xl mr-3' style={{'color':'#B5B5B5'}}></i>
            <input type='email' name="email" onChange={handleChange} className="pl-2.5 h-full w-9/12 focus:outline-none focus:shadow-outline font-normal text-lg text-gray-400" placeholder="Email Address" />
          </div>
          <div className="w-72 h-12 flex items-center justify-center mb-5 containerInput">
            <i className='bx bxs-lock-alt text-3xl mr-3' style={{'color':'#B5B5B5'}}></i>
            <input type='password' name="password" onChange={handleChange} className="pl-2.5 h-full w-9/12 focus:outline-none focus:shadow-outline font-normal text-lg text-gray-400" placeholder="Password" />
          </div>
          <div className="w-72 h-12 flex items-center justify-center mb-5 containerInput">
            <i className='bx bxs-lock-alt text-3xl mr-3' style={{'color':'#B5B5B5'}}></i>
            <input type='password' name="repassword" onChange={handleChange} className="pl-2.5 h-full w-9/12 focus:outline-none focus:shadow-outline font-normal text-lg text-gray-400" placeholder="Password" />
          </div>
          <button type="submit" className="w-72 h-12 text-white not-italic text-lg leading-5 font-medium mb-2" style={{'backgroundColor':'#0575E6','borderRadius':'73px'}} >Sign-up</button>
        </form>
        <p className="font-normal text-sm leading-4 mt-6" style={{'color':'#979797'}}>Don’t have account?<Link to='/login' style={{'color':'#0575E6','paddingLeft' : '10px'}}>Signn-in</Link></p>
      </div>
    </Layout>
  );
};

export default Register;