export const getFullName = (firstname, lastname) =>{
           let fullName = `${firstname} ${lastname}`
           return fullName
}
export const removeItemFromArray = (array, index) => {
    console.log(array, index);
    array.splice(index, 1)
    return array
}