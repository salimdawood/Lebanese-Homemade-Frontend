export default function sortItemList (itemList){
  try {
    return itemList
    .sort(function(a, b){
      var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
      if (nameA < nameB)
       return -1;
      if (nameA > nameB)
       return 1;
      return 0;
    }) 
  } catch (error) {
    return []
  }
}