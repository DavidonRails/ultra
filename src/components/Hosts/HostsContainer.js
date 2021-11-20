import Hosts from './Hosts';
import {connect} from 'react-redux';
import {setMatchPlaces, sendMessageHandler} from '../../redux/appReducer';

let mapStateToProps = (state) => {
  return {
    loading: state.appPage.loadingApp,
    matchPlaces: state.appPage.matchPlaces,
  };
};

const HostsContainer = connect(mapStateToProps, {
  setMatchPlaces,
  sendMessageHandler
})(Hosts);

export default HostsContainer;
