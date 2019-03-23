import React, { Component } from 'react';
import './MainView.css';
import ConetntList from "../component/contentList/ContentList.js";
import FullContent from '../component/fullcontent/FullContent.js';
import { connect } from "react-redux";
import { fetchContents, changeFullContent, removeContents } from "../Actions";

class MainView extends Component {
  // 컴포넌트 렌더링이 완료된 후 유튜브에서 데이터 불러옴
  componentDidMount() {
    // mapDispatchToProps에서 선언한 유튜브 데이터를 불러오는 액션
  	this.props.fetchContents();
  }

  // 컴포넌트 종료 시 contents 초기화
  componentWillUnmount() {
    // mapDispatchToProps에서 선언한 contents를 초기화하는 액션
    this.props.removeContents();
  }

  // 메인화면에서 영상을 실행하는 플레이어를 제어하는 함수
  // 이 함수를 이용해서 영상을 변경 한다.
  handleFullContentChange = (content) => {
    // mapDispatchToProps에서 선언한 viewContent를 변환하는 액션
    this.props.changeFullContent(content);
  }

  render() {
    // console.log(this.props);

    return (
      <div className="mainView">
      	{/*
          영상을 실행 시키는 컴포넌트
          Redux로부터 받은 currentViewContent를 props로 사용 
      	*/}
      	<FullContent content={this.props.currentViewContent}/>
      	{/*
          실행할 영상 리스트를 출력하는 컴포넌트
          Redux로부터 받은 contents를 props로 사용
      	*/}
       	<ConetntList contents={this.props.contents} onClick={this.handleFullContentChange} />
      </div>
    );
  }
}

// store의 state를 컴포넌트의 props로 전달시켜줌
const mapStateToProps = (state) => {
  // reducer에서 구분한 state를 불러옴
  // store는 state를 Reducer 단위로 가지고 있어서
  // 각각의 Reducer를 불러와 컴포넌트에 props로 전달할 값들을 뽑아낸다.
  const { contentsByYoutube, selectedContent } = state;
  const { 
    isFetching, 
    lastUpdated, 
    items: contents 
  } = contentsByYoutube;  // 데이터를 디스트럭칭을 이용해서 초기화 해줌
  const { 
    viewContent: currentViewContent
  } = selectedContent;

  // MainView 컴포넌트의 props로 return, 이제 MainView 컴포넌트에서 this.props로 접근 가능하다.
  return { isFetching, contents, lastUpdated, currentViewContent };
}

// action을 미리 dispatch 해서 컴포넌트의 props로 전달해주는 함수
// MainView 컴포넌트에서 props로 접근 가능
const mapDispatchToProps = dispatch => ({
  fetchContents: () => dispatch(fetchContents()),
  changeViewContent: (content) => dispatch(changeFullContent(content)),
  removeContents: () => dispatch(removeContents())
});

// connect 함수를 이용해 container 컴포넌트와 Redux를 연결
// connect 함수는 컴포넌트의 props와 store의 데이터를 연결 시켜주는 함수를 반환
// mapStateToProps, mapDispatchToProps는 connect 함수의 인자로 따로 선언해줘야 함
export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(MainView);
