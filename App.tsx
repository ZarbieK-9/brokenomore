import React, {FC} from 'react';
import Root from 'Root';

// import firbase configuration
import firebase from '@react-native-firebase/app';

import auth from '@react-native-firebase/auth';

interface IProps {}

/**
 * @author
 * @function @App
 **/

const App: FC<IProps> = props => {
  return (
    <>
      <Root />
    </>
  );
};

export default App;
