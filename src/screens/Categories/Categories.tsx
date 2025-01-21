import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface IProps {}

/**
 * @author
 * @function @Categories
 **/

const Categories: FC<IProps> = props => {
  const {container} = styles;
  return (
    <View style={container}>
      <Text>Categories</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Categories;
