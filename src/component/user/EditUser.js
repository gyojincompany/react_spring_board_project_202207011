import React, { Component } from "react";
import ApiService from "../../ApiService";

import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

class EditUser extends Component {

    constructor(props){
        super(props);

        this.state = {
            username:'',
            phone:'',
            nickname:'',
            age:'',
            membership:'',
            message:null
        }
    }

    componentDidMount(){
        this.loadUser();
    }

    loadUser = ()=> {
        ApiService.userListById(window.localStorage.getItem("userID"))
        //회원등록 버튼 클릭시 UserList 에 선언되어 있는 editUser 함수가 해당 id를 locallStroage에 임시저장함
        //임시저장된 id(이름:userId)를 가져와 userListById의 인수로 실행
        .then( res => {
            let user = res.data;

            this.setState({
                id: user.id,
                username : user.username,
                phone : user.phone,
                nickname : user.nickname,
                age : user.age,
                membership : user.membership

            })
        })
        .catch(err=> {
            console.log("회원정보수정에러!", err);
        });
    }

    onChange = (e)=> {
        this.setState({
            [e.target.name] : e.target.value

        })
    }

    modifyUser = (e) => {
        e.preventDefault();

        let user = {
            id : this.state.id,
            username : this.state.username,
            phone : this.state.phone,
            nickname : this.state.nickname,
            age : this.state.age,
            membership : this.state.membership
        }

        ApiService.editUser(user)
        .then(res=>{
            this.setState({
                message:user.username + '님 정보가 수정 성공하였습니다.'
            })
            this.props.history.push('/users'); // 회원정보 수정 후 리스트로 요청
        })
        .catch(err=>{
            console.log("회원정보수정에러!",err);
        })
    }

    render(){
        return(
            <div>
                <Typography variant="h4" style={style}>회원 정보 수정</Typography>
                <form style={formContainer}>
                   
                        <label>회원이름:</label>
                        <TextField type='text' name="username" readOnly={true} Value={this.state.username} fullWidth margin="normal"></TextField>
                   
                    
                        <label>전화번호:</label>
                        <TextField type='text' placeholder="전화번호수정" name="phone" 
                        onChange={this.onChange} value={this.state.phone} fullWidth margin="normal"></TextField>
                   
                    
                        <label>별명:</label>
                        <TextField type='text' placeholder="별명수정" name="nickname" 
                        onChange={this.onChange} value={this.state.nickname} fullWidth margin="normal"></TextField>
                    
                    
                        <label>나이:</label>
                        <TextField type='text' placeholder="나이수정" name="age" 
                        onChange={this.onChange} value={this.state.age} fullWidth margin="normal"></TextField>
                    
                        <label>회비:</label>
                        <TextField type='text' placeholder="회비수정" name="membership" 
                        onChange={this.onChange} value={this.state.membership} fullWidth margin="normal"></TextField>
                    
                    <Button variant="contained" color="primary" onClick={this.modifyUser}>회원수정완료</Button>
                </form>
            </div>
        );
    }

}

const style = {
    display:'flex',
    justifyContent : 'center'
}

const formContainer = {
    display : 'flex',
    flexFlow: 'row wrap'
}

export default EditUser;