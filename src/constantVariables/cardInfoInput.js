export const cardInfoInput =
[
  {
    id:1,
    name:"title",
    type:"text",
    placeholder:"Enter your card title",
    errorMessage:"Title should be between 3-30 characters and can only contain letters, numbers,('.-),and space.",
    required:true,
    label:"Title *",
    pattern:"(?=(?:.*[a-zA-Z0-9\u0621-\u064A\u0660-\u0669]){3})[a-zA-Z0-9\u0621-\u064A\u0660-\u0669 .'-]{0,27}",
    title:"Should have at least 3 characters of alphanumeric(letters or numbers)"
  },
  {
    id:2,
    name:"facebookLink",
    type:"text",
    pattern:"[a-zA-Z0-9\u0621-\u064A\u0660-\u0669.]{5,50}",
    errorMessage:"Facebook name should be between 5-50 characters and can only contain letters, numbers, and periods.",
    placeholder:"Shop facebook custom username",
    label:"Facebook custom username"
  },
  {
    id:3,
    name:"instagramLink",
    type:"text",
    pattern:"[a-zA-Z0-9\u0621-\u064A\u0660-\u0669_.]{1,30}",
    errorMessage:"Instagram name should be between 1-30 characters and can only contain letters, numbers, period, and underscores.",
    placeholder:"Shop instagram username",
    label:"Instagram username"
  },
  {
    id:4,
    name:"whatsappLink",
    type:"text",
    pattern:"[0-9\u0660-\u0669]{8}",
    errorMessage:"Numbers only allowed(ex:81123456)",
    placeholder:"Shop whatsapp number",
    label:"Whatsapp number"
  }
]