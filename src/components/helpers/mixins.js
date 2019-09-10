import { date } from 'quasar';

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

const formatMixin = {
  methods: {
    formatPhone(phone) {
      return phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
    },
    formatDate(timestamp) {
      return date.formatDate(timestamp * 1000, 'DD.MM.YYYY');
    },
  },
};

export {
  emailValidationMixin,
  formatMixin,
};
