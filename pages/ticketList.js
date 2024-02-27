import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('/api/getTickets');
        const res = response.data.data
        // console.log("response",res)
        setTickets(res);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch tickets', error);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  function createBlobUrl(dataUrl) {
    if (!dataUrl) {
        return null;
      }
    const byteString = atob(dataUrl.split(',')[1]);
    const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return URL.createObjectURL(blob);
  }

  const handleResolve = async (id) => {
    const ticket = await axios.get(`/api/getTicket?id=${id}`);
    const dt = await ticket.data.data
    const status = await dt.status
    if(status === "RESOLVED"){
       alert("This ticket status is resolved")
       return
    } 
    const confirmed = window.confirm('Are you sure you want to resolve this ticket?');
    if (confirmed) {
      const response = await axios.get(`/api/resolveTicket?id=${id}`);
      const message = response.data.message;
      console.log("message", message);
      if (message === "Ticket resolved successfully") {
        window.location.reload();
      }
    }
  };
  
  const handleDelete = async (id) => {
    const ticket = await axios.get(`/api/getTicket?id=${id}`);
    const dt = await ticket.data.data
    const status = await dt.status
    if(status === "OPEN"){
        alert("This ticket is not resolved")
        return
     } 
    const confirmed = window.confirm('Are you sure you want to delete this ticket?');
    if (confirmed) {
        const response = await axios.get(`/api/deleteTicket?id=${id}`);
        const message = response.data.message;
        console.log("message", message);
        if (message === "Ticket Deleted") {
          window.location.reload();
        }
    }
  };

  const handleLogout = () => {
    window.location.href = '/'; 
  };
  return (
    <div>
      <div style={{ display: 'flow' }}>
        <h2><center>Ticket List</center></h2>
        <button onClick={handleLogout}>Logout</button>
      </div><br/>
      <table className="table" style={{ border: '1px black solid', padding: '5px' }}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Title</th>
            <th>Description</th>
            <th>Screen Shot</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket._id}>
              <td>{ticket.email}</td>
              <td>{ticket.title}</td>
              <td>{ticket.description}</td>
              <td><a href={createBlobUrl(ticket.photos)} target="_blank" rel="noopener noreferrer">View Image</a></td>
              <td>{ticket.status}</td>
              <td>
                <button onClick={() => handleResolve(ticket._id)} style={{margin:'4px',border:'1px black solid',padding:'2px'}}>Resolve</button> 
                <button onClick={() => handleDelete(ticket._id)} style={{margin:'4px',border:'1px black solid',padding:'2px'}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketList;


