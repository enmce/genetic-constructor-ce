/*
 Copyright 2016 Autodesk,Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
import React, { Component, PropTypes } from 'react';
import Toggler from '../ui/Toggler';

//todo - update classes
//todo - handle state internally for toggle open / closed

export default class InspectorRowHeading extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    hasToggle: PropTypes.bool,
    forceActive: PropTypes.bool,
    onToggle: PropTypes.func,
  };

  static defaultProps = {
    onToggle: () => {},
  };

  state = {
    active: false,
  };

  getActiveState = () => {
    const { forceActive } = this.props;
    return (forceActive === true || forceActive === false) ? forceActive : this.state.active;
  };

  handleToggle = () => {
    this.setState({ active: !this.state.active },
      () => this.props.onToggle(this.state.active));
  };

  render() {
    const { text, hasToggle } = this.props;

    if (!hasToggle) {
      return (<h4 className="InspectorContent-heading">{text}</h4>);
    }

    const isActive = this.getActiveState();

    return (
      <h4 className={'InspectorContent-heading toggler' + (isActive ? ' active' : '')}
          onClick={() => this.handleToggle()}>
        <Toggler open={isActive}/>
        <span>{text}</span>
      </h4>
    );
  }
}
