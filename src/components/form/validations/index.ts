const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,100}$/;

const emailRegex =
  /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/;

const nameRegex = /^([A-Za-z]){1,20}$/;

const experienceRegex = /^(?:[1-9]|[1-4]\d|50)$/;

export const isRequired = (required: boolean = false) =>
  required && "This field is required";

export const email = {
  pattern: {
    value: emailRegex,
    message: "Please enter a valid email address",
  },
};

export const name = {
  pattern: {
    value: nameRegex,
    message: "Last name must contain only letters",
  },
};

export const password = {
  pattern: {
    value: passwordRegex,
    message:
      "Required at least: 8 characters, a digit, and an uppercase letter.",
  },
};
export const experience = {
  pattern: {
    value: experienceRegex,
    message: "should be less than 50",
  },
};
