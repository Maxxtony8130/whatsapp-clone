import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect, useState } from 'react'
import MicIcon from '@material-ui/icons/Mic';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import './Chat.css';
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';


function Chat() {
    const [size, setSize] = useState('');
    const [input, setInput] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("")
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();


    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId)
                .onSnapshot(snapshot =>
                    setRoomName(snapshot.data().name))
            db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ));
        }
    }, [roomId])


    useEffect(() => {
        setSize(Math.floor(Math.random() * 5000))
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput('');
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://i.pravatar.cc/${size}`} />
                <div className="chat__headerInfo">
                    <h2>{roomName}</h2>
                    <p>Last seen
                     {new Date(
                        messages[messages.length - 1]?.timestamp?.toDate())
                        .toUTCString()}
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}>
                        <span className="chat__name">{message.name}</span>

                        {message.message}
                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate
                                ()).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>
            <div className="chat__footer">
                <IconButton>
                    <EmojiEmotionsIcon />
                </IconButton>
                <IconButton>
                    <AttachFileIcon />
                </IconButton>
                <form >
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message" />
                    <button
                        onClick={sendMessage}
                        type="submit">Send Message</button>
                </form>
                <IconButton>
                    <MicIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
