import Cookies from "js-cookie";

export const setToken = (token) => {
  Cookies.set("token", token, { sameSite: "lax", secure: true });
};

export const removeToken = () => {
  Cookies.remove("token");
};

export const getToken = () => {
  Cookies.get("token");
};

export function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function getFinalPrice(item) {
  let baseItemPrice = 0;
  let addOnsTotal = 0;
  let netItemPrice = 0;

  if (item.variant) {
    baseItemPrice = item.variant.price;
  } else {
    baseItemPrice = item.product.price;
  }

  addOnsTotal = item.addOns.reduce((total, addOn) => {
    return total + addOn.price;
  }, 0);

  netItemPrice = baseItemPrice + addOnsTotal;
  return netItemPrice;
}

export function getCartItemPrice(item) {
  if (item.variant) {
    return item.variant.price + " " + toTitleCase(item.variant.name);
  } else {
    return item.product.price;
  }
}
