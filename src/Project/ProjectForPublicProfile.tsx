import { Link } from 'react-router-dom';
import * as React from 'react';
import '../styles/Project.css';
import { State } from '../types/Projects.d';
import { Store, ProjectForPublicProfileProps, Action } from '../types/Redux';
import { connect, Dispatch } from 'react-redux';
import { getProjects } from '../actions/projectActions';

class ProjectForPublicProfile extends React.Component<
  ProjectForPublicProfileProps,
  State
> {
  constructor(props: ProjectForPublicProfileProps) {
    super(props);
  }

  componentWillMount() {
    this.props.getProjects(
      { createdAt: -1 },
      {
        $or: [
          { creator: this.props.user.username },
          { team: { $in: [this.props.user.username] } }
        ]
      }
    );
  }

  render() {
    var data = this.props.data;

    var roles;
    if (data.lookingFor && data.lookingFor!.length > 1) {
      roles = data.lookingFor[0] + ', ' + data.lookingFor[1];
    } else if (data.lookingFor && data.lookingFor!.length === 1) {
      roles = data.lookingFor;
    } else {
      roles = 'None';
    }

    var tags;
    if (data.tags !== undefined && data.tags.length > 0) {
      tags = data.tags.map((tagName: string, index: number) => {
        var link = '/tag/' + tagName;
        return (
          <Link to={link} key={index} className="projects-tag-links">
            {tagName}
          </Link>
        );
      });
    }

    var category;
    if (data.category) {
      var categoryLink = '/category/' + data.category;
      category = (
        <Link to={categoryLink} className="projects-category-links">
          {data.category}
        </Link>
      );
    }

    return (
      <div id={this.props.projId} className="project-edit-box">
        <div className="project-edit-container">
          <Link
            to={'/projects/' + this.props.projId}
            className="project-edit-image-container"
          >
            <img
              className="project-edit-image"
              alt={data.name}
              src={
                data.images!.length === 0 ||
                data.images === undefined ||
                data.images === null
                  ? require('../assets/imagePlaceholder.jpg')
                  : data.images[0]
              }
            />
          </Link>
          <div className="project-edit-info-forPublicProfile">
            <div className="project-name">{data.name}</div>
            <div className="project-description">{data.description}</div>
            <div className="project-tags">
              {category}
              {tags}
            </div>
            <div className="project-roles-needed">
              looking for
              <div className="project-roles">{roles}</div>
            </div>
            <a>
              <img
                className="project-save"
                src={require('../assets/Bookmark Icon.png')}
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Store) => {
  return {
    projects: state.projects,
    user: state.user
  };
};

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    getProjects: (options: object, query: object | null) => {
      return dispatch(getProjects(options, query));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ProjectForPublicProfile
);
