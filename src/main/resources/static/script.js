// ================= GLOBAL =================
let selectedSeats = [];


// ================= SHOWTIMES =================
function loadShowtimes() {
    fetch("/showtimes")
    .then(res => res.json())
    .then(data => {

        let dropdown = document.getElementById("showtimeSelect");
        dropdown.innerHTML = "";

        data.forEach(st => {
            let opt = document.createElement("option");
            opt.value = st.id;
            opt.text = st.movie + " - " + st.time;
            dropdown.appendChild(opt);
        });
    });
}


// ================= SEAT SYSTEM =================
function loadSeats() {

    let container = document.getElementById("seatContainer");
    container.innerHTML = "";

    selectedSeats = [];

    let bookedSeats = JSON.parse(localStorage.getItem("bookedSeats")) || [];

    for (let i = 1; i <= 30; i++) {

        let seat = document.createElement("div");
        seat.innerText = i;
        seat.className = "seat";

        if (bookedSeats.includes(i)) {
            seat.style.background = "red";
            seat.style.cursor = "not-allowed";
        } 
        else {

            seat.onclick = function () {

                if (selectedSeats.includes(i)) {
                    selectedSeats = selectedSeats.filter(s => s !== i);
                    seat.classList.remove("selected");
                } else {
                    selectedSeats.push(i);
                    seat.classList.add("selected");
                }

                document.getElementById("selectedSeatsText").innerText =
                    "🎟 Seats: " + selectedSeats.join(", ");

                document.getElementById("priceText").innerText =
                    "Total Price: ₹" + (selectedSeats.length * 150);
            };
        }

        container.appendChild(seat);
    }
}


// ================= BOOK =================
function bookTickets() {

    let id = document.getElementById("showtimeSelect").value;

    if (selectedSeats.length === 0) {
        alert("Select at least 1 seat");
        return;
    }

    let bookedSeats = JSON.parse(localStorage.getItem("bookedSeats")) || [];

    bookedSeats = [...bookedSeats, ...selectedSeats];

    localStorage.setItem("bookedSeats", JSON.stringify(bookedSeats));

    fetch("/book", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            showtimeId: id,
            seatCount: selectedSeats.length
        })
    })
    .then(res => res.json())
    .then(() => {

        alert("Booking Successful 🎉");

        loadBookings();
        loadSeats();

        setTimeout(() => {
            window.location.href = "payment.html";
        }, 1500);
    });
}


// ================= BOOKINGS (UPDATED WITH CANCEL) =================
function loadBookings() {
    fetch("/bookings")
    .then(res => res.json())
    .then(data => {

        let html = "";

        data.forEach((b, index) => {
            html += `
                <div class="card">
                    <b>${b.id}</b> - ${b.movie} - ${b.seats} seats
                    <br>
                    <button onclick="cancelBooking(${index}, ${b.seats})">
                        ❌ Cancel
                    </button>
                </div>
            `;
        });

        document.getElementById("content").innerHTML = html;
    });
}


// ================= CANCEL BOOKING =================
function cancelBooking(index, seats) {

    let bookedSeats = JSON.parse(localStorage.getItem("bookedSeats")) || [];

    // remove last booked seats (simple logic)
    bookedSeats.splice(-seats);

    localStorage.setItem("bookedSeats", JSON.stringify(bookedSeats));

    alert("Booking Cancelled!");

    loadSeats();
    loadBookings();
}


// ================= RESET =================
function resetSeats() {

    localStorage.removeItem("bookedSeats");

    alert("All seats reset!");

    loadSeats();
    loadBookings();

    document.getElementById("selectedSeatsText").innerText = "";
    document.getElementById("priceText").innerText = "";
}


// ================= AUTO LOAD =================
window.onload = function () {
    loadShowtimes();
    loadSeats();
    loadBookings();
};