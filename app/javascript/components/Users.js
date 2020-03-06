import React from "react";
import axios from "axios";

// - React writes its html in a javascript file called jsx
// - this means in our html we can write javascript by using brackets {}
// - in react there is state and props, props is what is first passed to the
//   component and state is there to handle changes to, well the state of the 
//   component
//   we are using axios to do are api calls, but our routes still match what    //   they do in rails
class Users extends React.Component {
  // props is what we pass to components we also need to call
  // super so the Component class we are extending gets the props
  constructor(props) {
    super(props);
    // state is how we manage changes to our component
    this.state = {
      users: this.props.users
    };
  }

  // a example with a axios post request (Promise here)
  addRandomUser() {
    axios
      .post("http://localhost:3000/users", {
        f_name: "User",
        l_name: `${Math.floor(Math.random() * 100)}`
      })
      .then(response => {
        console.log(response);
        const newUser = response.data
        // calling setState will trigger the render function to be called
        this.setState({
          // adding new user to the begging of the array
          users: [newUser, ...this.state.users]
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // a example with a axios delete request (Promise here)
  deleteUser = id => {
    const { users } = this.state
    axios.delete("/users/" + id).then(res => {
      // status ok
      console.log(res)
      if (res.status != 200) {
        alert("failed to deleted should refresh page");
      }
      // get deleted user from database
      const deletedUser = res.data;
      //user deleted from database but we need to update our UI
      const newUsers = users.filter(user => user.id != deletedUser.id);
      this.setState({
        users: newUsers
      });
    });
  };


  renderUsers() {
    // map over our users and create an array of them JSX
    return this.state.users.map(user => (
      <li key={user.id}>
        {/* display user name */}
        {`${user.f_name} ${user.l_name}`}

        {/* delete user name */}
        <div onClick={() => this.deleteUser(user.id)}>delete</div>

        {/* show user */}
        <a href={`http://localhost:3000/users/${user.id}`}>show user</a>
      </li>
    ));
  }

  // render must be defined in all react classes it is what is responsible for 
  // rendering html to page
  render() {
    return (
      <div>
        <h1>All Users</h1>
        <div onClick={() => this.addRandomUser()}>add random user</div>
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

export default Users;
