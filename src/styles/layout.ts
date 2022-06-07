import styled from "styled-components";

const OuterLayout = styled.section`
  padding: 2rem 4rem;
  @media screen and (max-width: 1347px) {
    padding: 0rem 10rem;
  }
  @media screen and (max-width: 1186px) {
    padding: 0rem 5rem;
  }
  @media screen and (max-width: 990px) {
    padding: 0rem 2rem;
  }
`;
export default OuterLayout;
export const InnerLayout = styled.section`
  padding: 2rem 0;
`;
