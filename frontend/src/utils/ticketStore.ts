export const saveTicket = (ticket: any) => {
  const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
  tickets.push(ticket);
  localStorage.setItem("tickets", JSON.stringify(tickets));
};

export const getTickets = () => {
  return JSON.parse(localStorage.getItem("tickets") || "[]");
};