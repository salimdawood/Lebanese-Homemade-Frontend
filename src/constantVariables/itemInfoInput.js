export const itemInfoInput =
[
  {
    id:1,
    name:"name",
    label:"Name *",
    type:"text",
    placeholder:"Enter item name",
    required:true,
    errorMessage:"Name should be between 3-50 characters and can only contain letters, numbers, ' , and spaces",
    pattern:"[a-zA-Z0-9\u0621-\u064A\u0660-\u0669 '.]{3,50}"
  },
  {
    id:2,
    name:"price",
    label:"Price",
    type:"text",
    placeholder:"Enter item price",
    pattern:"[lL0-9\u0660-\u0669,$.]{0,20}",
    errorMessage:"Price should be between 0-20 characters and can only contain numbers, and ($,L.L)"
  }
]