import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface Props {
  newTicket: { title: string; description: string };
  setNewTicket: (ticket: { title: string; description: string }) => void;
  handleCreate: (e: any) => void;
}

export default function TicketForm({ newTicket, setNewTicket, handleCreate }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        style={styles.input}
        value={newTicket.title}
        onChangeText={(text) => setNewTicket({ ...newTicket, title: text })}
      />
      <TextInput
        placeholder="Description"
        style={[styles.input, styles.textarea]}
        multiline
        numberOfLines={4}
        value={newTicket.description}
        onChangeText={(text) => setNewTicket({ ...newTicket, description: text })}
      />
      <Button title="Submit Ticket" onPress={handleCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: {
    borderColor: '#ccc', borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 6
  },
  textarea: {
    height: 100,
  },
});
