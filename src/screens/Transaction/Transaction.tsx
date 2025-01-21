import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface IProps {}

/**
 * @author
 * @function @Transactions
 **/

const Transactions: FC<IProps> = props => {
  const {container} = styles;
  return (
    <View style={container}>
      <Text>Transactions</Text>
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

export default Transactions;
