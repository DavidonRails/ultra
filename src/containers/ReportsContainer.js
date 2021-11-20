import Reports from '../components/Reports/Reports'
import {connect} from 'react-redux';
import {  
    sendReportHandler
} from '../redux/appReducer'


let mapStateToProps = (state) => {
    return {

    }
}

const ReportsContainer = connect(mapStateToProps, {
    sendReportHandler
})(Reports);

export default ReportsContainer;