class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, riderId, orderId) {
    let user = { id, riderId, orderId };
    // console.log("user->", user);
    this.users.push(user);
    return user;
  }

  getUserList(orderId) {
    let users = this.users.filter((user) => user.orderId === orderId);
    let namesArray = users.map((user) => user.riderId);

    return namesArray;
  }

  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }
  removeUser(id) {
    let user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }
}

module.exports = { Users };
