export function validate(value, validation) {
  let isValid = true;
  if (validation.required) {
    isValid = value.trim() !== '' && isValid;
  }
  if (validation.empty) {
    isValid = value.trim() === '' && isValid;
  }
  if (validation.number) {
    isValid = isNaN(value) === false && isValid;
  }
  if (validation.fullNumber) {
    isValid = value - Math.floor(value) === 0 && isValid;
  }
  if (validation.minLength) {
    isValid = value.length >= validation.minLength && isValid;
  }
  if (validation.name) {
    const regExp = /[^#&<>"~;$^%{}?!`@*()-_=+\][:'0-9|,./№]$/;
    isValid = regExp.test(String(value).toLowerCase()) && isValid;
  }
  if (validation.email) {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    isValid = regExp.test(String(value).toLowerCase()) && isValid;
  }
  return isValid;
}