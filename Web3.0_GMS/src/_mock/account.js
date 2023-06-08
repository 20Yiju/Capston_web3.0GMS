import User from '../shareInfo/userInfo';

const user = User.getInstance();

const account = {
  displayName: user.name,
  email: user.email,
  studentID: user.id,
  department: user.department,
  accounnt: user.account
};

export default account;

