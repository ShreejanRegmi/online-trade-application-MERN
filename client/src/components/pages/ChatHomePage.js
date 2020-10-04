import React, { useEffect, useState, useContext, useRef } from 'react'
import '../../Chat.css';
import '../../ChatReset.css';
import io from 'socket.io-client';
import AuthContext from '../../context/auth/authContext';
import profileAvatar from '../../images/user-avatar.png';
import otherUser from '../../images/otheruser.png';
import axios from 'axios';
import queryString from 'query-string';
import Spinner from '../layout/Spinner';
import capitalize from '../../utils/capitalize';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    USER_CONNECTED,
    MESSAGE_RECEIVED,
    MESSAGE_SENT
} from '../../utils/SocketVariables';
import { Link } from 'react-router-dom';
let socket;

toast.configure()
const ChatHomePage = (props) => {
    const { chatWith } = queryString.parse(props.location.search);

    const CHAT_ENDPOINT = 'localhost:5000';

    const authContext = useContext(AuthContext);
    const { loadUser, user } = authContext;

    const [typedMessage, setTypedMessage] = useState('');
    const [wholeChat, setWholeChat] = useState(null);
    const [userList, setUserList] = useState(null);
    const [chattingUser, setChattingUser] = useState(null);

    const onChange = (e) => {
        if (e.keyCode === 13 && typedMessage !== '') {
            onSendClick();
            return;
        }
        setTypedMessage(e.target.value);
    }

    useEffect(() => {
        if (user) {
            socket = io(CHAT_ENDPOINT);
            socket.emit(USER_CONNECTED, user);
            // initSocket();
            // console.log(socket);
        }
        //eslint-disable-next-line
    }, [CHAT_ENDPOINT, user]);

    useEffect(() => {
        if (socket && userList) {
            if (chatWith) {
                if (chattingUser && wholeChat) {
                    initSocket();
                }
            } else {
                initSocket();
            }
        }
        //eslint-disable-next-line
    }, [socket, userList, chattingUser, wholeChat, chatWith])

    const initSocket = () => {
        socket.on(MESSAGE_RECEIVED, messageReceived);
    }

    var firstToastId = 'a';
    var secondToastId = 'a';
    const messageReceived = async (messageData) => {
        // console.log(messageData);
        // console.log('userlist:');
        // console.log(userList);
        // console.log('chatting user:');
        // console.log(chattingUser);
        // console.log('wholechat');
        // console.log(wholeChat);
        let userIdList = userList.map(u => u._id.toString());
        //if the receiver is chatting with the sender, just add to the messages
        if ((chattingUser && (messageData.sender == chattingUser._id))) {
            // console.log(chattingUser._id);
            // console.log(messageData.sender);
            console.log('first condn: ', messageData.sender == chattingUser._id);

            setWholeChat([...wholeChat, messageData]);
            if (!(userIdList.includes(messageData.sender.toString()))) {//from here new
                setUserList([...userList, chattingUser]);
            }//this if condition new
            return;
        }
        else if (userIdList.includes(messageData.sender.toString())) {//receiver not chatting with sender but sender in user list
            console.log('second condn: ', userIdList.includes(messageData.sender.toString()));
            try {
                const res = await axios.get(`/user/${messageData.sender}`);
                const { firstname, lastname } = res.data;
                if (!toast.isActive(firstToastId)) {
                    toast.info(`You received a new message from ${capitalize(firstname)} ${capitalize(lastname)}!`, {
                        position: toast.POSITION.TOP_RIGHT,
                        toastId: firstToastId
                    })
                }
                return;
                // toast.info(`You received a new message from ${capitalize(firstname)} ${capitalize(lastname)}!`, {
                //     position: toast.POSITION.TOP_RIGHT
                // })
            } catch (error) {
                console.log(error);
            }
        }
        else if (!(userIdList.includes(messageData.sender.toString()))) {
            console.log('third condn: ', !(userIdList.includes(messageData.sender.toString())));
            try {
                const res = await axios.get(`/user/${messageData.sender}`);
                setUserList([...userList, res.data]);
                if (!toast.isActive(secondToastId)) {
                    secondToastId = toast.info(`You received a new message`, {
                        position: toast.POSITION.TOP_RIGHT,
                        toastId: secondToastId
                    })
                }
                return;
                // toast.info(`You received a new message`, {
                //     position: toast.POSITION.TOP_RIGHT
                // })
            } catch (error) {
                console.log(error);
            }

        }
    }

    //effect to load logged in user in state
    useEffect(() => {
        loadUser();
        //eslint-disable-next-line
    }, []);

    //effect to load chat history with one user in state
    useEffect(() => {
        (async function () {
            if (chatWith) {
                const res = await axios.get(`/chat/${chatWith}`);
                setWholeChat(res.data);
            }
        })();
        //eslint-disable-next-line
    }, [chatWith, user])

    //effect to get all users the logged in user has chatted with
    useEffect(() => {
        (async function () {
            const res = await axios.get(`/chatUsers`);
            setUserList(res.data);
        })();
        //eslint-disable-next-line
    }, [user])

    //effect to get the details of user the current chat shows
    useEffect(() => {
        (async function () {
            if (chatWith) {
                const res = await axios.get(`/user/${chatWith}`);
                setChattingUser(res.data);
            }
        })();
        //eslint-disable-next-line
    }, [chatWith, user])

    const onUserClick = (e) => {
        const id = e.currentTarget.id;
        props.history.replace('/chat?chatWith=' + id);
    }

    let messageRef = useRef(null)

    //function runs when message is sent
    const onSendClick = () => {
        (async function () {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const data = {
                receiver: chatWith,
                message: typedMessage
            }

            try {
                const res = await axios.post('/chat', data, config);
                setWholeChat([...wholeChat, res.data]);
                setTypedMessage('');
                messageRef.current.value = '';
                addNewUserChatInSidebar();

                socket.emit(MESSAGE_SENT, res.data);

            } catch (error) {
                console.log(error);
                toast.error('Error!', {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
        })();
    }

    const addNewUserChatInSidebar = () => {
        let userIdList = userList.map(u => u._id.toString());
        if (!(userIdList.includes(chattingUser._id.toString()))) {
            setUserList([...userList, chattingUser]);
        }
    }

    if (!user || !userList) return (
        <>
            <section>
                <div className="container-fluid" style={{ paddingTop: '96px' }}>
                    <div className="row pt-5">
                        <div className="col">
                            <Spinner />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
    // console.log(chatWith);
    // console.log(chattingUser);
    return (
        <section>
            <div className="container-fluid" style={{ paddingTop: "7vh" }}>
                <div className="row">
                    <div className="col chatbody">
                        <div id="frame">
                            <div id="sidepanel">
                                <div id="profile">
                                    <div className="wrap">
                                        <img id="profile-img" src={profileAvatar} className="online" alt="" />
                                        <p><span className="text-capitalize">{user && user.firstname}</span> <span className="text-capitalize">{user && user.lastname}</span></p>
                                    </div>
                                    <hr className="mx-4 text-muted" />
                                </div>
                                <div id="contacts">
                                    <ul>
                                        {/*can add another class as online, busy, away*/}
                                        {
                                            userList.map(u => {
                                                const { _id, firstname, lastname } = u;
                                                return <li key={_id} id={_id} className="contact" onClick={onUserClick}>
                                                    <div className="wrap">
                                                        {/* <span className="contact-status"></span> */}
                                                        <img src={otherUser} alt="" />
                                                        <div className="meta">
                                                            <p className="name mt-2 ml-2 mb-1">{capitalize(firstname) + ' ' + capitalize(lastname)}</p>
                                                            {/* <p className="preview text-muted">Click to view chat</p> */}
                                                        </div>
                                                    </div>
                                                </li>
                                            })
                                        }
                                    </ul>
                                </div>

                            </div>
                            {
                                chatWith === undefined ?
                                    <div className="content">
                                        <h2 className="display-4 pt-5 text-center text-secondary" style={{ fontSize: '2rem' }}>Please select a chat</h2>
                                    </div>
                                    :
                                    <div className="content">
                                        <div className="contact-profile">
                                            <img src={otherUser} alt="" />
                                            <Link className="text-dark" to={`/user/${chattingUser && chattingUser._id}`}><span className="text-capitalize">{chattingUser && chattingUser.firstname}</span> <span className="text-capitalize">{chattingUser && chattingUser.lastname}</span></Link>
                                            <div className="social-media">
                                                {chattingUser && chattingUser.facebook ? <a href={`https://www.facebook.com/${chattingUser.facebook}`} target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook text-muted"></i></a> : null}
                                                {chattingUser && chattingUser.instagram ? <a href={`https://www.instagram.com/${chattingUser.instagram}`} target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram text-muted"></i></a> : null}
                                            </div>
                                        </div>
                                        <div className="messages">
                                            <ul>
                                                {
                                                    wholeChat && wholeChat.map(msg => {
                                                        let msgType = msg.sender === user._id ? "sent" : "replies";
                                                        let msgAvatar = msgType === "sent" ? profileAvatar : otherUser;
                                                        return <li key={msg._id} className={msgType}>
                                                            <img src={msgAvatar} alt="" />
                                                            <p>{msg.message}</p>
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                        <div className="message-input" style={{ marginLeft: '4px' }}>
                                            <div className="wrap">
                                                <input ref={messageRef} type="text" placeholder="Write your message..." onKeyUp={onChange} />
                                                <button className="submit" onClick={onSendClick} style={{ float: 'none', width: '81px' }} disabled={typedMessage.length < 1}>
                                                    <i className="fa fa-paper-plane"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default ChatHomePage
