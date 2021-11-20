import Profile from '../components/Profile/Profile'
import {connect} from 'react-redux'
import { 
    getUserInfo,
    uploadNewPhoto,
    setMyAnswersHandler,
    setProfileCompleteHandler,
    setGuidelines,
    setMyFreeDate,
    getUserInterestHandler,
    setMatchHistory,
    setBioHandler,
    setBio,
    updateBioHandler
} from '../redux/appReducer'

let mapStateToProps = (state) => {
    return {
        loadingApp: state.appPage.loadingApp,
        name: state.appPage.name,
        id: state.appPage.id,
        age: state.appPage.age,
        location: state.appPage.location,
        avatar: state.appPage.avatar,
        userSetting: state.appPage.userSetting,
        guidelines: state.appPage.guidelines,
        profileComplete: state.appPage.profileComplete,
        myAnswers: state.appPage.myAnswers,
        myFreeDate: state.appPage.myFreeDate,
        userInterest: state.appPage.userInterest,
        matchHistory: state.appPage.matchHistory,
        userStatistic: state.appPage.userStatistic,
        bio: state.appPage.bio,
    }
}

const ProfileContainer = connect(mapStateToProps, {
    getUserInfo,
    uploadNewPhoto,
    setMyAnswersHandler,
    setProfileCompleteHandler,
    setGuidelines,
    setMyFreeDate,
    getUserInterestHandler,
    setMatchHistory,
    setBioHandler,
    setBio,
    updateBioHandler
})(Profile);

export default ProfileContainer;