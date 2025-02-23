import React, {FC} from 'react';
import Root from 'Root';

import { Provider } from 'react-redux';
import store from 'redux/store';




interface IProps {}

/**
 * @author
 * @function @App
 **/

const App: FC<IProps> = props => {
  return (
    <Provider store={store}>
    
    <Root />
      
    </Provider>
  );
};

export default App;
