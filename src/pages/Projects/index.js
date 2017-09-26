import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';
import Layout from '../Layout'

import styles from './index.css'

const projectModel = [
  {
    name: 'Mirror',
    contributer: true,
    url: 'https://github.com/TrevorJamesH/interview-app/commits?author=TrevorJamesH',
    description: 'An app to practice for interviews. It uses a user populated database of questions.  Two people can use it like flash cards, where one asks the other questions with a hint button in case they get stuck. Postges with Knex back-end.',
  },
  {
    name: 'IDM',
    contributer: true,
    url: 'https://github.com/LearnersGuild/idm/commits?author=TrevorJamesH',
    description: 'In house identity management service. Signup with an invite code and github authentication. The same indentity management is used through all of Learners Guilds services. RethinkDB and GraphQL back-end',
  },
  {
    name: 'Party Chat',
    contributer: false,
    url: 'https://github.com/TrevorJamesH/dispensable-chat',
    description: 'A chatroom app built in vanilla JavaScript. Opportunity to master web apps in JavaScript, and to learn to use websockets.',
  },
  {
    name: 'Browser Games',
    contributer: false,
    url: 'https://github.com/TrevorJamesH/browser-games',
    description: 'Chess and Tetris built in react. Early react learning experience combined with more complex game logic in JavaScript',
  },
]

export default class Projects extends Component{
  render(){
    const projects = projectModel.map( project => {
      const linkText = project.contributer ? 'Check out my contribution' : 'Check out my code'
      return(
        <Card style={{width: '725px'}} className={styles.card}>
          <CardTitle title={project.name}/>
          <CardText>
            {project.description}
            <br/>
            <br/>
            <a href={project.url}>{linkText}</a>
          </CardText>
        </Card>
      )
    })

    return(
      <Layout>
        {projects}
      </Layout>
    )
  }
}
