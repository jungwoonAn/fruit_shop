import React, { useEffect, useState } from "react";
import { Nav, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { addItem } from "../store.js";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const Banner = styled.div`
  padding: 20px;
  color: gray;
`;

const BannerBtn = styled.button`
  color: white;
  font-size: 30px;
  width: 100%;
  padding: 100px 100px;
  border: 1px solid #ccc;
  background-image: url("../img/banner.jpg");
  background-size: cover;
  background-position: center;
`;

const Detail = (props) => {
  const { paramId } = useParams();
  // console.log(paramId)
  const [tap, setTap] = useState(0);

  const [fade2, setFade2] = useState("");
  // dispatch 정의 추가
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setFade2("end");
    }, 10);
    return () => {
      setFade2("");
    };
  }, []);

  // 상품 유효성 체크 (이건 Hook 호출 이후에 실행되어야 함)
  let selproduct = props.fruits.find((x) => x.id === Number(paramId));

  // 훅은 조건문(if) 아래에서 호출하면 안 됨 (React가 Hook 순서 기억을 못함)
  if (!selproduct) {
    return <div>해당 상품이 존재하지 않습니다.</div>;
  }

  const { id, imgUrl, title, content, price } = selproduct;

  console.log("내가 선택한 상품은: " + id + " " + title + imgUrl);

  return (
    <div className={"container text-center start " + fade2}>
      <Banner>
        <BannerBtn>과일농장의 맛과 건강을 선물하세요.</BannerBtn>
      </Banner>

      <div className="row">
        <div className="col-md-6">
          <img src={import.meta.env.BASE_URL + imgUrl} width="100%" alt={title} />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{title}</h4>
          <p>{content}</p>
          <p>{price}원</p>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(
                addItem({
                  id: id,
                  imgUrl: imgUrl,
                  name: title,
                  count: 1,
                }),
              );
            }}
            style={{ marginRight: "10px" }}
          >
            주문하기
          </Button>{" "}
          <Button
            variant="outline-success"
            onClick={() => {
              navigate("/cart");
            }}
          >
            {" "}
            주문상품 확인하기{" "}
          </Button>
        </div>
      </div>

      <Nav
        variant="tabs"
        defaultActiveKey="link0"
        style={{ marginTop: "50px" }}
      >
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTap(0);
            }}
            eventKey="link0"
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTap(1);
            }}
            eventKey="link1"
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTap(2);
            }}
            eventKey="link2"
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <TabContent tap={tap} />
    </div>
  );
};

function TabContent({ tap }) {
  let [fade, setFade] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 10);
    return () => {
      setFade("");
    };
  }, [tap]);

  return (
    <div className={"start " + fade}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tap]}
    </div>
  );
}

export default Detail;
