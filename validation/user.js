const yup = require("yup");

exports.clientRegisterSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(5).max(10),
  number: yup.number().required(),
  address: yup.string().required(),
});

exports.professionalRegisterSchema = yup.object({
    firstName: yup.string(),
    lastName: yup.string(),
    shopName: yup.string(),
    image: yup.string(),
    email: yup.string().email(),
    password: yup.string().min(5).max(10),
    number: yup.number(),
    address: yup.string(),
    facebook: yup.string(),
    instagram: yup.string(),
    sections: yup.string()
})

exports.loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
  role: yup.string().required(),
});

exports.forgetPasswordSchema = yup.object({
  email: yup.string().email().required(),
  role: yup.string().required(),
});

exports.updateProfileSchema = yup.object({
  firstName: yup.string(),
  lastName: yup.string(),
  shopName: yup.string(),
  email: yup.string().email(),
  password: yup.string().min(5).max(10),
  number: yup.number(),
  address: yup.string(),
  facebook: yup.string(),
  instagram: yup.string(),
  sections: yup.string(),
});

exports.getSingleStoreSchema = yup.object({
  storeId: yup.string().required(),
});

exports.getArticleForSpecificSectionOfStoreSchema = yup.object({
  storeId: yup.string().required(),
  sectionId: yup.string().required(),
});
