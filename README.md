# My Dressing Dz Rest Api

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

## Routes for Categories

### To add a new category

- category/add :post

```
{
    name:
}
```

### To get all categories

- category/get-all :get

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
    sections: []
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

### to forget password for a user

-user/forget-password :post

```
{
    name:
    role:
}
```
