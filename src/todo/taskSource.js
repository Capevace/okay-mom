import FirebaseList from '../general/FirebaseList';
import { onLoadedTasks, onTaskAdded, onTaskChanged, onTaskRemoved } from './actions/taskActions';

export default new FirebaseList({
  onValuesLoaded: onLoadedTasks,
  onValueAdded: onTaskAdded,
  onValueChanged: onTaskChanged,
  onValueRemoved: onTaskRemoved,
});
