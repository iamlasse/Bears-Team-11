import * as React from 'react';
import '../styles/ProjectFeatures.css';

class ProjectFeatures extends React.Component {
  render() {
    return (
      <div>
        <div className="project-match-container">
          <div className="project-feature-heading">
            Find the perfect project
          </div>
          <div className="project-feature-text">
            Filter through all our projects by category, tags, or desired roles.
            Once your find an interesting project, request to join the team!
          </div>
          <div className="project-feature-image-div">
            <img
              className="project-feature-imac"
              src={require('../assets/Feature3.png')}
            />
          </div>
        </div>
        <div className="project-new-container">
          <div className="project-feature-heading">Got your own idea?</div>
          <div className="project-feature-text">
            Create your own project and recruit other programmers and designers
            to work together and launch the MVP.
          </div>
          <div className="project-feature-image-div">
            <img
              className="project-feature-imac push-right"
              src={require('../assets/Feature1.png')}
            />
          </div>
        </div>
        <div className="team-collaboration-container">
          <div className="project-feature-heading">
            collaborate with your team
          </div>
          <div className="project-feature-text">
            Use Project Portals as the dedicated platform for team chat and
            project mockups reviews / redlines.
          </div>
          <div className="project-feature-image-div">
            <img
              className="project-feature-imac"
              src={require('../assets/Feature2.png')}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectFeatures;
