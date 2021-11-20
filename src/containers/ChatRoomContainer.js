import ChatRoom from '../components/ChatRoom/ChatRoom'
import {connect} from 'react-redux';
import {  
    setChatMessagesHandler,
    sendMessageHandler,
    sendReportHandler,
    setAgreeMatch,
    setDateCount,
    sendBlockHandler,
    sendGhostHandler
} from '../redux/appReducer'


let mapStateToProps = (state) => {
    return {
        id : state.appPage.id,
        loading: state.appPage.loadingApp,
        chatMessages: state.appPage.chatMessages,
        dateCount: state.appPage.dateCount,
    }
}

const ChatRoomContainer = connect(mapStateToProps, {
    setChatMessagesHandler,
    sendMessageHandler,
    sendReportHandler,
    setAgreeMatch,
    setDateCount,
    sendBlockHandler,
    sendGhostHandler
})(ChatRoom);

export default ChatRoomContainer;