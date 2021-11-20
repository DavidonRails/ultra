import ManageSub from '../components/Settings/ManageSub'
import {connect} from 'react-redux'
import { 
    createPayments,
    getPaymentPlans,
    createApplePayPayments,
    marketPaymentHandler,
    getSubsPlans
} from '../redux/appReducer'


let mapStateToProps = (state) => {
    return {
        loading: state.appPage.loadingApp,
        plans: state.appPage.plans,
        id : state.appPage.id,
        name: state.appPage.name,
        age: state.appPage.age,
        subscriptionList: state.appPage.subscriptionList,
    }
}

const ManageSubContainer = connect(mapStateToProps, {
    createPayments,
    getPaymentPlans,
    createApplePayPayments,
    marketPaymentHandler,
    getSubsPlans
})(ManageSub);

export default ManageSubContainer;