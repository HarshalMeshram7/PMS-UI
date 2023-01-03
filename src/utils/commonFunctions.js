export const getFullName = (firstname, lastname) => {
  let fullName = `${firstname} ${lastname}`;
  return fullName;
};
export const removeItemFromArray = (array, index) => {
  console.log(array, index);
  array.splice(index, 1);
  return array;
};

export const filterArrayByArrayIDs = (arr, keys, superAdmin) => {
  return new Promise(async function (resolve, reject) {
    console.log(arr)
    if (arr !== [] || arr !== null || arr !== undefined || arr !== false ) {
      if (superAdmin == "SuperAdmin") {
        resolve(arr);
      } else {
        let key = JSON.parse(keys);
        const res = [];
        await arr?.map((item) => {
          if (key?.includes(item.ID)) {
            res.push(item);
          }
        });
        resolve(res);
      }
    }else{
      resolve([]);
    }
  });
};
