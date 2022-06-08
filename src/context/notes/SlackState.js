import SlackContext from "./slackContext";
import { useState } from "react";

const SlackState = (props) =>{

    const host = 'http://localhost:5000'
    const slackInitial = []
    
    //add a Json
    const addData = async (title, description, tag)=>{
        const response = await fetch(`${host}/api/notes/addnote`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });
        const json = await response.json()
        console.log(json)
        console.log("adding a new Note")
        getNotes();
        // const note = {
        //     "_id": "623cc5dd08156a2b1bs9129aa",
        //     "user": "623bbd05d0b9b6d5404fb94e",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "2022-03-24T19:26:21.448Z",
        //     "__v": 0
        //   };
        // setNotes(notes.concat(note))
    }
   
    
    const [slackdata, setSlackdata] = useState(slackInitial)

    return(
        <NoteContext.Provider value={{slackdata, addData}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;