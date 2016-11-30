import React from 'react';
import { connect } from 'react-redux';

import FirebaseList from '../../general/FirebaseList2';
import Header from '../../general/containers/Header';
import TaskList from '../../tasks/components/TaskList';

class FamilyRoute extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
    };

    this.familyTaskSource = new FirebaseList({
      onValuesLoaded: (values) => {
        this.setState({
          tasks: values,
        });
      },
      onValueAdded: (value) => {
        this.setState({
          tasks: [
            ...this.state.tasks,
            value,
          ],
        });
      },
      onValueChanged: (value) => {
        this.setState({
          tasks: this.state.tasks.map(task => task.key === value.key ? value : task),
        });
      },
      onValueRemoved: (value) => {
        this.setState({
          tasks: this.state.tasks.filter(task => task.key !== value.key),
        });
      },
    });
  }

  componentWillReceiveProps(props) {
    if (props.family && props.family !== this.props.family) {
      this.familyTaskSource.subscribe(`tasks/${props.family.key}`);
    }
  }

  componentWillUnmount() {
    this.familyTaskSource.unsubscribe();
  }

  render() {
    const { loadingInitialFamilies, family } = this.props;

    return (
      <div>
        <Header
          title={!loadingInitialFamilies && family ? `${family.familyData.name} - Overview` : 'Loading family...'}
        />
        <TaskList tasks={this.state.tasks} />
      </div>
    );
  }
}

FamilyRoute.propTypes = {
  family: React.PropTypes.shape({
    key: React.PropTypes.string,
    familyData: React.PropTypes.shape({}),
  }).isRequired,
  loadingInitialFamilies: React.PropTypes.bool,
};

const mapStateToProps = (state, props) => ({
  loadingInitialFamilies: state.families.loadingInitialFamilies,
  family: state.families.familyObjects[props.params.key],
});

export default connect(mapStateToProps)(FamilyRoute);
