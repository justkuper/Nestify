const acceptbtn = document.querySelector("#acceptbtn");

// * Function to accept a ticket
const acceptTicketHandler = async (event) => {
  event.preventDefault();

  // * Get the values from the form
  const id = event.target.dataset.uid;
  const ticket_id = event.target.dataset.tid;
  
  // * If all the values are present, make a fetch request to accept the ticket
  if (id) {
    const response = await fetch(`/api/tickets/${ticket_id}`, {
      method: "PUT",
      body: JSON.stringify({ provider_id: id }),
      headers: { "Content-Type": "application/json" },
    });

    // * If the response is ok, redirect to the ticket page
    if (response.ok) {
      document.location.replace(`/ticket/${ticket_id}`);
    } else {
      alert("Failed to accept ticket");
    }
  }
};

acceptbtn.addEventListener("click", acceptTicketHandler);
