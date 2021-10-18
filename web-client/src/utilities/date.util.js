const defaultFormat = (date) => {
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "2-digit"
  }).format(new Date(date));
}

const exportedObj = {
  defaultFormat
}

export default exportedObj;