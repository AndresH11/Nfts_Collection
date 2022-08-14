import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./Alert";
import Layout from "./Layout";

const Login = ()=>{
  const [ user, setUser] = useState({
    email : '',
    password : '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, setVigila, vigila } = useAuth();

  //FUNCION LOGEARSE CON CORREO Y CONTRASEÑA
  const handleSubmit = async(e)=>{
    try {
      setError('');
      e.preventDefault();
      await login(user.email, user.password);
      setVigila(!vigila);
      //LE DAMOS UN TIEMPO PARA QUE SE ACTUALICE EL ESTADO DE LOGIN Y ASÍ PODER ENTRAR AL HOME
      setTimeout(() => {
        navigate('/');
      }, 50);
    } catch (error) {
      if(error.code === 'auth/user-not-found') setError('Usuario invalido');
      if(error.code === 'auth/wrong-password') setError('Contraseña incorrecta');
      if(error.code === 'auth/invalid-email') setError('Por favor ingrese un correo');
      if(error.code === 'auth/internal-error') setError('Ingrese una contraseña');
      console.log(error.message);
    }
  };

  //OBTENEMOS EL EMAIL Y EL PASSWORD
  const handleChange = ({ target : {name, value} })=>{
    setUser({ ...user, [name] : value});
  };

  ////FUNCION PARA LOGEARSE CON GOOGLE
  //const handleGoogleLogin = async()=>{
  //  try {
  //    await loginWithGoogle();
  //    navigate('/');
  //  } catch (error) {
  //    console.log(error.message);
  //    if(error.code === 'auth/popup-closed-by-user') setError('Ventana de autenticación cerrada');
  //  }
  //};

  return(
    <>
      <Layout>
        <div>
          {error && <Alert message={error} />}
          <form onSubmit={handleSubmit} className="mt-3">
            <h1 className="font-black text-2xl leading-7 not-italic mb-2 ">Hello Again!</h1>
            <p className="font-normal text-lg leading-5 not-italic mb-5">Welcome Back</p>
            <div className="w-72 h-12 flex items-center justify-center mb-6 containerInput" >
              <i className='bx bxs-envelope text-3xl mr-3' style={{'color':'#B5B5B5'}}></i>
              <input type='email' onChange={handleChange} name="email" className="pl-2.5 h-full w-9/12 focus:outline-none focus:shadow-outline font-normal text-lg text-gray-400" placeholder="Email Address" />
            </div>
            <div className="w-72 h-12 flex items-center justify-center mb-5 containerInput" >
              <i className='bx bxs-lock-alt text-3xl mr-3' style={{'color':'#B5B5B5'}}></i>
              <input type='password' onChange={handleChange} name="password" className="pl-2.5 h-full w-9/12 focus:outline-none focus:shadow-outline font-normal text-lg text-gray-400" placeholder="Password" />
            </div>
            <button type="submit" className="w-72 h-12 text-white not-italic text-lg leading-5 font-medium mb-2" style={{'backgroundColor':'#0575E6','borderRadius':'73px'}} >Login</button>
          </form>
          <Link to='/forgotpassword' className="font-normal text-sm leading-4" style={{'color':'#979797'}} >Forgot Password?</Link>
          <p className="font-normal text-sm leading-4 mt-6" style={{'color':'#979797'}}>Don’t have account?<Link to='/register' style={{'color':'#0575E6','paddingLeft' : '10px'}}>Sign-up</Link></p>
        </div>
      </Layout>
    </>
  );
};

export default Login;