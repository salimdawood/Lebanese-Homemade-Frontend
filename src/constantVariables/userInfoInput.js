export default function userInfoInput (inputPassword){
    try {  
    return [
      {
        id:1,
        name:"name",
        type:"text",
        placeholder:"Enter your name",
        errorMessage:"User name should be between 3-30 characters, and should include only letters,numbers,' and spaces.",
        required:true,
        label:"Username *",
        pattern:"^[a-zA-Z0-9\u0621-\u064A\u0660-\u0669 ']{3,30}$"
      },
      {
        id:2,
        name:"email",
        type:"email",
        placeholder:"Enter your email",
        errorMessage:"You didn't enter a valid email.",
        required:true,
        label:"Email *"
      },
      {
        id:3,
        name:"password",
        type:"password",
        placeholder:"Enter your password",
        errorMessage:"Password should be between 8-20 characters, and must include at least: one letter,one number, and one special character(!@#$%^&*).",
        label:"Password *",
        pattern:"(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}",
        required:true
      },
      {
        id:4,
        name:"confirmPassword",
        type:"password",
        placeholder:"Confirm your password",
        errorMessage:"Passwords doesn't match.",
        label:"Confirm Password *", 
        pattern: inputPassword.replace(/[.*+?^$\*]/g, '\\$&'),
        //new RegExp(inputPassword.replace(/[.*+?^$\*]/g, '\\$&'),"g").source, causes error if entered a () or ) in password input find why
        required:true
      },
      {
        id:5,
        name:"location",
        type:"text",
        placeholder:"Enter your shop location",
        errorMessage:"Shop location should be 3-70 characters,and should include only letters and (,-'),and spaces.",
        required:false,
        label:"Shop Location",
        pattern:"^[a-zA-Z\u0621-\u064A,' -]{3,70}$"
      }
    ]
  } catch (error) {
    return []
  }
}