export const messages = {
    confUrl: {
      urlPattern: "The URL must end with '/raw/master/configuration.json'.",
      httpsMissing: "The URL must start by 'https://'.",
      empty: "URL cannot be empty.",
      invalid: "Your URL is invalid or your are disconnected from your VPN.",
      http404: {
        title: "404 ?! Hum, I think I'm lost...",
        text: "Something is wrong with the provided configuration URL, but I don't know what...<br/><br/>Could you please check that for me ?",
        button: "Check configuration URL"
      },
      wrongUrl: {
        title: "Oops, something went wrong...",
        button: "Check configuration"
      }
    },
    generic: {
      title: "It's so close, but so far...",
      text: "Something went wrong when I've tried to get the configuration, but I don't know what...<br/><br/>Can you check your <strong>configuration URL</strong> please ?<br/><br/><small><i><u>Tips</u> : You can try to copy past it in your browser, you should land on an awesome incomprehensible JSON page. If not, you may have a problem...</i></small>",
      button: "Check configuration URL"
    },
  welcome: {
    title: "<strong>Welcome</strong> and thank you for use the Odigo environment linker !",
    text: "To begin, you have to provide the configuration URL.<br/><br/><small><i><u>Help</u> : if you haven't got this URL, you can ask it to L&eacute;vent&eacute; NAGY on Slack.</small>",
    button: "Configure now"
  },
  vpn: {
    title: "Damn... Where is it ?",
    text: "Your VPN seems to have drifted away. Could you help me find it ?<br/><br/>Please check your VPN connection."
  },
  aws: {
    roleEmpty: "Role cannot be empty."
  }
};
