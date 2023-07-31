import threadableImage from '../assets/images/projects/threadable.png';
import covidImage from '../assets/images/projects/covid.png';
import allPassImage from '../assets/images/projects/allpass.jpg';
import moveImage from '../assets/images/projects/move.png';
import netflixImage from '../assets/images/projects/netflix.png';
import mdaImage from '../assets/images/projects/mda.png';
import pbsImage from '../assets/images/projects/pbs.png';
import sogImage from '../assets/images/projects/sog.jpeg';
import beaconVideo from '../assets/videos/projects/beacon.mp4';
import pbsVideo from '../assets/videos/projects/pbs.mp4';
import mdaVideo from '../assets/videos/projects/mda.mp4';
import sogVideo from '../assets/videos/projects/sog.mp4';
import covidVideo from '../assets/videos/projects/covid.mp4';
import threadableVideo from '../assets/videos/projects/threadable.mp4';

export default [
  {
    title: 'Threadable',
    description: `Threadable began as a branding contract. The new startup us to create a design prototype, but
    after hearing what they were trying to build, I created a simple React Native app to prove out the concept: 
    A social e-reader. They were so wowed, they continued to work with us for 3 more years as we built the native app, 
    backend, conducted user interviews and more.
    <br />
    <br />
    We grew the platform from an idea to an app with more than 6,000 users. When React Native wasn't enough, I wrote features
    in Objective-C and built our e-reader in Swift, diving into the internals of React Native. 
    We built a scalable backend in Ruby on Rails that serves as the API for the native app, web app, and internal admin tool.
    <br />
    <br />
    <blockquote>
      I don't know if I can even put into words the impact Scott had on me and my career. He taught me so much about problem
      solving, collaboration, mentorship, and how being a kind, patient, supportive engineer is just as (if not more) important 
      than being a smart one!
      <br />
      <br />
      - <strong>Caitlin Wang</strong>, Senior Fullstack engineer
    </blockquote>
    <br />
    <br />
    My role was not only to be the main contributor, but also mentor and onboard other engineers to the project. I did this
    through pairing, comprehensive yet compassionate code reviews, stretch goals, and being open to new ways of doing things.
    `,
    images: [threadableImage],
    videos: [threadableVideo],
    skills: ['React Native', 'Swift', 'Ruby', 'Firebase']
  },
  {
    title: 'COVID Protocols',
    description: `In early March, just as the outbreak took hold and hospitals around the world started overflowing with 
    patients, the medical community faced a big problem: They didn’t know the best way to treat COVID-19. Best practices 
    changed daily as we learned more about the Novel Coronavirus. And different circumstances called for entirely different 
    approaches.
    <br />
    <br />
    <blockquote>
      There was massive urgency to get quality information out to the people saving lives. Upstatement designed an amazing 
      product with lightning turn around that allowed us to edit with over 100 authors simultaneously.
      <br />
      <br />
      - <strong>Dr. C. Lee Cohen</strong>, Pulmonary and Critical-care Fellow at Brigham and Women’s Hospital
    </blockquote>
    <br />
    <br />
    To keep up, doctors needed a reliable source of truth that evolved at the speed of the spread. And they needed it fast. 
    One of the biggest hurdles was that doctors didn't want to learn a CMS. They knew how to work with Google Docs. Using
    the Google Docs APIs, we exported the content to JSON and used that to dynamically built out components in the native app.
    All doctors had to do was click a button in Google Docs -- using a special action we wrote via Google Plugins.
    <br />
    <br />`,
    images: [covidImage],
    videos: [covidVideo],
    skills: ['React Native', 'Google API', 'Cloud Functions']
  },
  {
    title: 'Beacon Passport',
    description: `Beacon Capital Partners manages high-end office space across the country and is known for giving its 
    tenants best-in-class treatment. So our back-to-work app had to deliver an exceptional product experience — and do it 
    fast. Within a matter of weeks, Upstatement rapidly designed, prototyped, built, tested, and launched Passport, an 
    app that keeps tenants safe while delivering on Beacon's brand promise.
    <br />
    <br />
    <blockquote>
      From start to finish, the team was an absolute pleasure to work with and had a best-in-class product up and running 
      for us in a matter of weeks.
      <br />
      - <strong>Simon Yeo</strong>, Beacon Capital Partners
    </blockquote>
    <br />
    <br />
    This was the company's first React Native project and my second native app. I lead a team of three engineers and one
    designer to create an app that generated QR codes for safety checkpoints and send proximity notifications when a user
    approached their office building.
    `,
    images: [allPassImage],
    videos: [beaconVideo],
    skills: ['React Native', 'PWA', 'Cloud Functions', 'Geolocation']
  },
  {
    title: 'PBS NewsHour',
    description: `We worked together to develop graphics for the 2020 election season. We set out to:
    <ul>
      <li>
        Design <strong>clear, informative graphics</strong> that work everywhere NewsHour audiences might encounter them 
        (on the broadcast, the web, and social media).
      </li>
      <li>
        Replace a laborious and error-prone workflow of manual edits with 
        <strong>automated, always-up-to-date components.</strong>
      </li>
      <li>
        <strong>Build a centralized app</strong> and easy workflow that empowers the NewsHour for future election seasons.
      </li>
    </ul>
    <br />
    Most importantly, these components needed to do <strong>everything</strong> on their own. They should take care of
    API requests, updating graphics, and controlling the logic for when a winner is called. They also had to be agnostic
    of site styles, as these were used on PBS NewsHour's site but also partner sites, with different layouts and stylesheets.
    Web components allowed us to encapsulate everything into one piece of UI and all our client had to do was copy and
    paste an HTML element.
    <br />
    <br />
    The suite of components includes race results tables, “winner called” graphics, maps that let users explore 
    county-by-county results, and visualizations of voter survey responses. All of these are populated in real time by a
    data feed from the Associated Press. Editors access a dashboard where they can power broadcast graphics, 
    download perfectly-sized social images, and copy small code snippets to use the live-updated graphics anywhere on the web. 
    <a class="underline" href="/posts/building-custom-web-components/">Read more about our web component approach.</a>
`,
    images: [pbsImage],
    videos: [pbsVideo],
    skills: ['Web Components', 'Django']
  },
  {
    title: 'Moms Demand Action',
    description: `We built both a website and a set of apps for Moms Demand Action. The website helps new volunteers 
    sign up and get started while the app keeps them engaged over time. In both cases, joining the movement needed to 
    be effortless and taking action needed to feel immediate.
    <br />
    <br />
    I was the Lead Engineer on the app, which was a path to action for new volunteers and seasoned leaders alike. 
    Actions depend on your volunteer level and the priorities for the day. We also built one-tap RSVP-ing for events, 
    which drastically reduces registration time.
    <br />
    <br />
    We built the native app with NativeScript (a rather new technology at the time). We integrated with existing legacy
    APIs, firebase, Cloud Messaging, ActionKit, and more. We built out a centralized API with Node and Express to serve
    as the ultimate source of truth, connecting all these systems to give developers an easy-to-use RESTful API.
    <br />
    <br />
    <a class="underline" href="/posts/see-you-later-generator/">Read more about how we solved some concurrency issues with slow requests.</a>`,
    images: [mdaImage],
    videos: [mdaVideo],
    skills: ['Vue', 'Express', 'NativeScript', 'Firebase']
  },
  {
    title: 'Netflix - Prodicle Move',
    link: 'https://variety.com/2018/digital/news/netflix-move-app-production-technology-1202720581/',
    description: `Netflix had contracted our team to build out apps for production crews -- the people creating
    Netflix original content. Our first, and most prominent, app was Prodicle Move, an app for scheduling shooting
    days for Hollywood productions and communicating with crews, actors, directors, and more in real time. I joined
    the project in 2017 and after a few months, was promoted to the lead engineer on the project.
    <br />
    <br />
    We had to integrate with an internal Ruby on Rails API that powered dozens of back-of-house apps at Netflix.
    This meant writing thorough tests to ensure functionality was not broken by any of the 100 engineers contributing and
    sometimes fixing bugs live in production (not recommended, by the way).
    <br />
    <br />
    I was brought on in 2017 and after just a few months was promoted to Lead Engineer on the project, leading both this
    and one other app for Netflix. Our apps were used on shows/movies such as Stranger Things, GLOW, Bird Box, The Witcher,
    and many more.
    <br />
    <br />
    I was the third engineer brought onto the project and after my two predecessors left, I was in charge of onboarding
    all the new engineers to the Prodicle suite of projects (even ones I didn't work on). Over the course of 2 and a half
    years, I onboarded and trained 7 engineers covering infrastructure, security systems, style guide, PR review process,
    and more.
    `,
    images: [netflixImage, moveImage],
    videos: [],
    skills: ['PWA', 'Ember', 'Ruby on Rails', 'Twilio']
  },
  {
    title: 'Society of Grownups',
    description: `
    Built with Ember.js and Elixir Phoenix on the backend, SoG was meant to be an educational tool for teaching financial 
    literacy. Apart from working on the web app that linked your bank accounts and credit cards together, I lead our
    online classes project. Working with the Wistia API (and later creating an 
    <a class="underline" href="https://github.com/sbatson5/ember-wistia">open source project from it</a>), we built interactive online
    courses about budgeting, investing, and more.
    <br />
    <br />
    <blockquote>
      Scott is a very thoughtful and deliberate programmer. He only writes very clean code that is easy to read 
      and follow. He writes extensive and meaningful tests, making sure to account for various scenarios. I had 
      the good fortune to pair with Scott on multiple projects in both Ember and Elixir. He was a great teacher 
      as I was learning Ember and was always able to give me a detailed answer and explain things clearly. Scott 
      is always ready to help. He's one of the best people with whom I've had 
      the good fortune to work.
      <br />
      <br />
      - <strong>Tarin McAdoo Comer</strong>, Senior Fullstack Engineer
    </blockquote>
    <br />
    <br />
    During this project, I dove into open source, becoming a main contributor to Ember.js, Ember Data, and was the
    top maintainer of <a class="underline" href="https://github.com/adopted-ember-addons/ember-cli-flash">ember-cli-flash</a>, 
    a package that was being downloaded 50,000 times a week at the time.
    `,
    images: [sogImage],
    videos: [sogVideo],
    skills: ['Ember', 'Elixir Phoenix', 'PWA']
  }
];