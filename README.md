# My Dressing Dz Rest Api

## Routes for User

### to register a new client

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
}
```

### to login a client & professional

- user/login : post

```
{
    email:
    password:
    role:
}
```
