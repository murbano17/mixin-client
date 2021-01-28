import { useState } from "react";
import { isEmail } from "validator";

export const useValidationForm = () => {
  const [messageForm, setMessage] = useState("");

  const handleInputValidations = (fields) => {
    for (let i in fields) {
      if (!fields[i]) {
        setMessage("* Please complete all the required fields ");
        return false;
      }
    }
    if (!isEmail(fields.email)) {
      setMessage("* Email is not valid ");
      return false;
    }
    return true;
  };

  return [handleInputValidations, messageForm];
};
