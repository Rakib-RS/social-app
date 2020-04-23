import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteEducation } from "../../app/actions/profileAction";

class Education extends Component {
onDeleteClick(id){
    this.props.deleteEducation(id);
}
  render() {
    const education = this.props.education.map((edu) => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          {edu.from}-{edu.to === null ? ('now'):(edu.to)}
        </td>
        <td className="btn btn-danger" onClick={this.onDeleteClick.bind(this,edu._id)}>Delete</td>
      </tr>
    ));
    return <div>
        <h4 className='mb-4'>Education Credentials</h4>
        <table className='table'>
            <thead>
                <tr>
                    <th>School</th>
                    <th>Degree</th>
                    <th>years</th>
                </tr>
                {education}
            </thead>

        </table>
    </div>;
  }
}
export default connect(null,{deleteEducation}) (Education);
