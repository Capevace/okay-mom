import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

class UserSelectorInput extends React.Component {

  constructor() {
    super();
    this.handleUserAdd = this.handleUserAdd.bind(this);
    this.handleUserDelete = this.handleUserDelete.bind(this);
    this.handleUserDrag = this.handleUserDrag.bind(this);
    this.valueChanged = this.valueChanged.bind(this);
  }

  handleUserAdd(userName) {
    const users = this.props.users;

    const user = [{ displayName: 'Lukas' }].reduce((finalUser, currentUser) =>
      currentUser.displayName === userName
        ? currentUser
        : finalUser, false);

    if (user) {
      users.push(user);
      this.valueChanged(users);
    }
  }

  handleUserDelete(index) {
    const users = this.props.users;
    users.splice(index, 1);
    this.valueChanged(users);
  }

  handleUserDrag(user, currPos, newPos) {
    const users = this.props.users;

    users.splice(currPos, 1);
    users.splice(newPos, 0, user);

    this.valueChanged(users);
  }

  valueChanged(users) {
    if (this.props.onChange) {
      this.props.onChange(users);
    }
  }

  render() {
    return (
      <div>
        <ReactTags
          tags={
            this.props.users.map((user, index) =>
              ({ id: index, text: user.displayName }))
            || []
          }
          suggestions={this.props.suggestions || []}
          placeholder="Assign family members"
          minQueryLength={1}

          handleAddition={this.handleUserAdd}
          handleDelete={this.handleUserDelete}
          handleDrag={this.handleUserDrag}
        />
      </div>
    );
  }
}

export default UserSelectorInput;
