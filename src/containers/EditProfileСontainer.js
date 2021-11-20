import EditProfile from '../components/Settings/EditProfile'
import {connect} from 'react-redux';
import {setName, 
        setLocation, 
        setAge, 
        setHeight,
        setGender,
        setEthnicity,
        setPolitics,
        setPersonality,
        setBody,
        setReligion,
        setGenderInterest,
        setAgeInterest,
        setHeightInterest,
        updateDataUser,
        setErrorText,
        setLoading
    } from '../redux/registerReducer'


let mapStateToProps = (state) => {
    return {
        genderList: state.registerPage.genderList,
        ageInterestList: state.registerPage.ageInterestList,
        heightInterestList: state.registerPage.heightInterestList,
        ethnicityList: state.registerPage.ethnicityList,
        politicsList: state.registerPage.politicsList,
        personalityList: state.registerPage.personalityList,
        religionList: state.registerPage.religionList,
        bodyList: state.registerPage.bodyList,
        heightList: state.registerPage.heightList,
        ageList: state.registerPage.ageList,
        educationList: state.registerPage.educationList,
        employmentStatusList: state.registerPage.employmentStatusList,
        name: state.registerPage.name,
        location: state.registerPage.location,
        age: state.registerPage.age,
        height: state.registerPage.height,
        gender: state.registerPage.gender,
        ethnicity: state.registerPage.ethnicity,
        politics: state.registerPage.politics,
        personality: state.registerPage.personality,
        body: state.registerPage.body,
        religion: state.registerPage.religion,
        genderInterest: state.registerPage.genderInterest,
        ageInterest: state.registerPage.ageInterest,
        heightInterest: state.registerPage.heightInterest,
        loading: state.registerPage.loading,
        errorText: state.registerPage.errorText,
    }
}

const EditProfileСontainer = connect(mapStateToProps, {
        setName, 
        setLocation, 
        setAge, 
        setHeight,
        setGender,
        setEthnicity,
        setPolitics,
        setPersonality,
        setBody,
        setReligion,
        setGenderInterest,
        setAgeInterest,
        setHeightInterest,
        updateDataUser,
        setErrorText,
        setLoading
    })(EditProfile);

export default EditProfileСontainer;