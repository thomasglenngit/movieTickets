// Business Logic for TicketCatalog ---------
function TicketCatalog() {
  this.tickets = [];
  this.currentId = 0;
}

TicketCatalog.prototype.addTicket = function(ticket) {
  ticket.id = this.assignId();
  this.tickets.push(ticket);
}

TicketCatalog.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

TicketCatalog.prototype.findTicket = function(id) {
  for (let i=0; i < this.tickets.length; i++) {
    if (this.tickets[i]) {
      if (this.tickets[i].id == id) {
        return this.tickets[i];
      }
    }
  };
  return false;
}

TicketCatalog.prototype.deleteTicket = function(id) {
  for (let i=0; i< this.tickets.length; i++) {
    if (this.tickets[i]) {
      if (this.tickets[i].id == id) {
        delete this.tickets[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function TicketHolder(age, movieTitle, showtime) {
  this.name = name;
  this.age = age;
  this.movieTitle = movieTitle;
  this.showtime = showtime;
  this.price = 0;
}
 //this.age + this.movieTitle + this.showTime < 20
// anyone under 18 can only have a high-score of 22.
//const 
TicketHolder.prototype.ticketPrice = function() {
  
  if (this.age <= 18) { //if (this.age > 18 && this.movieTitle === 5 && this.showtime === 1)
      this.price = 8;    
   } else if (this.age >= 60) {
      this.price = 10;
   } else {
      this.price = 15;
   }
  return this.price;
}



// ticketHolder.prototype.fullName = function() {
//   return this.firstName + " " + this.lastName;
// }

// User Interface Logic ---------

// function displayContactDetails(addressBookToDisplay) {
//   let contactsList = $("ul#contacts");
//   let htmlForContactInfo = "";
//   addressBookToDisplay.contacts.forEach(function(contact) {
//     htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
//   });
//   contactsList.html(htmlForContactInfo);
// };
function showTicketHolder(ticketId) {
$("#query").click(function(event) {
  event.preventDefault();
 
  const ticket = ticketCatalog.findTicket(ticketId);
  
  $("#show-ticket").show();

  $(".name").html(ticket.name);
  $(".age").html(ticket.age);
  $(".movieTitle").html(ticket.movieTitle);
  $(".showtime").html(ticket.showtime);
  let ticketButtons = $("#buttons");
  ticketButtons.empty();
  ticketButtons.append(`<button class='deleteButton ${ticket.id}'>Delete</button>`);
})
}

function attachContactListeners() {
  $("ul#tickets").on("click", "li", function() {
    showTicket($(this).attr("class"));
  });
  $("#buttons").on("click", ".deleteButton", function() {
    ticketCatalog.deleteTicket(this.id);
    $("#show-ticket").hide();
    displayContactDetails(addressBook);
  });
};

let ticketCatalog = new TicketCatalog();

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const name = $("input#name").val();
    const age = parseInt($("input#age").val());
    const movieTitle = parseInt($("#movieTitle").val());
    const showtime = parseInt($("#showtime").val());
    console.log(showtime);
   
    let newTicketHolder = new TicketHolder(name, age, movieTitle, showtime);  
    console.log("What's up here?");

    ticketCatalog.addTicket(newTicketHolder);
    console.log(ticketCatalog.tickets);
    // addressBook.addContact(newContact);
    // displayContactDetails(addressBook);
    // newTicketHolder.price();
    $("#output").show();
    newTicketHolder.ticketPrice();
    $("#ticketPrice").text(newTicketHolder.price);
    console.log();
  });
});