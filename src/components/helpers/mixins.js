const emailValidationMixin = {
  methods: {
    isValidEmail(email) {
      if (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
      }

      return false;
    },
  },
};

const phoneValidationMixin = {
  methods: {
    // eslint-disable-next-line
    isValidPhone(phone_number) {
      if (/^((\+7|7|8)+([0-9]){10})$/.test(phone_number)) {
        return true;
      }

      return false;
    },
  },
};

export {
  emailValidationMixin, phoneValidationMixin,
};
