# My Dressing Dz Rest Api

## Backend Deployment Link

https://my-dressing-dz.herokuapp.com/

## Routes for Sections

### To add a new section

- section/add :post

```
{
    name:
}
```

### To get all sections

- section/get-all :get

### To get single section

- section/get-single :post

```
{
    sectionId:
}
```

### To get multiple sections using array

- section/get-multiple :post

```
{
    sectionId:
}
```

## Routes for Categories

### To add a new category

- category/add :post

```
{
    name:
    sizes:
}
```

### To get all categories

- category/get-all :get

### To get single category

- category/get-single :post

```
{
    categoryId:
}
```

## Routes for User

### to register a new client

Client's Route

- user/client-register : post

```
{
    firstName:
    lastName:
    email:
    password:
    number:
    address:
}
```

### to register a new professional

Professional's Route

- user/professional-register : post

```
{
    firstName:
    lastName:
    shopName:
    image: (form-data)
    email:
    password:
    number:
    address:
    facebook:
    instagram:
    sections: []
}
```

### to login a client & professional

Client's & Professional's Route

- user/login : post

```
{
    email:
    password:
    role:
}
```

### to forget password for a user

Client's & Professional's Route

- user/forget-password :post

```
{
    name:
    role:
}
```

### to get user profile

Client's & Professional's Route

- user/profile :get

### to update usr profile

Client's & Professional's Route

- user/update-profile :patch

```
{
    userName:
    shopName:
    email:
    password:
    number:
    address:
    facebook:
    instagram:
    sections:
}
```

## Routes for Stores

### to get all stores

Client's Route

- store/get-all :get

### to get a single store

Client's Route

- store/get-single :post

```
{
    storeId:
}
```

### to get all articles of a single store

Client's Route

- store/get-articles :post

```
{
    storeId:
}
```

### to get all articles based on section for a single store

Client's Route

- store/get-articles-for-specific-section :post

```
{
    storeId:
    sectionId:
}
```

### to get all articles based on category for a single store

Client's Route

- store/get-articles-for-specific-category :post

```
{
    storeId:
    sectionId:
    categoryId:
}
```

## Routes for Articles

### to add a new article

Professional's Route

- article/add :post

```
{
    articleName:
    articleDescription:
    image:
    sectionId:
    categoryId:
    brandName:
    city:
    onlineDate:
    availableSizes:
    totalStock:
    indicatedPrice:
    finalPrice:
}
```

### to get all articles

Client's Route

- article/get-all :get

### to get ready to wear articles

Client's Route

- article/get-ready-to-wear :get

### to get house only articles

Client's Route

- article/get-house-only :get

### to get single article

Client's & Professional's Route

- article/get-single :post

```
{
    articleId:
}
```

### to search article

Client's Route

- article/search :post

```
{
    storeName:
    sectionName:
    categoryName:
    articleName:
    city:
}
```

### to delete an article

Professional's Route

- article/delete :delete

```
{
    articleId:
}
```

## Routes for Order History

### to add a new order history

Client's Route

- orderhistory/add :post

```
{
    storeId:
    articleId:
    size:
    quantity:
    price:
    deliveryOption:
    deliveryAddress:
    deliveryCity:
}
```

### to get order histories of a specific client

Client's Route

- orderhistory/get-for-specific-client :get

### to get pending order histories of a specific store

Professional's Route

- orderhistory/get-pending-for-specific-store :get

### to get completed order histories of a specific store

Professional's Route

- orderhistory/get-complete-for-specific-store :get

### to get all order histories

Super Admin's Route

- orderhistory/get-all :get

### to get single order history

Client's & Professional's Route

- orderhistory/get-single :post

```
{
    orderHistoryId:
}
```

### to change the order history status

Professional's Route

- orderhistory/update-status :patch

```
{
    orderHistory:
    status:
    isCompleted: Boolean
}

Status & isCompleted values for Different Buttons:

1) Accept Button:

        status: "accept, in process"
        isCompleted: false

2) Refuse Button:

        status: "rejected"
        isCompleted: true

3) Completed Button:

        status: "completed"
        isCompleted: true

4) Canceled Button:

        status: "canceled"
        isCompleted: true

```

### to delete an order history

Client's & Professional's Route

- orderhistory/delete :delete

```
{
    orderHistoryId:
}
```

## Socket.io - Real Time Chat Application

### General Docs

- web socket is auth protected means you have to pass the token to access that. And you will get the token when you logged in. And if you don't pass the token the server will fire an event i.e. **"connect_error"** and you must have to listen for that in order to receive connection error messages. This is how you can do it on the client side.

```js
const APP_URL = "http://localhost:8000"; // or whatever the base URL
const socket = io(APP_URL, {
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFmNWJiNzlmM2ExOTFhMWNhYzUwOGQiLCJuYW1lIjoiQWJkdWwgTXVxZWV0IiwiZW1haWwiOiJhYmR1bGlzY29vb2xAZ21haWwuY29tIiwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYyOTc5NzA1MX0.4qp_IeaSNi4U7n5Y9VssAAObZ22dJVfd0yIXX7WN-kE",
  }, // replace your token this is just for demo. By the way token is passed dynamically most probably you store token in localstorage or some other in memory db just replace this hard coded string with that token.
});
```

### Fire Events from Client

- **"create-room"** : this will create a room. You have to pass object having user key to which we can chat it can be anyone like client or professional. You just have to pass that user id in object having user key in it. This is how you can do it on the client side.

```js
socket.emit("create-room", { userId: "611f5dc8d36b501008bb55ed" }, (data) => {
  console.log(data);
});
```

- **"all-rooms"** : this will return all rooms for that logged in user. Room means all chat that logged in user involved. And you don't have to pass anything. This is how you can do it on the client side.

```js
socket.emit("all-rooms", (data) => {
  console.log(data);
});
```

- **"chat-history"** : this will return all chat history for specific room. We just have to pass roomId and you must use callback on the client side to get all the chat history. This is how you can do it on the client side.

```js
socket.emit(
  "chat-history",
  {
    roomId: "61261edc45fc2c04b0744a1e",
  },
  (data) => {
    console.log(data);
  }
);
```

- **"msg-from-client"** : this will emit message from the client means when you create a message on the client side simply use that action. And you just have to pass message string and roomId to that action. The server will listen for that action and it will fire an event i.e. **"msg-from-server"** and you must have to listen for that event to receive new messages. It will contain three things message, time, user. This is how you can do it on the client side.

```js
socket.emit(
  "msg-from-client",
  {
    roomId: "61261edc45fc2c04b0744a1e",
    message: "Message from client",
  },
  (data) => {
    console.log(data);
  }
);

socket.on("msg-from-server", (data) => {
  console.log("Message:", data);
});
```

### Fire Events From Server

- **"exception"**
- **"hello-from-server"**
- **"connect_error"**
