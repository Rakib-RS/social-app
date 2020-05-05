import React, { Component } from "react";
import { Link } from "react-router-dom";
import isEmpty from "../../app/validation/is-empty";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "80d8079fa9310702a7f8",
      clientSecret: "2fbbd5a5986eb79d78910d00e83663622424eb01",
      count: 5,
      sort: "created: asc",
      repos: [],
    };
  }
  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (this.refs.myref) {
          this.setState({ repos: data });
        }
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { repos } = this.state;
    let repoItems;
    console.log(repos.length);
    if(Array.isArray(repos) && repos.length){
    repoItems = repos.map((repo) => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <a href={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success mr-1">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ))}
    return (
      <div ref="myref">
        <h3 className="mb-4">Latest Github Repos:</h3>
        {isEmpty(repoItems)? "sorry not found, check your githubusername,is it correct or not ":(<span>
          
          {repoItems}
          </span>
        )}
        
      </div>
    );
  }
}
export default ProfileGithub;
