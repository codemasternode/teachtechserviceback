export function doNotContainSpecialCharacters(value) {
  var regex = new RegExp("^[a-zA-Z0-9-.]*$");
  if (!regex.test(value)) {
    throw new Error("This field can not contains special characters");
  }
}

export function appropariateLength(value, min, max) {
  if (!min) {
    if (value.length > max) {
      throw new Error(
        `This field is too long,the maximum number of characters allowed is ${max}`
      );
    }
  } else if (!max) {
    if (value.length < min) {
      throw new Error(
        `This field is too short,the maximum number of characters allowed is ${min}`
      );
    }
  } else {
    if (value.length > max || value.length < min) {
      throw new Error(
        `This field doesn't has appropariate length,the maximum number of characters allowed is ${max} and minmum number is ${min}`
      );
    }
  }
}
