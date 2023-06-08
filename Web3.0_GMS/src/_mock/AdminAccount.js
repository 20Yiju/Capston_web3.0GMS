import profilePhoto from '../assets/images/avatars/avatar_default.jpg';
import User from '../shareInfo/userInfo';

const user = User.getInstance();

const account = {
    displayName: user.name,
    email: user.email,
    department: user.department,
  };
  
  export default account;
   
