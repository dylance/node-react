const _ = require("lodash");
const pathParser = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = app => {

  app.post('/api/surveys/webhooks', (req, res) => {
    const events = _.map(req.body, ({ email, url }) => {
      const pathname = new URL(url).pathname;
      const p = new pathParser.Path('/api/surveys/:surveyId/:choice');
      const match = p.test(pathname);
      console.log("match is", match)
      console.log("email is ", email)
      if (match) {
        return { email, surveyId: match.surveyId, choice: match.choice }
      }
    });
    console.log("events is: ", events);
    const compactEvents = _.compact(events);
    const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
    console.log("the uniqurie events are:", uniqueEvents);
  });

  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
  })

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title, // ES6 syntax to use instead of title: title
      subject,
      body,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // place to send email
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
