import { IconBrandAmazon, IconBrandAppleFilled, IconBrandFacebookFilled, IconBrandGoogleFilled, IconBrandLinkedin, IconBrandSentry, IconBrandSpotify, IconBrandWindows, IconShieldFilled, IconWorld } from "@tabler/icons-react";

export const random = (length = 5) => {
  return [...Array(length)].map(() => Math.random().toString(36)[2]).join("");
};


export const companyIcon = (website: any) =>{
  var regex = /^(?:https?:\/\/)?(?:www\.)?([^\/.]+)/;
  var match = website.toLowerCase().match(regex);
  var subdomain = match ? match[1] : "global";
  const dictionary: any = {
    "amazon": IconBrandAmazon,
    "global": IconWorld,
    "google": IconBrandGoogleFilled,
    "microsoft": IconBrandWindows,
    "apple": IconBrandAppleFilled,
    "icloud": IconBrandAppleFilled,
    "sentry": IconBrandSentry,
    "linkedin": IconBrandLinkedin,
    "facebook": IconBrandFacebookFilled,
    "spotify": IconBrandSpotify,
    "hotspotshield": IconShieldFilled
  }
  return dictionary[subdomain] !== undefined ? dictionary[subdomain] : IconWorld;
}



export function getUniqueId() {
  let machineId = window.localStorage.getItem('machineId');
  if (!machineId) {
    machineId = Math.random().toString(36).substring(2);
    window.localStorage.setItem('machineId', machineId);
  }

  return machineId;
}


export function containsLinkInParagraph(htmlString: string) {
  var regex = /<p>https?:\/\/\S+<\/p>/;
  return regex.test(htmlString);
}


