import Payment from '../components/Payment/Payment'
import {connect} from 'react-redux'
import { 
    createPayments,
    getPaymentPlans,
    createApplePayPayments,
    marketPaymentHandler
} from '../redux/registerReducer'


let mapStateToProps = (state) => {
    return {
        loading: state.registerPage.loading,
        plans: state.registerPage.plans,
    }
}

const PaymentContainer = connect(mapStateToProps, {
    createPayments,
    getPaymentPlans,
    createApplePayPayments,
    marketPaymentHandler
})(Payment);

export default PaymentContainer;