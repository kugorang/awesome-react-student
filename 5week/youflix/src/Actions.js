import axios from "axios";

// action type
export const REQUEST_CONTENTS = "REQUEST_CONTENTS";
export const RECEIVE_CONTENTS = "RECEIVE_CONTENTS";
export const REMOVE_CONTENTS = "REMOVE_CONTENTS";
export const CHANGE_FULL_CONTENT = "CHANGE_FULL_CONTENT";
export const CHANGE_KEYWORD = "CHANGE_KEYWORD";

// action creator (액션 생성자)
const requestContents = () => ({
  type: REQUEST_CONTENTS
});

const receiveContents = (contents) => ({
  type: RECEIVE_CONTENTS,
  contents: contents,
  receiveAt: Date.now()
});

export const removeContents = () => ({
  type: REMOVE_CONTENTS
})

export const changeFullContent = (content) => ({
  type: CHANGE_FULL_CONTENT,
  content: content
});

export const changeKeyword= (keyword) => ({
  type: CHANGE_KEYWORD,
  keyword
})

const token = 'AIzaSyBhSQTUN22ZmUdQLYWc0cyKERvqzVCZqkI'
const maxResults = 30

export const fetchContents = () => {
  return dispatch => {
    dispatch(requestContents());

    // axios를 이용해서 유튜브에 영상 목록을 달라고 요청
    return API({token, maxResults})
      .then(({data}) => setContents(data))
      .then(contents => {
        dispatch(changeFullContent(contents[0]));
        dispatch(receiveContents(contents.slice(1, contents.length)));
      })
      .catch(e => {
        console.log(e);
      })
  }
}

export const fetchSearchContent = (keyword) => {
  return dispatch => {
    dispatch(requestContents())

    return API({token, maxResults, keyword})
      .then(({data}) => setSearchContents(data))
      .then(contents => {
        dispatch(receiveContents(contents))
      })
      .catch(e => {
        console.log(e);
      });
  }
}

const API = ({keyword="", token="", maxResults=30}) => {
  const URL = "https://www.googleapis.com/youtube/v3";
  var api = "";

  if (keyword === "") {
    api = URL + `videos?part=snippet&chart=mostPopular&key=${token}&maxResults=${maxResults}`;
  } else {
    api = URL + `search?q=${keyword}&part=snippet&key=${token}&maxResults=${maxResults}`;
  }

  return axios.get(api);
}

// 서버로 부터 받은 데이터를 내가 원하는 형태로 변경 하는 함수
// {id: , name: } 형식으로 모든 데이터들을 변환
const setContents = (data) => {
  let list = [];

  data.items.forEach((item, index) => {
    list.push({
      key: index,
      id: item.id,
      name: item.snippet.title
    })
  })

  return list;
}

const setSearchContents = (data) => {
  let list = [];

  console.log(data);

  data.items.forEach((item, index) => {
    list.push({
      id: item.id.videoId,
      name:item.snippet.title
    })
  });

  return list;
}