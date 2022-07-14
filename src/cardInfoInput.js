const cardInfoInput = [
  {
    id:1,
    name:"title",
    type:"text",
    placeholder:"Enter your card title",
    errorMessage:"Title should be between 3-30 characters, and should include only letters,numbers,',and spaces",
    required:true,
    label:"Title *",
    pattern:"^[a-zA-Z0-9\u0621-\u064A\u0660-\u0669 ']{3,30}$"
  },
  {
    id:2,
    name:"facebookLink",
    type:"text",
    placeholder:"Link to your shop's facebook page",
    label:"Facebook link"
  },
  {
    id:3,
    name:"instagramLink",
    type:"text",
    placeholder:"Link to your shop's instagram page",
    label:"Instagram link"
  },
  {
    id:4,
    name:"whatsappLink",
    type:"tel",
    pattern:"[0-9]{8}",
    errorMessage:"Numbers only allowed(ex:81123456)",
    placeholder:"Shop whatsapp number",
    label:"Whatsapp number"
  }
]