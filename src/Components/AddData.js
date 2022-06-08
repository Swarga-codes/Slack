import React, { useContext, useState } from "react";


const AddData = () => {
    // const context = useContext(noteContext);
    // const { addNote } = context;
    const [note, setNote] = useState({title:"", description:"",tag:""})
    const handleClick = (e)=>{
        e.preventDefault();
    //   addNote(note.title, note.description, note.tag);
    //   props.showAlert("Note created successfully","success")
      setNote({title:"", description:"",tag:""})
    }
    const onChange = (e)=>{
      setNote({...note, [e.target.name]: e.target.value })
  }
  
    return (
        <div className='container'>
            <form >
                <div className="mb-3" style={{marginTop:"100px"}}>
                    <label htmlFor="title" className="form-label "> <h2>Channel Name</h2> </label>
                    <input type="email" className="form-control " id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3 my-5" >
                    <label htmlFor="description" className="form-label"> <h2>Json Data</h2> </label>
                    <textarea type="text" className="form-control" id="description" rows="10" name="description" value={note.description} onChange={onChange} minLength={5} required />
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}> Upload  </button>
            </form>
        </div>
    );
  };

export default AddData