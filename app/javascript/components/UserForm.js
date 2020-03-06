import React from "react";

export const UserForm = ({
  isEditing,
  handleClose,
  user,
  handleChange,
  handleSubmit
}) => {
  return (
    <div>
      <h1>{isEditing ? 'Edit User' : "New User"}</h1>
      <div onClick={handleClose}>close</div>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="f_name"
            value={user.f_name}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="l_name"
            value={user.l_name}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
