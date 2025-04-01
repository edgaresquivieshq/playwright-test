export const TEST_CONFIG = {
  BASE_URL: "http://localhost:3000",
  LOGIN_URL: "**/u/login*",
  PRODUCTS_URL: "**/admin/s/products*",
  TEST_USER: {
    EMAIL: process.env.TEST_USER_EMAIL || "edgar+playw@builtbyhq.com",
    PASSWORD: process.env.TEST_USER_PASSWORD || "Edgar123123",
  },
  TEST_USER_GOOGLE: {
    EMAIL: process.env.TEST_USER_EMAIL || "edgarhqtest@gmail.com",
    PASSWORD: process.env.TEST_USER_PASSWORD || "edgarhqtest123321",
  },
};

export const SELECTORS = {
  LOGIN: {
    EMAIL_INPUT: "#username",
    PASSWORD_INPUT: "#password",
    CONTINUE_BUTTON: 'button[name="Continue"]',
    FORGOT_PASSWORD_LINK: 'a:text("Forgot password?")',
    ERROR_MESSAGE: 'text="Wrong email or password"',
  },
  FORGOT_PASSWORD: {
    HEADING: 'h1:text("Forgot Your Password?")',
    EMAIL_INPUT: 'input[name="Email address"]',
    CONTINUE_BUTTON: 'button[name="Continue"]',
    BACK_BUTTON: 'button[name="Back to Arrangements"]',
  },
};
