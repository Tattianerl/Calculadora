import { InputContainer } from './styles';

const Input = ({value}) => {
  return (
    <InputContainer>
      <input type="text" value={value} readOnly /> 
    </InputContainer>
  )
}
export default Input;