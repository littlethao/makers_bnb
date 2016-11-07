## MakersBnB

Having reached week 6 at Makers Academy, we will be working for the first time as a project team of 4 with the aim to create a reproduction of AirBNB. Our team chose to build MakersBnB using Javascript on the front and backends. With JavaScript being very new to us, we also decided to work with pure NodeJs, BookshelfJS/Knex for the first time.

## Install & run
- Fork this repo
- Clone it to your local machine
- `cd makers_bnb`
- `npm install` to install all required dependencies
- `npm server.js`
- on your browser visit http://localhost:8000/

#### As a user, you will be able to:
- sign up for a user account
- log in once you are registered

![Alt text](http://i.imgur.com/Cx8lvJP.jpg)

- add a space for rental to other users  

![Alt text](http://i.imgur.com/HsEm7Q7.jpg)

- book a space for a day from other users  
- overview booking requests made and contact host  

![Alt text](http://i.imgur.com/jv13Ibh.jpg)


## Project specifications (given by Makers Academy)

We would like a web application that allows users to list spaces they have available, and to hire spaces for the night.

### Headline specifications

- Any signed-up user can list a new space.
- Users can list multiple spaces.
- Users should be able to name their space, provide a short description of the space, and a price per night.
- Users should be able to offer a range of dates where their space is available.
- Any signed-up user can request to hire any space for one night, and this should be approved by the user that owns that space.
- Nights for which a space has already been booked should not be available for users to book that space.
- Until a user has confirmed a booking request, that space can still be booked for that night.

### Nice-to-haves

- Users should receive an email whenever one of the following happens:
 - They sign up
 - They create a space
 - They update a space
 - A user requests to book their space
 - They confirm a request
 - They request to book a space
 - Their request to book a space is confirmed
 - Their request to book a space is denied
- Users should receive a text message to a provided number whenever one of the following happens:
 - A user requests to book their space
 - Their request to book a space is confirmed
 - Their request to book a space is denied
- A ‘chat’ functionality once a space has been booked, allowing users whose space-booking request has been confirmed to chat with the user that owns that space
- Basic payment implementation though Stripe.

### Mockups

Mockups for MakersBnB are available [here](https://github.com/makersacademy/course/blob/master/makersbnb/makers_bnb_images/MakersBnB_mockups.pdf).
