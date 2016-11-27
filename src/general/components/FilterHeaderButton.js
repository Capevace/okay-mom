import React from 'react';

import Icon from '../../general/components/Icon';

class FilterHeaderButton extends React.Component {
  constructor() {
    super();
    this.state = {
      showSelector: false,
    };

    this.toggleSelector = this.toggleSelector.bind(this);
  }

  toggleSelector() {
    this.setState({
      showSelector: !this.state.showSelector,
    });
  }

  render() {
    return (
      <div
        style={{
          ...this.props.buttonStyle,
        }}
      >

        <button
          onClick={this.toggleSelector}
          style={{
            ...this.props.buttonStyle,
            position: 'relative',
          }}
        >
          <Icon icon="filter" />
        </button>

        {this.state.showSelector &&
          <div
            style={{
              position: 'absolute',
              right: '0px',
              padding: '20px 20px 20px 10px',
              minWidth: '150px',
              background: 'transparent',
            }}
          >
            <ul style={{ margin: 0 }}>
              {this.props.filters.map(({ name, value }, index) => (
                <li
                  style={{ margin: 0 }}
                  key={index}
                >
                  <button
                    onClick={() => {
                      this.props.filterChanged(value);
                      this.toggleSelector();
                    }}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        }
      </div>
    );
  }
}

export default FilterHeaderButton;
