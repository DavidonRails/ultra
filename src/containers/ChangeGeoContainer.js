import ChangeGeo from '../components/Settings/ChangeGeo'
import {connect} from 'react-redux';
import {  
    changeUserLocation
} from '../redux/appReducer'


let mapStateToProps = (state) => {
    return {
        loading: state.appPage.loadingApp,
    }
}

const ChangeGeoContainer = connect(mapStateToProps, {
    changeUserLocation
})(ChangeGeo);

export default ChangeGeoContainer;