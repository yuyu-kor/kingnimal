import React from "react";
import { useSpeciesQuery } from "../hooks/useSpecies";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import { settings } from "../constants/settings";

const BannerText = styled.div`
  position: absolute;
  bottom: 30px;
  right: 30px;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 12px;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
`;

const SubText = styled.p`
  font-size: 1rem;
  margin: 4px 0;
  opacity: 0.95;
`;

const DetailButton = styled.a`
  display: inline-block;
  margin-top: 10px;
  background: #ffd700;
  color: #333;
  padding: 8px 14px;
  border-radius: 8px;
  font-weight: bold;
  text-decoration: none;
  transition: 0.3s ease;

  &:hover {
    background: #ffcc00;
    transform: translateY(-2px);
  }
`;

const Banner = () => {
  const { data, isLoading, isError, error } = useSpeciesQuery();
  console.log("ddd", data);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }

  const slicedResults = data?.results?.slice(0, 5) ?? [];

  return (
    <div>
      <Slider {...settings}>
        {slicedResults.map((item) => (
          <div key={item.id}>
            <div
              style={{
                position: "relative",
                height: "60vh",
                backgroundImage: `url(${item.default_photo?.medium_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <BannerText>
                <Title>
                  {item?.preferred_common_name} ({item?.name})
                </Title>
                <SubText>분류: {item?.iconic_taxon_name}</SubText>
                <SubText>
                  관찰 수: {item?.observations_count.toLocaleString()}회
                </SubText>
                <DetailButton
                  href={item?.wikipedia_url}
                  target="_blank"
                  rel="noopener noreferrer" //내 사이트 주소를 외부 링크로 보내지 않도록 막음
                >
                  자세히 보기 →
                </DetailButton>
              </BannerText>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
