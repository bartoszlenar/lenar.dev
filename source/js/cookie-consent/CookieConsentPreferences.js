import { html, useState } from "./standalone.module.js";
import { LangData } from "./CookieConsentLangData.js";
import { ButtonData } from "./CookieConsentButtonData.js";

const Preferences = ({
  openClosePref,
  params,
  fromId,
  changeLanguage,
  currentLang,
}) => {
  const [consents, setConsents] = useState({
    ...window.popupsmart_current_consents,
  });

  let AllLanguages = Object.keys(LangData);
  const [currLangPref, setCurrLangPref] = useState(params["language"]);
  let changeCurrentLanguage;
  if (currentLang) {
    changeCurrentLanguage = (e) => {
      let value = e.target.value;
      changeLanguage(value);
    };
  } else {
    currentLang = currLangPref;
    changeCurrentLanguage = (e) => {
      let value = e.target.value;
      setCurrLangPref(value);
    };
  }

  //get button data in right language format.
  const data = ButtonData(LangData, currentLang);
  const theme = params["palette"];

  const AllButtonNames = data.map((x) => x.name);
  const ButtonsObj = {};
  for (let i = 0; i < AllButtonNames.length; i++) {
    let button = AllButtonNames[i];
    ButtonsObj[button] = false;
  }

  const [buttonStates, setButtonStates] = useState(ButtonsObj);
  const mainStyle = params["notice_banner_type"];

  //open close link handler
  const openCloseLink = (e) => {
    const name = e.currentTarget.name;
    let newState = { ...buttonStates };
    let value = newState[name];
    newState[name] = !value;
    setButtonStates(newState);
  };

  //save preferences on global object, remove both popup and preferences
  const saveNewConsents = () => {
    window.popupsmart_current_consents = { ...consents };
    openClosePref();
  };
  //apply preference changes
  const applyChanges = () => {
    saveNewConsents();
    window.popupsmart_change_script_types(); //don't forget to change script types

    const popup = document.getElementById(
      "popupsmart_cookie_consent_gdpr_root"
    );
    if (popup) {
      popup.remove();
    }
  };

  //store consent changes in local state first
  const handlePreferences = (e) => {
    e.stopPropagation();

    const name = e.currentTarget.getAttribute("name");
    if (name !== "strictly-necessary") {
      let newState = { ...consents };
      newState[name] = !consents[name];
      setConsents(newState);
    }
  };
  const siteName = params["siteName"];
  const companyLogoURL = params["companyLogoURL"];

  return html`
    <div class="consent__preferences"
    style="
            background-color:${theme === "dark" ? "black" : "white"};
            color:${theme === "dark" ? "white" : "#777777"};
            box-shadow:${
              theme === "dark"
                ? "0 10px 20px rgba(255,255,255,.2);"
                : " 0 10px 20px rgba(0,0,0,.2);"
            };
            "
    >
  <div class="preferences__overflow">
  <div class="preferences__top"
  style="
          background-color:"inherit";
          color:${theme === "dark" ? "white" : "black"};
          "
  >
  <button
  class="closePrefCross"
  onClick=${saveNewConsents}>
  <img
  class="crossImg"
  src="/js/cookie-consent/cross.svg" />
  </button>
      <div class="site_name">
      ${siteName}
      </div>
      <div
      class="title"
      >
      ${LangData[currentLang]["cookie_preferences_title"]}
      </div>
  </div>

  <div class="links">
      ${data.map(
        (currentData, index) =>
          html`
            <div class="buttonMainWrapper">
              <button
                onClick=${openCloseLink}
                key=${index}
                name=${currentData.name}
                style="
          color:${buttonStates[currentData.name]
                  ? theme === "dark"
                    ? "white"
                    : "black"
                  : "inherit"};
          background-color:${buttonStates[currentData.name]
                  ? theme === "dark"
                    ? "#333333"
                    : "#f2f2f2"
                  : "inherit"};
          border-top:${theme === "dark"
                  ? "1px solid #666666"
                  : "1px solid #00000033"};
          "
              >
                <div
                  class="title"
                  style="
          color:${buttonStates[currentData.name]
                    ? theme === "dark"
                      ? "white"
                      : "black"
                    : "inherit"};
          "
                >
                  <div class="button__title__left">
                    <img
                      class="button__image"
                      src=${buttonStates[currentData.name]
                        ? theme === "dark"
                          ? "/js/cookie-consent/up-arrow-light.svg"
                          : "/js/cookie-consent/up-arrow-dark.svg"
                        : "/js/cookie-consent/down-arrow.svg"}
                    />
                    <span>${currentData.buttonText}</span>
                  </div>

                  ${currentData.explanation.toggle
                    ? html`
                        <div
                          name=${currentData.name}
                          onClick=${handlePreferences}
                          class="checkboxDiv__wrapper ${currentData.name ===
                            "strictly-necessary" &&
                          "checkboxDiv__wrapper__disabled"}"
                        >
                          <div
                            class="checkboxDiv ${consents[currentData.name]
                              ? "checkboxDiv-active"
                              : "checkboxDiv-passive"}"
                            name=${currentData.name}
                          ></div>
                        </div>
                      `
                    : null}
                </div>
              </button>
              <div
                class="explanation"
                style="display:${buttonStates[currentData.name]
                  ? "flex"
                  : "none"};
          background-color:inherit;
          width:100%;
          flex-flow:column nowrap;
          color:inherit;
          background-color:${buttonStates[currentData.name]
                  ? theme === "dark"
                    ? "#333333"
                    : "#f2f2f2"
                  : "inherit"};

          "
              >
                ${currentData.explanation.paragraphs.map(
                  (p, index) =>
                    html`
                      ${p === "privacy_policy_link"
                        ? params["privacy_policy_url"] !== "#" &&
                          html`<a
                            style="
              color:${theme === "dark" ? "white" : "black"}
              "
                            href=${params["privacy_policy_url"]}
                            >Privacy Policy</a
                          >`
                        : html`
                            <p key=${index} class="explanation__text">${p}</p>
                          `}
                    `
                )}
              </div>
            </div>
          `
      )}
  </div>
  </div>

    <div class="preferences__bottom"
    style="
            background-color:${theme === "dark" ? "#484848" : "inherit"};
            color:${theme === "dark" ? "white" : "black"};
            box-shadow:0px -5px 10px rgba(0, 0,0, 0.15);
            "
    >
    <button
    style="
    background-color:${theme === "dark" ? "white" : "black"};
    color:${theme === "dark" ? "black" : "white"}
    "
    onClick=${applyChanges}>
        ${LangData[currentLang]["save_preferences"]}
    </button>
    <div class="text"
    style="color:${theme === "dark" ? "white" : ""}"
    >
      <p>
        Cookie Consent by <a target="_blank" href="https://popupsmart.com">Popupsmart</a>
      </p>
    </div>

</div>
</div>
    `;
};

export default Preferences;
