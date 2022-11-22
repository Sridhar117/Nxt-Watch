import styled from 'styled-components'

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-left: 2%;
  padding-right: 2%;
  background-color: #202020;
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2c2c2c;
  padding: 2%;
  padding-left: 5%;
  padding-right: 5%;
  width: 80%;
  border-radius: 14px;
  @media screen and (min-width: 768px) {
    width: 30%;
  }
`

export const WebsiteLogo = styled.img`
  width: 35%;
  margin-top: 12%;
  margin-bottom: 12%;
  @media screen and (min-width: 768px) {
    width: 30%;
    margin-top: 5%;
    margin-bottom: 5%;
  }
`

export const Label = styled.label`
  font-family: 'Roboto';
  font-size: 13px;
  margin-bottom: 3%;
  margin-top: 8%;
  color: #f8fafc;
  width: 100%;
  align-self: flex-start;
`

export const InputElement = styled.input`
  outline: none;
  border: 1px solid #64748b;
  border-radius: 2px;
  width: 100%;
  height: 27px;
  color: white;
  font-family: 'Roboto';
  padding: 2%;
  margin-bottom: 2%;
  background-color: transparent;
`

export const LoginButton = styled.button`
  width: 100%;
  margin-top: 10%;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 8px;
  margin-bottom: 5%;
  height: 30px;
  background-color: #4f46e5;
  color: #ffffff;
  @media screen and (min-width: 768px) {
    height: 34px;
  }
`

export const ErrorMessage = styled.p`
  align-self: flex-start;
  color: #ff0b37;
  margin-top: 0px;
  margin-bottom: 5%;
  font-family: 'Roboto';
  font-size: 13px;
`
