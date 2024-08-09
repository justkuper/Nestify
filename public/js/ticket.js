
const acceptbtn = document.querySelector('#acceptbtn'); 

const ticketFormHandler = async (event) => {
    event.preventDefault();
    const description = document.querySelector('#ticket-description').value.trim();
    const category = document.querySelector('#ticket-category').value.trim();
    const status = 'open';
    const provider_username = null;
    
    if (description && location && category) {
        const response = await fetch('/api/tickets', {
        method: 'POST',
        body: JSON.stringify({ title, description, status, provider_username }),
        headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
        document.location.replace('/dashboard');
        } else {
        alert('Failed to submit ticket');
        }
    }
    }

    const acceptTicketHandler = async (event) => {
        event.preventDefault();
       
        const id = event.target.dataset.uid;
    
        if (id) {
        const response = await fetch(`/api/tickets/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ provider_id: id}),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to accept ticket');
        }
        }
    }

acceptbtn.addEventListener('click', acceptTicketHandler);