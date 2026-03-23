import styled from 'styled-components';
import open from '../assets/images/open.png';
import packup from '../assets/images/packup.png';

export const Content = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: #fff;
`;
export const DivIcon = styled.div`
  display: flex;
  background: #fff;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  align-items: center;
  div {
    cursor: pointer;
    position: relative;
    width: 32px;
    height: 32px;
  }
  i {
    background: rgba(201, 206, 213, 1);
    width: 1px;
    height: 12px;
  }
`;

export const Open = styled.div`
  background: url(${open}) no-repeat center;
`;
export const Packup = styled.div`
  background: url(${packup}) no-repeat center;
`;
export const TitleHover = styled.div`
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.18);
  border-radius: 2px;
  padding: 4px 4px 0;
  position: absolute;
  left: 85px;
  display: none;
`;
export const TitleText = styled.div`
  &:hover div:first-child {
    display: block;
  }
  padding-right: 80px;
`;
export const TitleIcon = styled.img`
  margin: 0 4px;
`;
