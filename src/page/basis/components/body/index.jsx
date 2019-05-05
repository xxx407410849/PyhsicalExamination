import React from 'react';
import './index.less';
import ExamSetter from './components/examSetter/index';
import SubSetter from './components/subSetter/index';
import StudentSetter from './components/studentSetter/index';
import TeacherSetter from './components/teacherSetter/index';
class Body extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        let {selectKey} = this.props;
        let Component = ExamSetter;
        switch (selectKey[0]) {
            case "examDate":
                Component = ExamSetter;
                break;
            case "subInfo":
                Component = SubSetter;
                break;
            case "studentSet":
                Component = StudentSetter;
                break;
            case "teacherSet":
                Component = TeacherSetter;
                break;
            default:
                break;
        }
        return (
            <div className = "b-ctn">
                {
                    <Component />
                }
            </div>
        )
    }
}

export default Body;
