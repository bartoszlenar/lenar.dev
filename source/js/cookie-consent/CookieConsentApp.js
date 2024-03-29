window.popupsmart_current_consents = {
  "strictly-necessary": true,
  functionality: false,
  tracking: false,
  "targeting-advertising": false,
};
window.popupsmart_change_script_types = (firstRender) => {
  let scripts = document.getElementsByTagName("script");
  let scriptsToBeAdded = [];
  for (let i = 0; i < scripts.length; i++) {
    let current = scripts[i];
    let consentCurrent = current.getAttribute("cookie-consent");
    let typeCurrent = current.type;
    if (consentCurrent && typeCurrent === "text/plain") {
      if (window.popupsmart_current_consents[consentCurrent]) {
        let clone = document.createElement("script");
        let attributes = current.getAttributeNames();
        attributes.forEach((attr) =>
          clone.setAttribute(attr, current.getAttribute(attr))
        );
        clone.type = "text/javascript";
        clone.innerHTML = current.innerHTML;
        scriptsToBeAdded.push(clone);
        current.remove();
        i--;
      }
    } else if (consentCurrent && typeCurrent === "text/javascript") {
      if (!window.popupsmart_current_consents[consentCurrent]) {
        let clone = document.createElement("script");
        let attributes = current.getAttributeNames();
        attributes.forEach((attr) =>
          clone.setAttribute(attr, current.getAttribute(attr))
        );
        clone.type = "text/plain";
        clone.innerHTML = current.innerHTML;
        scriptsToBeAdded.push(clone);
        current.remove();
        i--;
      }
    }
  }
  const currConsents = { ...window.popupsmart_current_consents };
  if (firstRender != "firstRender") {
    let currentLocalStorage = window.localStorage.getItem(
      "gdpr_cookie_consent"
    );
    let parsed = JSON.parse(currentLocalStorage);
    let expiry = parsed["expiry"];
    let obj = {
      expiry: expiry,
      "strictly-necessary": currConsents["strictly-necessary"],
      functionality: currConsents["functionality"],
      tracking: currConsents["tracking"],
      "targeting-advertising": currConsents["targeting-advertising"],
    };
    const json = JSON.stringify(obj);
    window.localStorage.setItem("gdpr_cookie_consent", json);
  } else {
    let now = Date.now();
    let oneYearLater = now + 1000 * 60 * 60 * 24 * 365;
    let newLocalStorage = { expiry: oneYearLater };
    const json = JSON.stringify(newLocalStorage);
    window.localStorage.setItem("gdpr_cookie_consent", json);
  }
  for (let i = 0; i < scriptsToBeAdded.length; i++) {
    let current = scriptsToBeAdded[i];
    document.body.appendChild(current);
  }
};
function popupsmartCookieConsentPopup(params) {
  let cookieConsent = window.localStorage.getItem("gdpr_cookie_consent");
  let parsed = JSON.parse(cookieConsent);
  let now = Date.now();
  if (parsed && parsed["expiry"] > now && parsed["strictly-necessary"]) {
    window.addEventListener("load", (event) => {
      window.popupsmart_current_consents = {
        "strictly-necessary": parsed["strictly-necessary"],
        functionality: parsed["functionality"],
        tracking: parsed["tracking"],
        "targeting-advertising": parsed["targeting-advertising"],
      };
      window.popupsmart_change_script_types();
    });
  } else {
    window.addEventListener("load", (event) => {
      window.popupsmart_change_script_types("firstRender");
      window.popupsmart_current_consents = {
        "strictly-necessary": true,
        functionality: true,
        tracking: true,
        "targeting-advertising": false,
      };
      window.popupsmart_cookie_consent_start(params);
    });
  }
  let prefId = params["preferencesId"];
  prefId = prefId.slice(1);
  let mountElement = document.getElementById(prefId);
  if (mountElement) {
    window.addEventListener("load", (event) => {
      window.popupsmart_cookie_consent_open_preferences_center({
        params: params,
        mountElementId: prefId,
      });
    });
  }
}
