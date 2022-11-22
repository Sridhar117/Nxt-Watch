import styled from 'styled-components'

export const NavbarContainer = styled.div`
  background-color:${props => props.bgColor}
  padding: 2%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 768px) {
    padding: 1%;
  }
`

export const HeaderLogo = styled.img`
  width: 40%;
  @media screen and (min-width: 768px) {
    .header-logo {
      width: 60%;
    }
  }
`

export const NavOptionsContainer = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  list-style-type: none;
  padding-left: 0;
  width: 40%;
  @media screen and (min-width: 768px) {
    display: none;
  }
`

export const LogoutButton = styled.button`
  outline: none;
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: white;
  @media screen and (min-width: 768px) {
    cursor: pointer;
    outline: none;
    background-color: transparent;
    border: 1px solid #3b82f6;
    border-radius: 4px;
    color: #3b82f6;
    height: 30px;
    width: 80px;
  }
`

export const NavItemsLgContainer = styled.ul`
  display: none;
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    list-style-type: none;
    padding-left: 0;
    width: 20%;
  }
`

export const LogoutButtonLgContainer = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
  }
`

export const LinkItem = styled.li`
  @media screen and (min-width: 768px) {
    text-decoration: none;
    color: #f1f5f9;
    font-family: 'Roboto';
    font-size: 17px;
  }
`
export const Para = styled.li`
  @media screen and (min-width: 768px) {
    margin-right: 15%;
  }
`
