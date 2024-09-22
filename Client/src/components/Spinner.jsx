import React from 'react';
import '../components/Spinner.css'
import { ClipLoader } from "react-spinners";

const Spinner = () => {
    return (
        <>
          <section className='spinner'>
          <ClipLoader size={150} />
            </section>  
        </>
    );
}

export default Spinner;
