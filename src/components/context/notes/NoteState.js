import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
      const notesInitial = [
            {
                  _id: "62bd4f9148d19cff95249060",
                  user: "62b7608b2b7691b2953f550a",
                  title: "New Note",
                  description: "Please ake up early",
                  tag: "Youtube",
                  date: "2022-06-30T07:24:01.764Z",
                  __v: 0,
            },
      ];
      const [notes, setNotes] = useState(notesInitial)
      return (
         <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
         </NoteContext.Provider>
      ) 
}

export default NoteState