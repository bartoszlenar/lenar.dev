//this function returns button data in correct languages.

export const ButtonData = (LangData, currentLang) => [
  // {
  //   buttonText: LangData[currentLang]["your_privacy_title"],
  //   name: "privacy",
  //   explanation: {
  //     title: LangData[currentLang]["your_privacy_paragraph_title"],
  //     paragraphs: LangData[currentLang]["your_privacy_paragraphs"],
  //   },
  // },
  // {
  //   buttonText: LangData[currentLang]["strictly-necessary_title"],
  //   name: "strictly-necessary",
  //   explanation: {
  //     title: LangData[currentLang]["strictly-necessary_title"],
  //     paragraphs: LangData[currentLang]["strictly-necessary_paragraphs"],
  //     toggle: true,
  //   },
  // },
  {
    buttonText: LangData[currentLang]["moreinfo_title"],
    name: "moreinfo",
    explanation: {
      title: LangData[currentLang]["moreinfo_paragraph_title"],
      paragraphs: LangData[currentLang]["moreinfo_paragraphs"],
    },
  },
  {
    buttonText: LangData[currentLang]["functionality_title"],
    name: "functionality",
    explanation: {
      title: LangData[currentLang]["functionality_title"],
      paragraphs: LangData[currentLang]["functionality_paragraphs"],
      toggle: true,
    },
  },
  {
    buttonText: LangData[currentLang]["tracking_title"],
    name: "tracking",
    explanation: {
      title: LangData[currentLang]["tracking_title"],
      paragraphs: LangData[currentLang]["tracking_paragraphs"],
      toggle: true,
    },
  },
  // {
  //   buttonText: LangData[currentLang]["targeting-advertising_title"],
  //   name: "targeting-advertising",
  //   explanation: {
  //     title: LangData[currentLang]["targeting-advertising_title"],
  //     paragraphs: LangData[currentLang]["targeting-advertising_paragraphs"],
  //     toggle: true,
  //   },
  // },
];
