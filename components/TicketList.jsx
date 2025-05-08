import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TicketList = ({ tickets, handleSelect }) => {
  return (
    <View style={styles.container}>
      {tickets.map(ticket => (
        <TouchableOpacity
          key={ticket._id}
          style={styles.ticketItem}
          onPress={() => handleSelect(ticket._id)}
        >
          <Text style={styles.ticketTitle}>{ticket.title}</Text>
          <Text style={styles.ticketStatus(ticket.status)}>
            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  ticketItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  ticketStatus: status => ({
    fontSize: 14,
    marginTop: 8,
    color: status === 'verified' ? '#4caf50' : status === 'closed' ? '#ff5c5c' : '#888',
  }),
});

export default TicketList;
