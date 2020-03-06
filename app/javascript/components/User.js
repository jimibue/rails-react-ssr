import React from "react"
class User extends React.Component {
  render () {
    return (
      <React.Fragment>
        {this.props.user.f_name}
        {this.props.user.l_name}
        <a href={`http://localhost:3000/`} >back</a>
      </React.Fragment>
    );
  }
}

export default User
