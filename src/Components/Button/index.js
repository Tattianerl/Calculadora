import { ButtonContainer } from "./styles";

const  Button = ({label, onClick, style}) => {
  return (
  <ButtonContainer onClick={onClick}  style={style}>
   {label}
  </ButtonContainer> 
   
  )
}
export default Button;