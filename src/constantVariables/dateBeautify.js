export default function dateBeautify(dateCreated){
  try {
    let dateDB = new Date(dateCreated)
    let dateNow = new Date()
    var diff = (dateNow - dateDB);
    //86400000 === 24 hours
    return diff>=86400000?
    dateDB.toLocaleString('ar-EG')
      :
    dateDB.toLocaleTimeString('ar-EG')
  } catch (error) {
    return "error loading date"
  }
}