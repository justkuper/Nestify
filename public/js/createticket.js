

const createticketbtn = document.querySelector('#createticket');

const createticket = async (event) => {
    event.preventDefault();
    const description = document.querySelector('#description').value.trim();
    const date = document.querySelector('#date').value;
    const pay = document.querySelector('#pay').value.trim();
    const id = event.target.dataset.uid;
    console.log(description, date, pay, id);
   
    console.log(event.target);
    if (description && date && pay && id) {
        const response = await fetch('/api/tickets', {
        method: 'POST',
        body: JSON.stringify({ description, date, pay, user_id: id }),
        headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
        window.location.replace('/user');
        } else {
        alert('Failed to submit ticket');
        }
    }
}

createticketbtn.addEventListener('click', createticket);