import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TicketDetails = ({ ticket, handleCloseTicket, handleVerifyTicket }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ticket Details</Text>

      <Text style={styles.item}>
        <Text style={styles.label}>Title: </Text>{ticket.title}
      </Text>
      <Text style={styles.item}>
        <Text style={styles.label}>Description: </Text>{ticket.description}
      </Text>
      <Text style={styles.item}>
        <Text style={styles.label}>Status: </Text>{ticket.status}
      </Text>
      <Text style={styles.item}>
        <Text style={styles.label}>Created At: </Text>{new Date(ticket.createdAt).toLocaleString()}
      </Text>

      <View style={styles.buttonContainer}>
        {ticket.status !== 'closed' && ticket.status !== 'verified' && (
          <TouchableOpacity
            style={[styles.button, styles.closeButton]}
            onPress={() => handleCloseTicket(ticket._id)}
          >
            <Text style={styles.buttonText}>Close Ticket</Text>
          </TouchableOpacity>
        )}

        {ticket.status !== 'verified' && (
          <TouchableOpacity
            style={[styles.button, styles.verifyButton]}
            onPress={() => handleVerifyTicket(ticket._id)}
          >
            <Text style={styles.buttonText}>Verify Ticket</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  item: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
  },
  label: {
    fontWeight: 'bold',
    color: '#000',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  closeButton: {
    backgroundColor: '#ff5c5c',
  },
  verifyButton: {
    backgroundColor: '#4caf50',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TicketDetails;
