import styled from "styled-components";

export const Overlay = styled('div')`
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0, 0.9); /* Black with a little bit see-through */
`;

export const OverlayBody = styled('div')`
  position: relative;
  top: 15%;
  width: 80%;
  text-align: center;
  margin-top: 30px;
  margin: auto;
`

export const CloseButton = styled('span')`
  position: absolute;
  top: 20px;
  right: 45px;
  font-size: 60px;
  cursor: pointer;
  color: white;
  &:hover {
    color: #ccc;
  }
`;

export const SearchField = styled('input')`
  padding: 15px;
  font-size: 17px;
  border: none;
  float: left;
  width: 80%;
  background: white;
  &:hover {
    background: #f1f1f1;
  }
`;

export const Button = styled('button')`
  float: left;
  width: 20%;
  padding: 15px;
  background: #ddd;
  font-size: 17px;
  border: none;
  cursor: pointer;
  &:hover {
    background: #bbb;
  }
`;

export const SearchResults = styled('div')`
  color: white;
  padding-top: 70px;
`;