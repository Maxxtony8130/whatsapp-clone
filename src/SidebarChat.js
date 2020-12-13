import { Avatar , IconButton} from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { green } from '@material-ui/core/colors';
import db from './firebase';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import './SidebarChat.css';
import { Link } from 'react-router-dom';
function SidebarChat({ id, name, addNewChat }) {
    const [size, setSize] = useState('');
    const [messages, setMessages] = useState(""); 

    useEffect(() => {
      if(id){
        db.collection('rooms')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => 
               setMessages(snapshot.docs.map((doc) =>
               doc.data()))
            );
        }
    }, [id])



    useEffect(() => {
        setSize(Math.floor(Math.random() * 5000))
    }, []);

    const createChat = () => {
       const roomName = prompt("Plaese enter name for chat");
         
       if (roomName) {
           db.collection("rooms").add({
               name: roomName,
           });
       }
    };

    return !addNewChat ? ( 
        <Link to ={`/rooms/${id}`}>
        <div className="sidebarChat">
            <Avatar src={`https://i.pravatar.cc/${size}`} />
            <div className="sidebarChat__info">
               <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
            </div>
        </div>
        </Link>
    ) : (
        <div 
        onClick={createChat}
        className="sidebarChatIcon">
            <IconButton>
            <AddCircleIcon fontSize="large"  style={{ color: green[500] }} />
            </IconButton>
        </div>
    )
}

export default SidebarChat;
