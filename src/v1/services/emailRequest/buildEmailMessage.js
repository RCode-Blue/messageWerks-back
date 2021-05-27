const buildEmailMessage = async (data) => {
  const { from, to, subject, htmlPart, variables } = data;

  let message;

  message = [
    {
      From: {
        Email: from.email,
        Name: from.name,
      },
      To: [
        {
          Email: to.email,
          Name: to.name,
        },
      ],
      TemplateLanguage: true,
      Variables: variables,
      Subject: subject,
      HtmlPart: htmlPart,
    },
  ];

  return message;
};

module.exports = buildEmailMessage;
