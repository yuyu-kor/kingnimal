import React from "react";
import styled from "styled-components";
import { useEndangeredAnimals } from "../hooks/useEndangeredAnimals";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  padding: 30px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Card = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const Image = styled.div`
  height: 180px;
  background-size: cover;
  background-position: center;
`;

const Info = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const Name = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 8px;
`;

const DetailButton = styled.a`
  background: #ffd700;
  color: #333;
  padding: 7px 10px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: bold;
  text-decoration: none;
  transition: 0.3s ease;
  max-width: 120px;

  &:hover {
    background: rgb(240, 192, 2);
  }
`;

const EndangeredList = () => {
  const { data, isLoading, isError, error } = useEndangeredAnimals();
  console.log("data", data);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }

  // 멸종위기종 8개 랜덤으로 보여주기
  const slicedResults = (data?.results ?? [])
    .sort(() => Math.random() - 0.5)
    .slice(0, 8);

  return (
    <div>
      <h2
        style={{
          marginTop: "60px",
          marginLeft: "30px",
          fontWeight: "bold",
        }}
      >
        멸종위기종 목록
      </h2>

      <Grid>
        {slicedResults.map((item) => {
          return (
            <Card key={item.id}>
              <Image
                style={{
                  backgroundImage: `url(${
                    item.default_photo.medium_url || ""
                  })`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              />
              <Info>
                <Name>
                  {item?.preferred_common_name} ({item?.name})
                </Name>
                <p>분류: {item.iconic_taxon_name}</p>
                <DetailButton
                  href={item?.wikipedia_url}
                  target="_blank"
                  rel="noopener noreferrer" //내 사이트 주소를 외부 링크로 보내지 않도록 막음
                >
                  자세히 보기 →
                </DetailButton>
              </Info>
            </Card>
          );
        })}
      </Grid>
    </div>
  );
};

export default EndangeredList;
