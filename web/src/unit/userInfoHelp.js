const formatUserInfoFromResponse = (userInfo) => {
  let userResume = {
    email: userInfo.email,
    username: userInfo.username,
    college: userInfo.college,
    intendedJob: userInfo.intendedJob,
    phone: userInfo.phone,
    address: userInfo.address,
    age: Number(userInfo.age),
    qualification: userInfo.qualification,
    sex: userInfo.sex,
    ID: userInfo.ID,
  };
  userInfo.itemDetails.forEach((item) => {
    userResume[item.itemType] = item.detail && JSON.parse(item.detail);
    userResume[item.itemType+"ID"] = item.ID;
  });
  console.log('userResume',userResume);
  return userResume;
};

export { formatUserInfoFromResponse };
