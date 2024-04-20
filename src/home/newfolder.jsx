import { create } from '@mui/material/styles/createTransitions';
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import { Margin } from '@mui/icons-material';
// import Fab from "@material-ui/core/Fab";

// import Zoom from "@material-ui/core/Zoom";
import AddIcon from "@mui/icons-material/Add";
import SubjectPopup from './modal';
// import { collectionRef,getDoc,db,arrayUnion,updateDoc,doc } from './firebase';
// import { useAuth } from "./AuthContext";

function Createarea(props)
{
  
  const [openPopup, setOpenPopup] = useState(false);

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleUploadSubject = (subjectName) => {
    console.log('Subject Name:', subjectName);
  };



    return (
        <div style={{display:'inline-block'}}>
      <div className='create' onClick={handleOpenPopup} style={{justifyContent:'center',maxWidth:'100%' }}> 
        <AddIcon  style={{ 
          fontSize: 50,
          position: 'static',
          top:'90px',
          color: 'black',
          borderRadius: 100,
          cursor: 'pointer',
          // position: 'fixed',
          // bottom: 20,
          // right: 20,
          // zIndex: 1000,
        }}/>
    </div>
    <SubjectPopup open={openPopup} onClose={handleClosePopup} onUpload={handleUploadSubject} setSubject={props.setSubject} />
    </div>
    );
    
}
export default  Createarea;