import Chat from '../components/Chat/Chat'
import {connect} from 'react-redux';
import {  
    setChatListHandler,
    setChatMessages
} from '../redux/appReducer'


let mapStateToProps = (state) => {
    return {
        id : state.appPage.id,
        loading: state.appPage.loadingApp,
        chatList: state.appPage.chatList,
    }
}

const ChatContainer = connect(mapStateToProps, {
    setChatListHandler,
    setChatMessages
})(Chat);

export default ChatContainer;