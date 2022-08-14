import { useAuth } from "../context/AuthContext";
import { useView } from "../context/ViewContext";
import AddLayer from "./AddLayers";
import Footer from "./Footer";
import Header from "./Header";
import MainBody from "./MainBody";
import Reloader from "./Preloader";

const Home = ()=>{
  
  const { loading } = useAuth();
  const { reload } = useView();

  if(loading) return <h1>loading</h1>
  
    return(
        <div>
          <Header />
          <MainBody />
          <AddLayer />
          <Reloader view = {reload} />
          <Footer />
        </div>
    );
}

export default Home;