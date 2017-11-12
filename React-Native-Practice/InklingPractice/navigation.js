import {
  StackNavigator,
} from 'react-navigation';
import App from './App';
import ListIndex from './list_index';


const Navigation = StackNavigator({
  Home: { screen: App },
  ListIndex: { screen: ListIndex },
});

export default Navigation;