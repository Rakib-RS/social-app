import React, { Component } from "react";

class NotFound extends Component {
  render() {
    return (
      <div className='text-center'>
        <h4>This page isn't available</h4>
        <br/><br/>
        <h6 className='mt-10'>
          The link you followed may be broken, or the page may have been
          removed.
        </h6>
      </div>
    );
  }
}
export default NotFound;
