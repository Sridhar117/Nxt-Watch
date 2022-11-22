import styled from 'styled-components'

export const BannerContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  height: 225px;
  background-size: cover;
`
export const LogoImage = styled.img`
  width: 10%;
`
export const Paragraph = styled.p`
  font-family: 'Roboto';
  font-size: 15px;
`

export const GetStartButton = styled.button`
  outline: none;
  cursor: pointer;
  font-family: 'Roboto';
  font-size: 12px;
  font-weight: bold;
  padding: 5px;
  background-color: transparent;
  border: solid 1px black;
  color: black;
`
export const InputElement = styled.input`
  outline: none;
  border: 1px solid #64748b;
  border-radius: 2px;
  width: 30%;
  height: 12px;
  color: black;
  font-family: 'Roboto';
  padding: 1%;
  margin-bottom: 2%;
  background-color: transparent;
`
export const SearchButton = styled.button`
  outline: none;
  cursor: pointer;
  padding: 6px;
  background-color: grey;
  border: none;
  color: black;
`
export const HomeContainer = styled.div`
  background-color: ${props => props.bgColor};
  min-height: 100vh;
`
