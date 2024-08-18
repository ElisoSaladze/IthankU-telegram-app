const emailRegex =
  /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/;

export const isRequired = (required: boolean = false) =>
  required && "This field is required";

export const email = {
  pattern: {
    value: emailRegex,
    message: "Please enter a valid email address",
  },
};
