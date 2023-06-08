class User {
    constructor() {
      this.name = '';
      this.email = '';
      this.id = '';
      this.department = '';
      this.account = '';
    }
  
    static getInstance() {
      if (!User.instance) {
        User.instance = new User();
      }
      return User.instance;
    }
  
    setUserInfo(name, email, id, department, account) {
      this.name = name;
      this.email = email;
      this.id = id;
      this.department = department;
      this.account = account;
    }

  }
  
  export default User;  
