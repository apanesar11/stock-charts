import React from "react";
import {Circle} from "better-react-spinkit";

const PageLoading = ({loading, children}) => {
  return loading ? (
    <div className='d-flex align-items-center justify-content-center min-vh-100'>
      <div style={{
        marginTop: '-150px',
      }}>
        <div className='d-flex justify-content-center'>
          <Circle size={100} className='p-5'/>
        </div>
        <h1>Loading Charts ...</h1>
      </div>
    </div>
  ) : <>{children}</>
};

export default PageLoading;
