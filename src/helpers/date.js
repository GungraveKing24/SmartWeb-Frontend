// ====================================================
// Forzar que cualquier fecha ISO se interprete como UTC
// ====================================================
const ensureUTC = (isoDate) => {
  if (!isoDate) return null;

  // Si la fecha NO termina en "Z" o no tiene offset, se lo agregamos.
  if (!isoDate.endsWith("Z") && !/[+-]\d\d:\d\d$/.test(isoDate)) {
    return isoDate + "Z"; // Forzar a UTC
  }

  return isoDate;
};

// ====================================================
// Convertir una fecha UTC → GMT-6 (America/El_Salvador)
// ====================================================
export const toGMT6Date = (isoDate) => {
  if (!isoDate) return null;

  const safeUTC = ensureUTC(isoDate);
  const dateUTC = new Date(safeUTC); // tratado como UTC garantizado

  // Convertir usando Intl
  const formatter = new Intl.DateTimeFormat("es-SV", {
    timeZone: "America/El_Salvador",
    hour12: false,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const parts = formatter.formatToParts(dateUTC);

  const get = (type) => parts.find((p) => p.type === type)?.value;

  const year = parseInt(get("year"));
  const month = parseInt(get("month")) - 1;
  const day = parseInt(get("day"));
  const hour = parseInt(get("hour"));
  const minute = parseInt(get("minute"));
  const second = parseInt(get("second"));

  return new Date(year, month, day, hour, minute, second);
};

// ====================================================
// Fecha formateada para la UI
// ====================================================
export const formatDate = (isoDate) => {
  if (!isoDate) return "";

  const date = toGMT6Date(isoDate);

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

// ====================================================
// Partes individuales de la fecha
// ====================================================
export const formatIndividualDate = (isoDate, type) => {
  if (!isoDate) return "";

  const date = toGMT6Date(isoDate);

  switch (type) {
    case "year":
      return date.getFullYear();
    case "month":
      return date.getMonth() + 1;
    case "day":
      return date.getDate();
    case "hour":
      return date.getHours();
    case "minutes":
      return String(date.getMinutes()).padStart(2, "0");
    default:
      return "";
  }
};

// ====================================================
// Partes individuales de la fecha
// ====================================================
export const formatIndividualDateNormal = (isoDate, type) => {
  if (!isoDate) return "";

  const date = new Date(isoDate);

  switch (type) {
    case "year":
      return date.getFullYear();
    case "month":
      return date.getMonth() + 1;
    case "day":
      return date.getDate();
    case "hour":
      return date.getHours();
    case "minutes":
      return String(date.getMinutes()).padStart(2, "0");
    default:
      return "";
  }
};
