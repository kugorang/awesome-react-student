import React, { Component } from 'react';
import './ContentList.css';
import Content from "../content/Content.js"
import PropTypes from "prop-types";

//콘텐츠의 리스트를 보여주는 컴포넌트
export default class ContentList extends Component {
  static propTypes = {
    contents: PropTypes.array,
    onClick: PropTypes.func
  }

  // 한 줄에 4개의 콘텐츠를 출력 하기 위해서 컴포넌트를 구성해주는 함수
  listRender() {
    // console.log(this.props.contents);

    // 현재 콘텐츠를 한 줄에 4개씩 보여주면 몇 줄이 나오는지를 구함
    var count = Math.ceil(this.props.contents.length / 4);
    
    // 컴포넌트를 담을 배열 선언
    let component = [];
    
    // 반복문을 이용해서 한 줄씩 컴포넌트를 만들어줌
  	for (let i = 0; i < count; i++) {
      // slice를 이용해서 그 줄에 들어가야 하는 데이터를 반환 받음
      // (현재 줄 * 4)번째부터 (현재 줄 * 4 + 4) 하면 0 번째 줄 일때는 0부터 3까지
      // 1번째 줄 일때는 4부터 7까지의 데이터를 불러온다.
  		let dataPerRow = this.props.contents.slice(i * 4, i * 4 + 4);

      // 위에서 선언한 배열에 한줄을 구성하는 컴포넌트를 push한다.
      // push는 배열의 맨 뒤에 데이터를 넣을때 사용하는 함수이다.
      // 이런 식으로 컴포넌트를 추가 가능한 이유는 jsx는 js를 좀 더 편리하게 보여주는 역할일 뿐
      // jsx가 읽혀질 때는 xml 형태의 js로 변환되기 때문이다.
  		component.push(
        // row는 부트스트랩에서 한줄을 의미 하는 class이다.
  			<div className="row" key={i}>
  				{
            // 위에서 4개의 데이터를 뽑아 저장된 배열을 map을 이용해서 4개의 콘텐츠를 그려준다.
  					dataPerRow.map((item,index) => {
			      		return (
                  // 반복문 안에서 jsx를 사용할때는 반드시 key를 써줘야 한다.
                  // col-md-3은 한 줄을 12등분 했을때 3칸만큼을 차지 하겠다는 의미이다.
			      		  <div className="col-md-3" key={index}>
					      	  {/* 
                      콘텐츠를 표현해주는 content를 선언할 때 onClick 이벤트를 props로 넘겨준다.
                      이 이벤트는 콘텐츠를 눌렀을때 상단의 실행되는 플레이어를 변경한다.
                    */}
                    <Content content={item} onClick={this.props.onClick}/>
					        </div>
			      		)
			      	})
  				}
  			</div>
  		)
  	}

  	return component;
  }

  render() {
    return (
      <div className="contentList align-items-center justify-content-center">
	      {/*
          리스트를 렌더링해주는 함수를 실행 시킨다.
        */}
        { this.listRender() }
      </div>
    );
  }
}