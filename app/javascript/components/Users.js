import React from "react";
import axios from "axios";
import { UserForm } from "./UserForm";

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
      users: this.props.users,
      showForm: false,
      selectedUser: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(event);
    console.log(event.target.value);
    console.log(event.target.name);
    const { selectedUser } = this.state;
    selectedUser[event.target.name] = event.target.value;

    this.setState({ selectedUser: selectedUser });
  }

  handleSubmit(event) {
    // alert("A name was submitted: " + this.state.value);
    if (this.state.isEditing) {
      this.editUser();
    } else {
      this.newUser();
    }
    event.preventDefault();
  }
  editUser() {
    const { f_name, l_name, id } = this.state.selectedUser;
    axios
      .put(`http://localhost:3000/users/${id}`, {
        f_name: f_name,
        l_name: l_name
      })
      .then(response => {
        console.log(response);
        const newUser = response.data;
       
        const updateUsers = this.state.users.map(user => {
          if (user.id != id) return user;
          return newUser;
        });
        // calling setState will trigger the render function to be called
        this.setState({
          // adding new user to the begging of the array
          showForm: false,
          // users: updateUsers
          users: updateUsers
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // a example with a axios post request (Promise here)
  newUser() {
    const { f_name, l_name } = this.state.selectedUser;
    axios
      .post("http://localhost:3000/users", {
        f_name: f_name,
        l_name: l_name
      })
      .then(response => {
        console.log(response);
        const newUser = response.data;
        // calling setState will trigger the render function to be called
        this.setState({
          // adding new user to the begging of the array
          showForm: false,
          users: [newUser, ...this.state.users]
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // a example with a axios delete request (Promise here)
  deleteUser = id => {
    const { users } = this.state;
    axios.delete("/users/" + id).then(res => {
      // status ok
      console.log(res);
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
  setForm(selectedUser, isEditing = true) {
    this.setState({
      selectedUser,
      showForm: true,
      isEditing
    });
  }

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
        <div onClick={() => this.setForm(user)}>edit</div>
      </li>
    ));
  }

  // render must be defined in all react classes it is what is responsible for
  // rendering html to page
  render() {
    const { showForm, selectedUser, isEditing } = this.state;
    if (showForm) {
      return (
        <div>
          <UserForm
            user={selectedUser}
            isEditing={isEditing}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleClose={() => this.setState({ showForm: false })}
          />
        </div>
      );
    }
    return (
      <div>
        <h1>All Users</h1>
        <div onClick={() => this.setForm({ f_name: "", l_name: "" }, false)}>
          add random user
        </div>
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

export default Users;
