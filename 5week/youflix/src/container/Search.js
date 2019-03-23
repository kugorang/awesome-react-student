import React, { Component} from "react";
import ContentList from "../component/contentList/ContentList.js";
import { connect } from 'react-redux';
import { fetchSearchContent, changeKeyword } from "../Actions";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // keyword를 입력받기 위한 state
      keyword: ""
    };
  }

  handleInputChange = (e) => {
    this.setState({keyword:e.target.value})
  }

  handleSubmit = (e) => {
    this.props.changeKeyword(this.state.keyword);
    e.preventDefault();
  }

  // redux에 의해서 props.keyword가 업데이트 되면
  // 키워드로 유튜브의 동영상을 검색하는 액션 실행
  componentDidUpdate(prevProps) {
    if (this.UNSAFE_componentWillMount.props.keyword !== prevProps.keyword) {
      this.props.fetchSearchContent(this.props.keyword);
    }
  }

  // setContents = (data) => {
  //   let list = [];

  //   data.items.forEach((item, index) => {
  //     if (item.id.videoId) {
  //       list.push({id:item.id.videoId,name:item.snippet.title})
  //     }
  //   })

  //   return list;
  // }

  // fetchSearch = (keyword) => {
  //   let maxResults = 30
  //   let token = 'mytoken'//본인의 토큰을 발급 받아서 입력
  //   axios.get('https://www.googleapis.com/youtube/v3/search?q='+keyword+'&part=snippet&key='+token+'&maxResults='+maxResults)
  //   .then(({data}) => {
  //     const list = this.setContents(data)
  //     this.setState({contents:list})
  //   })
  // }

  render() {
    return (
      <div className="Search">
        <form className="" onSubmit={this.handleSubmit}>
          <div className="form-group row align-items-center justify-content-center">
            <div className="col-md-3">
              <label>검색</label>
              <input type="text" value={this.state.keyword} onChange={this.handleInputChange} className="form-control keyword" placeHolder="Seacrh..."/>
            </div>
          </div>
        </form>

        <ContentList contents={this.props.contents} />
      </div>
    );
  }
}

// store의 state를 컴포넌트의 props로 전달시켜줌
const mapStateToProps = state => {
  // store는 state를 Reducer 단위로 가지고 있어 각각의 Reducer를 
  // 불러와 컴포넌트에 props로 전달할 값들을 뽑아낸다.
  const { contentsByYoutube, selectedKeyword} = state;
  const { keyword } = selectedKeyword;
  const { 
    isFetching, 
    lastUpdated, 
    items: contents
  } = contentsByYoutube;

  return {
    keyword,
    isFetching,
    lastUpdated,
    contents
  }
}

// action을 미리 dispatch 해서 컴포넌트의 props로 전달해주는 함수
const mapDispatchToProps = dispatch => ({
  changeKeyword:(keyword) => dispatch(changeKeyword(keyword)),
  fetchSearchContent: (keyword) => dispatch(fetchSearchContent(keyword))
});

// connect 함수를 이용해 co

export default connect(mapStateToProps, mapDispatchToProps)(Search);