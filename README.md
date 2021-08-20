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

### To get single section

- section/get-single :post

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

## Routes for Articles

### to add a new article

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

- article/get-all :get

### to get single article

- article/get-single :post

```
{
    articleId:
}
```

### to search article

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
