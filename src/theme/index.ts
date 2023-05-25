export interface Theme {
  breakpoint: {
    xl: string;
    l: string;
    m: string;
    s: string;
    xs: string;
  };
  color: {
    neutral: {
      primary: string;
      secondary: string;
      base: string;
      line: string;
      dark: string;
    };
    primary: {
      default: string;
      hover: string;
      pressed: string;
    };
    secondary: {
      default: string;
      secondary: string;
      pressed: string;
    };
    success: {
      default: string;
      hover: string;
      pressed: string;
    };
    warning: {
      default: string;
      hover: string;
      pressed: string;
    };
    danger: {
      default: string;
      hover: string;
      pressed: string;
    };
    text: {
      primary: string;
      secondary: string;
      disabled: string;
    };
  };
}

export const THEME: Theme = {
  breakpoint: {
    xl: '1440px',
    l: '1280px',
    m: '1024px',
    s: '640px',
    xs: '320px'
  },
  color: {
    neutral: {
      primary: 'rgba(228, 224, 216, 1)',
      secondary: 'rgba(220, 216, 208, 1)',
      base: 'rgba(245, 242, 235, 1)',
      line: 'rgba(192, 187, 178, 1)',
      dark: 'rgba(142, 137, 128, 1)'
    },
    primary: {
      default: 'rgba(97, 135, 250, 1)',
      hover: 'rgba(61, 107, 247, 1)',
      pressed: 'rgba(47, 95, 237, 1)'
    },
    secondary: {
      default: 'rgba(175, 137, 250, 1)',
      secondary: 'rgba(158, 112, 250, 1)',
      pressed: 'rgba(139, 84, 247, 1)'
    },
    success: {
      default: 'rgba(54, 211, 159, 1)',
      hover: 'rgba(14, 164, 114, 1)',
      pressed: 'rgba(8, 135, 93, 1)'
    },
    warning: {
      default: 'rgba(251, 187, 60, 1)',
      hover: 'rgba(233, 157, 5, 1)',
      pressed: 'rgba(184, 124, 4, 1)'
    },
    danger: {
      default: 'rgba(248, 114, 125, 1)',
      hover: 'rgba(239, 67, 82, 1)',
      pressed: 'rgba(224, 45, 60, 1)'
    },
    text: {
      primary: 'rgba(0, 0, 0, 1)',
      secondary: 'rgba(0, 0, 0, 0.45)',
      disabled: 'rgba(0, 0, 0, 0.25)'
    }
  }
};
