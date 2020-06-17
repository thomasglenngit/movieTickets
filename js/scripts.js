// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function ticketHolder(age, movieTitle, showtime) {
  this.age = age;
  this.movieTitle = movieTitle;
  this.showtime = showtime;
  this.price = "";
}

ticketHolder.prototype.price = function() {
  if (age + movieTitle + showtime >= 18) {
    this.price = 20;
  } else if (age + movieTitle + showtime > 10 && age + movieTitle + showtime < 18) {
    this.price = 15;
  } else {
    this.price = 10;
  } 

}
console.log();

ticketHolder.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
// let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append(`<button class='deleteButton ${contact.id}'>Delete</button>`);
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact($(this).attr("class"));
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  // attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const age = $("input#age").val();
    const movieTitle = $("#movieTitle").val();
    const showtime = $("#showTime").val();
    // $("input#new-first-name").val("");
    // $("input#new-last-name").val("");
    // $("input#new-phone-number").val("");
    let newTicketHolder = new ticketHolder(age, movieTitle, showtime);
    // addressBook.addContact(newContact);
    // displayContactDetails(addressBook);
    $("#output").show();
    $("#ticketprice").text(newTicketHolder.price);
  });
});