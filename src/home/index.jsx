import React, { useEffect } from "react";
import Nav from "./nav";
import { useAuth } from "../auth/authcontext";
import Createarea from "./newfolder";
import { deletedata, getdata } from "./functions";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";

export default function Home(props) {
    const { user } = useAuth();
    const [subjects, setSubjects] = React.useState([]);
    const naigate=useNavigate();
    useEffect(() => {
        getdata(user.email).then((data) => {
            console.log(data);
            setSubjects(data.subjects);
        });
    }, [user.email]);

    const handleDeleteSubject = (subjectToDelete) => {
        deletedata(user.email, subjectToDelete).then(() => {
            setSubjects((prevSubjects) => prevSubjects.filter(s => s !== subjectToDelete));
        });
    };

    return (
<div style={{ position: 'relative' }}>
  <Nav user={user} />
  <Createarea setSubject={setSubjects} />
  {subjects.map((subject, key) => (
    <div className='note' key={key} style={{ position: 'relative', marginBottom: '20px' }} onClick={() => naigate(`/${subject}`)}>
      <h1 style={{ marginLeft: '20px' }}>{subject}</h1>
      <DeleteIcon style={{ position: 'absolute', bottom: '5px', right: '5px', cursor: 'pointer' }} onClick={() => handleDeleteSubject(subject)} />
    </div>
  ))}
</div>

    );
}
