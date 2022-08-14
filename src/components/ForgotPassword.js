import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Alert } from "./Alert";
import Layout from "./Layout";

const ForgotPassword = ()=>{

  //DATOS INICIALES DE USER
  const [user,setUser] = useState({
    email : '',
  });

  //DATOS INICIALES DE MENSAJE DE ERROR
  const [error, setError] = useState('');

  //OBTENEMOS EL EMAIL
  const handleChange = ({target : {name,value}})=>{
    setUser({...user, [name] : value});
  }

  // IMPORTANDO FUNCION PARA RESTABLECER LA CONTRASEÑA
  const { resetPassword } = useAuth();

  //RESETEAR UNA CONTRASEÑA
  const handlePassword = async(e)=>{
    e.preventDefault();
    if(!user.email) return setError('por favor ingrese su email');
    try {
      setError('');
      await resetPassword(user.email);
      setError('Revisa tu email');
    } catch (error) {
      if(error.code === 'auth/user-not-found') setError('Usuario no registrado');
    }
  }
  return(
    <>
      <Layout>
        <div>
          {error && <Alert message={error} />}
          <form onSubmit={handlePassword} className="mt-3">
            <h1 className="font-black text-2xl leading-7 not-italic mb-2 ">Forgot Password?</h1>
            <p className="font-normal text-lg leading-5 not-italic mb-5" style={{'maxWidth':'280px'}}>Don’t worry, it happen to the best of us!</p>
            <div className="w-72 h-12 flex items-center justify-center mb-6 containerInput" >
              <i className='bx bxs-envelope text-3xl mr-3' style={{'color':'#B5B5B5'}}></i>
              <input type='email' name="email" onChange={handleChange} className="pl-2.5 h-full w-9/12 focus:outline-none focus:shadow-outline font-normal text-lg text-gray-400" placeholder="Email Address" />
            </div>
            <button type="submit" className="w-72 h-12 text-white not-italic text-lg leading-5 font-medium mb-2" style={{'backgroundColor':'#0575E6','borderRadius':'73px'}}>Send Link</button>
          </form>
          <div className="text-center">
            <Link to='/login' className="font-normal text-sm leading-4" style={{'color':'#0575E6'}} >Sign-in ?</Link>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default ForgotPassword;