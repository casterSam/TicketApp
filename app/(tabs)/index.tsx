import React, { useState, useEffect } from 'react';
import { View, Button, SafeAreaView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TicketForm from '@/components/TicketForm';
import TicketList from '@/components/TicketList';
import TicketDetails from '@/components/TicketDetails';

interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'closed' | 'verified';
  createdAt: string;
}

export default function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [newTicket, setNewTicket] = useState({ title: '', description: '' });
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const storedTickets = await AsyncStorage.getItem('tickets');
        if (storedTickets) {
          setTickets(JSON.parse(storedTickets));
        }
      } catch (error) {
        console.error('Failed to load tickets:', error);
      }
    };
    loadTickets();
  }, []);

  const saveTickets = async (ticketsToSave: Ticket[]) => {
    try {
      await AsyncStorage.setItem('tickets', JSON.stringify(ticketsToSave));
    } catch (error) {
      console.error('Failed to save tickets:', error);
    }
  };

  const handleCreateTicket = () => {
    const newTicketObj: Ticket = {
      _id: Date.now().toString(),
      ...newTicket,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    const updatedTickets = [...tickets, newTicketObj];
    setTickets(updatedTickets);
    saveTickets(updatedTickets);
    setNewTicket({ title: '', description: '' });
    setIsCreatingTicket(false);
  };

  const handleSelectTicket = (ticketId: string) => {
    const ticket = tickets.find(t => t._id === ticketId) || null;
    setSelectedTicket(ticket);
  };

  const handleCloseTicket = (ticketId: string) => {
    const updatedTickets = tickets.map(t =>
      t._id === ticketId ? { ...t, status: 'closed' as 'closed' } : t // cast status to 'closed'
    );
    setTickets(updatedTickets);
    saveTickets(updatedTickets);
    setSelectedTicket(null);
  };

  const handleVerifyTicket = (ticketId: string) => {
    const updatedTickets = tickets.map(t =>
      t._id === ticketId ? { ...t, status: 'verified' as 'verified' } : t // cast status to 'verified'
    );
    setTickets(updatedTickets);
    saveTickets(updatedTickets);
    const verifiedTicket = updatedTickets.find(t => t._id === ticketId) || null;
    setSelectedTicket(verifiedTicket);
    Alert.alert('Ticket Verified', `Ticket ID: ${ticketId} marked as verified.`);
  };

  const goBack = () => {
    setSelectedTicket(null);
    setIsCreatingTicket(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {selectedTicket ? (
        <View>
          <TicketDetails
            ticket={selectedTicket}
            handleCloseTicket={handleCloseTicket}
            handleVerifyTicket={handleVerifyTicket}
          />
          <Button title="Back" onPress={goBack} />
        </View>
      ) : isCreatingTicket ? (
        <View>
          <TicketForm
            newTicket={newTicket}
            setNewTicket={setNewTicket}
            handleCreate={handleCreateTicket}
          />
          <Button title="Back" onPress={goBack} />
        </View>
      ) : (
        <>
          <TicketList tickets={tickets} handleSelect={handleSelectTicket} />
          <Button title="Create Ticket" onPress={() => setIsCreatingTicket(true)} />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
