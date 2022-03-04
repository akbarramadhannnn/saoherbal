export const GeneratePrefixUrl = position => {
  let url = "";
  if (position === "0") {
    url = "/admin";
  } else if (position === "2") {
    url = "/sales";
  } else if (position === "9") {
    url = "/engineer";
  }
  return url;
};
