import "../App.css";

const Reloader = ({view}) => {
  return (
    <div className= {`${view ? 'block' : 'hidden'} flex justify-center items-center h-screen`}>
      <div className="reloader__container">
        <p className="reloader__text">Uploading...</p>
        <div className="reloader__externalBar">
          <div className="reloader__internalBar"></div>
        </div>
      </div>
    </div>
  );
};

export default Reloader;
