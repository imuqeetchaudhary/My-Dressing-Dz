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

### to get order histories of a specific store

Professional's Route

- orderhistory/get-for-specific-store :get

### to get single order history

Client's & Professional's Route

- orderhistory/get-single :post

```
{
    orderHistoryId:
}
```
