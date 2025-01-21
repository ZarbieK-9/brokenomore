import {RootNavigation} from 'navigation';
import React, {FC} from 'react';

import auth from '@react-native-firebase/auth';
import EditProfile from 'screens/EditProfile/EditProfile';
interface IProps {}

/**
 * @author
 * @function @Root
 **/

const Root: FC<IProps> = props => {
  return <RootNavigation/>;
};

export default Root;
