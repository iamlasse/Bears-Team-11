/* tslint:disable */
import * as React from 'react';
import '../styles/Redlines.css';
import Toolbar from './Toolbar';
import ImageLayer from './ImageLayer';
import AnnotationLayer from './AnnotationLayer';
import axios from 'axios';

class Redline extends React.Component<
  { imageLink: string; match: any },
  {
    tool: string;
    revision: any;
  }
> {
  constructor(props: { imageLink: string; match: any }) {
    super(props);
    this.state = {
      tool: 'cursor',
      revision: {}
    };
  }

  componentDidMount() {
    var { projectId, revisionId } = this.getURLParams();
    axios
      .get(
        `http://localhost:8080/api/projects/${projectId}/revisions/${revisionId}`
      )
      .then(response => {
        this.setState({
          revision: response.data.revision
        });
      });
  }

  // NOTE: Possibly make a generic tool function
  selectCursorTool = () => {
    this.setState({ tool: 'cursor' });
  };

  selectCircleTool = () => {
    this.setState({ tool: 'circle' });
  };

  selectRectangleTool = () => {
    this.setState({ tool: 'rectangle' });
  };

  selectCommentTool = () => {
    this.setState({ tool: 'comment' });
  };

  getURLParams = () => {
    return this.props.match.params;
  };

  render() {
    return (
      <div className="redline-container">
        <Toolbar
          tool={this.state.tool}
          selectCursorTool={this.selectCursorTool}
          selectCircleTool={this.selectCircleTool}
          selectRectangleTool={this.selectRectangleTool}
          selectCommentTool={this.selectCommentTool}
        />
        <div className="redline-canvas">
          <div>
            <ImageLayer imageLink={this.state.revision.imageURL} />
            <AnnotationLayer
              tool={this.state.tool}
              onMarkerAdd={this.selectCursorTool}
              revisionId={this.getURLParams().revisionId}
              projectId={this.getURLParams().projectId}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Redline;