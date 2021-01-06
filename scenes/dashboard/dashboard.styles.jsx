import styled from "styled-components";
import EdiText from 'react-editext'

export const ChartContainer = styled('div')`
  border-radius: 6px;
  background-color: white;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,.14)
`;


export const StyledEdiText = styled(EdiText)`
  div[editext="view-container"] {
    margin-left: 12.5%;
  }
`;