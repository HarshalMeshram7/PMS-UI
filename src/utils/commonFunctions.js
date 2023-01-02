export const getFullName = (firstname, lastname) =>{
           let fullName = `${firstname} ${lastname}`
           return fullName
}
export const removeItemFromArray = (array, index) => {
    console.log(array, index);
    array.splice(index, 1)
    return array
}

export const filterArrayByArrayIDs = (arr , keys) => {
 return new Promise(async function (resolve, reject) {
  let key = JSON.parse(keys)
    const res = [];
   await arr?.map((item)=>{
        if(key.includes(item.ID)){
            res.push(item)
         };
    })

    resolve(res)
})
};