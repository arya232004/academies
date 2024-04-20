import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useAuth } from '../auth/authcontext';
import { adddata } from './functions';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SubjectPopup(props) {
    const {user}=useAuth();
  const [subjectName, setSubjectName] = React.useState('');
  const [selectedFiles, setSelectedFiles] = React.useState([]);

  const handleSubjectNameChange = (event) => {
    setSubjectName(event.target.value);
  };

  const handleFileChange = (event) => {
    const filesArray = Array.from(event.target.files);
    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...filesArray]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevSelectedFiles) => prevSelectedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    adddata(user.email,subjectName,selectedFiles);
    setSubjectName('');
    setSelectedFiles([]);
    props.onClose();
    props.setSubject((prevSubject) => [...prevSubject, subjectName]);
  };

  function closemodal(){
    setSubjectName('');
    setSelectedFiles([]);
    props.onClose();
  }

  return (
    <div>
      <Modal
      email={user.email}
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{marginBottom:'14px'}}>
            Name of the subject
          </Typography>
          <TextField
            id="outlined-basic"
            label="Subject Name"
            variant="outlined"
            value={subjectName}
            onChange={handleSubjectNameChange}
          />
          <input type="file" onChange={handleFileChange} multiple />
          {selectedFiles.map((file, index) => (
            <div key={index}>
              <Typography>{file.name}</Typography>
              <Button onClick={() => handleRemoveFile(index)}>Remove</Button>
            </div>
          ))}
          <Button onClick={handleSubmit} style={{display:'block'}}>Create Subject</Button>
          <Button onClick={closemodal}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}
