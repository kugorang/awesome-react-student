import React, { Component } from 'react';
import axios from "axios";
import ContentList from "../component/contentList/ContentList.js";

// const Text = (props) => {
//     return (
//         <div>
//             {props.children}
//         </div>
//     )
// }

export default class Search extends Component {
    state = {
        contents: [],
        keyword: ""
    };

    handleInputChange = (e) => {
        this.setState({keyword: e.target.value});
    };

    setContents = (data) => {
        let list = [];

        data.items.forEach((item) => {
            if (item.id.videoId) {
                list.push({ id: item.id.videoId, name: item.snippet.title });
            }
        });

        return list;
    }

    handleSubmit = (e) => {
        this.fetchSearch(this.state.keyword);

        // 이벤트 버블링
        e.preventDefault();
    }

    fetchSearch = (keyword) => {
        let maxResults = 30;
        let token = 'AIzaSyC-v1sIG2Wn3YnoD_7_bBS4zPDceDLKmLY';

        axios.get (
            'https://www.googleapis.com/youtube/v3/search?q=' + 
            keyword + '&part=snippet&key=' + 
            token + '&maxResults=' + 
            maxResults
        )
        .then(({ data }) => {
            // console.log(data);
            const list = this.setContents(data);
            this.setState({ contents: list});
            console.log(list);
        });
    }

    render() {
        return (
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <div>
                        <label>검색</label>
                        <input 
                            value={this.state.keyword} 
                            onChange={this.handleInputChange}
                        />
                    </div>
                </form>

                <ContentList contents={this.state.contents} />
            </div>
        );
    }
}
