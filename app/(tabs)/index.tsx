import React, { useState, useEffect } from 'react';
import { View, Button, SafeAreaView, StyleSheet } from 'react-native';
import TicketForm from '@/components/TicketForm';
import TicketList from '@/components/TicketList';
import TicketDetails from '@/components/TicketDetails';

interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'closed';
  createdAt: string;
}

export default function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [newTicket, setNewTicket] = useState({ title: '', description: '' });
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);

  useEffect(() => {
    setTickets([
      { _id: '1', title: 'Sample Ticket 1', description: 'Login issue', status: 'pending', createdAt: new Date().toISOString() },
    ]);
  }, []);

  const handleCreateTicket = () => {
    const newTicketObj: Ticket = {
      _id: Date.now().toString(),
      ...newTicket,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setTickets([...tickets, newTicketObj]);
    setNewTicket({ title: '', description: '' });
    setIsCreatingTicket(false);
  };

  const handleSelectTicket = (ticketId: string) => {
    const ticket = tickets.find(t => t._id === ticketId) || null;
    setSelectedTicket(ticket);
  };

  const handleCloseTicket = (ticketId: string) => {
    setTickets(tickets.map(t => t._id === ticketId ? { ...t, status: 'closed' } : t));
    setSelectedTicket(null);
  };

  const goBack = () => {
    setSelectedTicket(null);
    setIsCreatingTicket(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {selectedTicket ? (
        <View>
          <TicketDetails ticket={selectedTicket} handleCloseTicket={handleCloseTicket} />
          <Button title="Back" onPress={goBack} />
        </View>
      ) : isCreatingTicket ? (
        <View>
          <TicketForm newTicket={newTicket} setNewTicket={setNewTicket} handleCreate={handleCreateTicket} />
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
