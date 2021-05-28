import React, { useEffect } from 'react';
import { Seo } from '../components';
import { Octokit, log } from '../utils';
import '../styles/main.css';

const octokit = Octokit();

export default function MainPage () {
  useEffect(() => {
    //octokit.rest.users.getAuthenticated().then(i => log.debug(`Authenticated User Is: ${i.data.login}`));
    //octokit.rest.rateLimit.get().then(i => log.debug(`Remaining Requests: ${i.data.resources.core.remaining}`));
  }, [])
  return (
    <div id='main'>
      <Seo title='Home'/>
      <footer>
        <span>This Website Is Made With :+1: :heart: In: <a href='https://gatsbyjs.com/'>Gatsby.js</a>, And Is Open Source On: <a href='https://github.com/TheBotlyNoob/TheBotlyNoob.github.io/'>GitHub</a>!</span>
      </footer>
    </div>
  );
};
