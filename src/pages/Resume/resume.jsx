import React from 'react'
import styles from './index.css'

const Resume = () => (
  <div className={styles.resume}>
    <header>
      <div>
        <div>
          <div>
            <h1 className={styles.title}>
              Trevor Hewitt
            </h1>
            <h2 className={styles.title}>
              Full-Stack JavaScript Developer
            </h2>
          </div>
        </div>
      </div>
    </header>
    <div>
      <section>
        <aside>
          <h3>Contact</h3>
        </aside>
        <div>
          <div>
            <div>
              <strong>Email</strong>
              <div>TrevorHewitt@gmail.com</div>
            </div>
            <div>
              <strong>Phone</strong>
              <div>707-293-4784</div>
            </div>
            <div>
              <strong>Website</strong>
              <div>
                <a href />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <aside>
          <h3>About</h3>
        </aside>
        <div>
          <p>Curious and critical thinker who thrives on puzzles and problem solving, interested in building creative solutions.</p>
        </div>
      </section>
      <section>
        <aside>
          <h3>Profiles</h3>
        </aside>
        <div>
          <div>
            <div>
              <strong>
                Github
              </strong>
              <div>
                <div>
                  <a href="https://github.com/TrevorJamesH">TrevorJamesH</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <aside>
          <h3>Work</h3>
        </aside>
        <div>
          <div>
            <div>
              <h4>
                <span>Learners Guild</span>
                <span>
                  2016-11-01 — Present
                </span>
              </h4>
              <div>
                <a href="learnersguild.org">learnersguild.org</a>
              </div>
              <div>
                Apprentice Developer
              </div>
              <div>
                <p>Building and adding to open source software in an incubator collective of self-taught developers supported by senior engineers. I build full-stack web apps in JavaScript, specializing in Node, Express and React.</p>
              </div>
              <h4>Highlights</h4>
              <ul>
                <li>LOS: Learning Operating System:
                  <ul>
                    <li>Active open source software used by 80 people daily</li>
                    <li>React and Redux front-end</li>
                    <li>RethinkDB and GraphQL back-end</li>
                  </ul>
                </li>
                <br/>
                <li>Mirror: Interview preparation and quiz application.
                  <ul>
                    <li>React front-end</li>
                    <li>Postgres with Knex back-end</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section>
        <aside>
          <h3>Volunteer</h3>
        </aside>
        <div>
          <div>
            <div>
              <h4>
                <span>The MADE</span>
                <span>
                  2014-09-01 — Present
                </span>
              </h4>
              <div>
                <a href="themade.org">themade.org</a>
              </div>
              <br/>
              <div>
                <b>Event Coordinator</b>
              </div>
              <div>
                <p>Event Coordinator and Manager at Oaklands non-profit video game museum, offering free coding and design classes to the public. </p>
              </div>
              <h4>Highlights</h4>
              <ul>
                <li>Successful $50k kickstarter campaign amongst other fundraisers</li>
                <li>Hosting hackathons, field trips, and educational events. </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section>
        <aside>
          <h3>Education</h3>
        </aside>
        <div>
          <div>
            <div>
              <h4>
                <span>UC Santa Cruz</span>
                <span>2010-06-01 — 2014-05-01</span>
              </h4>
              <div>
                BA - Philosophy
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <aside>
          <h3>Skills</h3>
        </aside>
        <div>
          <div>
            <div>
              <div>
                <h4>Web Development</h4>
              </div>
              <ul>
                <li>Javascript</li>
                <li>React</li>
                <li>Node</li>
                <li>HTML</li>
                <li>CSS</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section>
        <aside>
          <h3>Languages</h3>
        </aside>
        <div>
          <div>
            <div>
              <div>
                <strong>English</strong>
              </div>
              <div>
                Native speaker
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <aside>
          <h3>Interests</h3>
        </aside>
        <div>
          <div>
            <div>
              <div>
                <h4>Photography</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div>
      <i>Generated using json resume</i>
    </div>
  </div>
)

export {Resume}
