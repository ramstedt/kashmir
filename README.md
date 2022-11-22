# Kashmir

A restaurant service where customers can browse the restaurant's menu and place order to their table.

The restaurant staff recieves the orders to their dashboard.

Built using Next, Supabase and Stripe.

This project is part of my web development course at Yrgo (WU21).


To run the dev server you need env keys to Supabase and Stripe. Supabase schema can be found [here](https://github.com/Deliciaes/kashmir/blob/main/db_schema.png) 

## How to install
Install using npm or yarn, then use command npm run dev or yarn dev to run. Don't forget the .env keys.

## Known bugs
1. Missing communication between Stripe and Supabase indicating that the payment was successful
2. Some error messages when trying to upload a menu item without a photo.
