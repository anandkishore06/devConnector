const ValidateReqBody = (req) => {
  const { firstname, lastname, emailId } = req.body;
  if (!firstname || !lastname || !emailId) {
    throw new Error("Some field is missing!");
  }
};

const validateEditProfileData = (req) => {
  const updateAllowed = ["firstname", "lastname", "gender", "age", "skills"];

  const isUpdateAllowed = Object.keys(req.body).every((field) =>
    updateAllowed.includes(field)
  );

  return isUpdateAllowed;
};

module.exports = {
  ValidateReqBody,
  validateEditProfileData
};
