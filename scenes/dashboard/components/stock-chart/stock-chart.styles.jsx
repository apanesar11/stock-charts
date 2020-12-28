import styled from 'styled-components';

export const CloseContainer = styled('div')`
  position: absolute;
  right: 10px;
  top: 5px;
  color: #6F8092;
  cursor: pointer;
  &:hover {
    color: #333333;
  }
`;

export const ChartContainer = styled('div')`
  border-radius: 6px;
  background-color: white;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,.14)
`;