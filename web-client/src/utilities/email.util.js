const isValid = (email) => {
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

const exportedObj = {
  isValid
}

export default exportedObj;