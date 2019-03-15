import React, { Component } from 'react';
import ContentList from "../component/contentList/ContentList.js";
import axios from "axios";

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contents: [],
      keyword: ""
    };
  }

  handleInputChange = (e) => {
    this.setState({keyword: e.target.value});
  };

  handleSubmit = (e) => {
    this.fetchSearch(this.state.keyword);

    // 이벤트 버블링
    e.preventDefault();
  }

  fetchSearch = (keyword) => {
    let maxResults = 30;
    let token = 'AIzaSyC-v1sIG2Wn3YnoD_7_bBS4zPDceDLKmLY';

    axios.get('https://www.googleapis.com/youtube/v3/search?q='+keyword+'&part=snippet&key='+token+'&maxResults='+maxResults)
      .then(({ data }) => {
        // console.log(data);

        const list = this.setContents(data);

        this.setState({ 
          contents: list 
        });

        //console.log(list);
    });
  }

  setContents = (data) => {
    let list = [];

    data.items.forEach ((item) => {
      if (item.id.videoId) {
        list.push({ id: item.id.videoId, name: item.snippet.title });
      }
    });

    return list;
  }

  render() {
    return (
      <div className="Search">
        <form onSubmit = {this.handleSubmit}>
          <div className="form-group row align-items-center justify-content-center">
            <div className="col-md-3">
              <label>검색</label>
              <input type="text" className="form-control keyword" value={this.state.keyword} onChange={this.handleInputChange} placeholder="Search..." />
            </div>
          </div>
        </form>
        <ContentList contents={this.state.contents} />
      </div>
    );
  }
}
