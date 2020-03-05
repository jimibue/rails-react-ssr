import React from "react"
import PropTypes from "prop-types"
class Test extends React.Component {
  render () {
    return (
      <React.Fragment>
        Tests: {this.props.tests}
      </React.Fragment>
    );
  }
}

Test.propTypes = {
  tests: PropTypes.array
};
export default Test
