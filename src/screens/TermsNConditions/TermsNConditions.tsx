// src/screens/terms-and-conditions.tsx

import React from 'react';
import { View, Text, ScrollView, Button, StyleSheet, Linking } from 'react-native';

const TermsAndConditions: React.FC = () => {
  const [isAccepted, setIsAccepted] = React.useState(false);

  const handleAccept = () => {
    if (isAccepted) {
      // Handle acceptance logic
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Terms And Conditions</Text>
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.title}>Est Fugiat Assumenda Aut Reprehenderit</Text>
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet. Et odio officia aut voluptate internos est
          omnis vitae ut architecto sunt non tenetur fuga ut provident vero. Quo
          aspernatur facere et consectetur ipsum et facere corrupti est
          asperiores facere. Est fugiat assumenda aut reprehenderit voluptatem
          sed.
        </Text>
        <Text style={styles.paragraph}>
          1. Ea voluptates omnis aut sequi sequi.
          {'\n'}2. Est dolore quae in aliquid ducimus et autem repellendus.
          {'\n'}3. Aut ipsum Quis qui porro quasi aut minus placeat!
          {'\n'}4. Sit consequatur neque ab vitae facere.
        </Text>
        <Text style={styles.paragraph}>
          Aut quidem accusantium nam alias autem eum officiis placeat et omnis
          autem id officiis perspiciatis qui corrupti officia eum aliquam
          provident. Eum voluptas error et optio dolorum cum molestiae nobis et
          odit molestiae quo magnam impedit sed fugiat nihil non nihil vitae.
        </Text>
        <Text style={styles.paragraph}>
          Vel exercitationem quam vel eligendi rerum At harum obcaecati et
          nostrum beatae? Ea accusantium dolores qui rerum aliquam est
          perferendis mollitia et ipsum ipsa qui enim autem At corporis sunt.
          Aut odit quisquam et reprehenderit itaque aut accusantium dolor qui
          neque repellat.
        </Text>
        <Text style={styles.link} onPress={() => Linking.openURL('https://www.finwiseapp.de')}>
          Read the terms and conditions in more detail at www.finwiseapp.de
        </Text>
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxLabel}>I accept all the terms and conditions</Text>
        </View>
        <Button title="Accept" onPress={handleAccept} disabled={!isAccepted} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F7F2',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
  link: {
    color: '#007BFF',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default TermsAndConditions;