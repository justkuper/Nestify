document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.datepicker');
  var instances = M.Datepicker.init(elems, {
    defaultDate: new Date(),
    setDefaultDate: true,
    format: 'yyyy/mm/dd',
  });
});

// * Function to create a ticket
const createticket = async (event) => {
  event.preventDefault();
  // * Get the values from the form
  const description = document.querySelector("#description").value.trim();
  const date = document.querySelector("#date").value;
  const pay = document.querySelector("#pay").value.trim();
  const id = event.target.dataset.uid;
  console.log(description, date, pay, id);

  console.log(event.target);
    // * If all the values are present, make a fetch request to create a ticket
  if (description && date && pay && id) {
    const response = await fetch("/api/tickets", {
      method: "POST",
      body: JSON.stringify({ description, date, pay, user_id: id }),
      headers: { "Content-Type": "application/json" },
    });

    // * If the response is ok, redirect to the user page
    if (response.ok) {
      window.location.replace("/user");
    } else {
      alert("Failed to submit ticket");
    }
  }
};

createticketbtn.addEventListener("click", createticket);
