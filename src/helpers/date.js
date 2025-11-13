export const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat("es-ES",{
      day: "2-digit",
      month: "long",
      year: "numeric"
    }).format(date);
};

export const formatIndividualDate = (isoDate, type) => {
    if (!isoDate) return "";
    const dateObject = new Date(isoDate);

    switch (type) {
      case "year":
        return dateObject.getFullYear()
      case "month":
        return dateObject.getMonth()
      case "day":
        return dateObject.getDate()
      case "hour":
        return dateObject.getHours()
      case "minutes":
        const min = dateObject.getMinutes()
        return String(min).padStart(2, "0")
  }
}
