import React, { Component } from 'react';
import ContentList from '../component/contentList/ContentList.js';
import axios from 'axios';

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullContent: {},
      contents: []
    };
  }

  componentDidMount = () => {
    this.fetchYoutube('game');
  }

  // 유튜브에 ajax 통신을 해서 데이터를 불러 오는 함수
  fetchYoutube = (keyword) => {
  	//axios를 이용해서 유튜브에 영상 목록을 달라고 요청
    axios.get('https://www.googleapis.com/youtube/v3/search?q='+keyword+'&part=snippet&chart=mostPopular&key=AIzaSyC-v1sIG2Wn3YnoD_7_bBS4zPDceDLKmLY&maxResults=21')
    .then(({data}) => {
			// 유튜브로 부터 요청한 데이터를 전달 받으면 then으로 데이터를 받음
			// 디스트럭쳐링을 통해서 유튜브로부터 받은 데이터중에서 data만 가져옴

			// 받아온 데이터를 내가 원하는 형태로 가공
	    const list = this.setContents(data);

			// 가공한 데이터로 지금 바로 실행할 데이터와, 목록에 보여줄 데이터를 state에 저장
	    this.setState({
				contents: list.slice(1, list.length), // slice 함수는 배열형 데이터를 첫 번째 인자부터 두 번째 인자 전까지 반환한다.
				fullContent: list[0] // 가져온 데이터중 첫번째 데이터를 화면에서 실행 시킵니다.
	    });
    })
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
      <div className="Game">
        <ContentList contents={this.state.contents} onClick={this.handleFullContentChange} />
      </div>
    );
  }
}