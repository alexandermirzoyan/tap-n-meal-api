// As the locales should be hard coded in DB, there is no need to dynamically find id by locale code
// when the application starts, we should be sure that those locales are available in 'locales' table
export const LOCALES = {
  en: 1,
  hy: 2,
  ru: 3,
};
