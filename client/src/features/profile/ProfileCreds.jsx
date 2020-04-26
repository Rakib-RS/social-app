import React, { Component } from "react";

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;
    const expItem = experience.map((exp) => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
    {exp.from} - {exp.to === null || exp.to === ''? ('now'):<span>{exp.to}</span>}
        </p>
        <p>
          <strong>Position:</strong>
          {exp.title}
        </p>
        <p>
          <strong>Location:</strong>
          {exp.location}
        </p>
        <p>
          <strong>Description:</strong>
          {exp.description}
        </p>
      </li>
    ));
    const eduItem = education.map((edu) => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
    {edu.from} - {edu.to === null || edu.to === '' ? ('now'): <span>{edu.to}</span>}
        </p>
        <p>
          <strong>Position:</strong>
          {edu.degree}
        </p>
        <p>
          <strong>Location:</strong>
          {edu.fieldofstudy}
        </p>
        <p>
          <strong>Description:</strong>
          {edu.description}
        </p>
      </li>
    ));
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience:</h3>
          {expItem.length > 0 ? (
            <ul className="list-group">{expItem}</ul>
          ) : (
            "no experience"
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education:</h3>
          {eduItem.length > 0 ? (
            <ul className="list-group">{eduItem}</ul>
          ) : (
            "no education"
          )}
        </div>
      </div>
    );
  }
}
export default ProfileCreds;
