import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

export default function TicketList({ tickets, handleSelect }: { tickets: Ticket[], handleSelect: (id: string) => void }) {
  return (
    <View>
      {tickets.map(ticket => (
        <TouchableOpacity key={ticket._id} style={styles.card} onPress={() => handleSelect(ticket._id)}>
          <Text style={styles.title}>{ticket.title}</Text>
          <Text>Status: {ticket.status}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16, marginBottom: 8, backgroundColor: '#fff', borderRadius: 8, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2,
  },
  title: { fontWeight: 'bold', fontSize: 16 },
});
