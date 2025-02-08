export type CollectionName = "blog" | "projects" | "talks";


export type GlobalSite = {
  title: string;
  description: string;
  author: string;
  authorPhotoSrc: string;
  logo?: {
    darkThemeSrc?: string;
    lightThemeSrc?: string;
  };
};

export const GLOBAL: GlobalSite = {
  title: "lenar.dev",
  description: "Bartosz Lenar's space for tech thoughts",
  author: "Bartosz Lenar",
  authorPhotoSrc: "/bartoszlenar.png",
  logo: {
    darkThemeSrc: "/logo/logo_dark.png",
    lightThemeSrc: "/logo/logo_light.png",
  }
};


type CollectionSite =  {
  pageSize: number;
};

type HomeSite =  {
  blogEntries?: number;
  projectEntries?: number;
  talkEntries?: number;
}

export const HOME: HomeSite = {
  blogEntries: 5,
  projectEntries: 3,
  talkEntries: 3,
};

type BlogSite = CollectionSite & {
  license: {
    name: string;
    href: string;
  }
};

export const BLOG: BlogSite = {
  pageSize: 10,
  license: {
    name: "CC BY-NC-ND 4.0",
    href: "https://creativecommons.org/licenses/by-nc-nd/4.0",
  },
};

export const PROJECTS: CollectionSite = {
  pageSize: 10,
};

export const TALKS: CollectionSite = {
  pageSize: 10,
};

export const TAGS: CollectionSite = {
  pageSize: 10,
};

type ContactInfo = {
  type: string;
  href: string;
  displayAs?: string;
}

type ContactSite = ContactInfo[]

export const CONTACT: ContactSite = [
  {
    type: "Email",
    href: "mailto:bartosz@lenar.dev",
    displayAs: "bartosz@lenar.dev",
  },
  {
    type: "X",
    href: "https://x.com/bartoszlenar",
    displayAs: "@bartoszlenar on X",
  },
  {
    type: "GitHub",
    href: "https://github.com/bartoszlenar",
  },
  {
    type: "LinkedIn",
    href: "https://www.linkedin.com/in/bartoszlenar/",
  },
];
