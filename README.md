# CS3200 Final

# Pizza Shop

Ryan Soderberg & Will Kofski (Team 30)

Section 03 SP21

[http://cs3200-final.us-east-2.elasticbeanstalk.com/users](http://cs3200-final.us-east-2.elasticbeanstalk.com/users)

### Summary

Pizza Shop is a web app where users can sign up, and order a pizza. Our app relies on 3 main collections of data, `Users`, `Orders`, and `Items`. Using our app, users can create new accounts, start orders with a name, and add items such as a `Pizza` or `Drink` to the order.

### Data Model

A UML diagram for our data model can be found at [db_design_final_project_UML.pdf](https://github.com/Ryanjso/CS3200-Final-Project/blob/main/db_design_final_project_UML.pdf)

**User Data Model**

The user data model represents a user on our Pizza Shop web-app. A user is required so we can see who an order belongs to.

**Order Data Model**

The order data model represents an order on our Pizza Shop web-app. An order represents a collection of items mean't to be purchased together.

**Item Data Model**

The item data model represents an item, such as a Pizza or a Drink on our Pizza Shop web-app. The item data model lets us create unlimited items to allow for infinite customizations. Pizza and Drink share some fields, like `size` and `created`, however many of their fields are different.

The Item Data Model has many enumerations in it. Some examples are as follows:

```jsx
// The size of the item
size: { type: String, enum: ['small', 'medium', 'large'] }

// This field is specific for Items of type Pizza
// Type of protein for a Pizza, assuming only one is possible
protein: {
    type: String,
    enum: ['pepperoni', 'sausage', 'chicken', 'bacon', 'vegan chorizo'],
  },

// This field is specific for Items of type Pizza
// Type of veggie for a Pizza, assuming only one is possible
veggie: {
    type: String,
    enum: ['peppers', 'onions', 'mushrooms', 'spinach', 'olives'],
  },
```

**Data Model Relationships**

The highest level model is the `User`, which does not require any other models to be created. The second highest is the `Order`, which requires a `User` in order to be created. Every `Order` will be tied to one `User`. A `User` can have any amount of `Order`s, including none. The last model is the `Item` model, which requires an `Order` to be created, and in turn also a `User`. There can be any amount of `Item`s for an `Order`, or none.

## User Interface

Our user interface is structured around `Users`, who create `Order`s that contain as many `Item`s as they like, which are types of either Pizzas or Drinks.

The `'/users'` tab lists all of the users that have been created so far, and gives the ability to either create a new user or edit an existing user. By editing an individual `User`, you are able to view and navigate to all associated `User` `Order`s.

The `'/orders'` tab lists all of the `Order`s that have been created so far, and gives the ability to either create a new `Order` or edit an existing `Order`. By editing an individual `Order`, you are able to view and navigate to all associated `Order` `Item`s.

The `/items` tab lists all of the `Item`s that have been created so far, and gives the ability to either create a new `Item` or edit an existing `Item`. By editing an individual `Item`, you are able to view change the associated `User` and `Order`, as well as the individual `Item` information.
