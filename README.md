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

-user/forget-password :post

```
{
    name:
    role:
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
