import React, { useState } from "react";
import styled from "styled-components";
import { useEndangeredAnimals } from "../hooks/useEndangeredAnimals";
import ReactPaginate from "react-paginate";

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
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); // 그림자 더 진하게
    transform: scale(1.03); // 살짝 확대
  }
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

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;

  .pagination {
    gap: 5px;
  }

  .page-item a {
    text-decoration: none;
    color: inherit;
    padding: 6px 12px;
    display: block;
  }

  .page-item {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
    transition: background-color 0.3s ease;
  }

  .page-item:hover {
    background-color: #f5f5f5 !important;
  }

  .page-item.disabled {
    opacity: 0.5;
  }

  .active {
    background-color: #ffd700;
    color: #333;
    font-weight: bold;
    border-color: #ffd700;
  }
`;

const EndangeredList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useEndangeredAnimals(page);
  console.log("data", data);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }

  const handlePageChange = ({ selected }) => {
    setPage(selected + 1);
  };

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
        {data.results.map((item) => {
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
      <PaginationWrapper>
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          pageClassName="page-item"
          pageLinkClassName=""
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          pageCount={100} //전체 페이지 수 제한
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="active"
          forcePage={page - 1} //현재 페이지 표시
        />
      </PaginationWrapper>
    </div>
  );
};

export default EndangeredList;
