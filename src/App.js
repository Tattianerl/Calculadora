import Input from './Components/Input';
import Button from './Components/Button';
import { Container, Content, Row } from "./styles";
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';

// Função para formatar o número conforme padrão brasileiro
const formatNumber = (number) => {
  if (!number) return '0';

  // Divide a parte inteira da parte decimal
  let [integerPart, decimalPart] = number.split('.');

  // Remove quaisquer caracteres não numéricos da parte inteira
  integerPart = integerPart.replace(/\D/g, '');

  // Formata a parte inteira com separadores de milhares (ponto)
  const formattedIntegerPart = new Intl.NumberFormat('pt-BR').format(integerPart);

  // Verifica se o usuário digitou uma parte decimal (após a vírgula)
  if (decimalPart) {
    decimalPart = decimalPart.slice(0, 2); // Limita para duas casas decimais
    return `${formattedIntegerPart},${decimalPart}`;
  }

  return formattedIntegerPart;
};

// Função para converter número formatado (pt-BR) para formato padrão (com ponto)
const convertToStandardNumber = (number) => {
  return parseFloat(number.replace(/\./g, '').replace(',', '.'));
};



const App = () => {
  const [currentNumber, setCurrentNumber] = useState('0');
  const [firstNumber, setFirstNumber] = useState('0');
  const [operation, setOperation] = useState('');

  const handleOnClear = () => {
    setCurrentNumber('0');
    setFirstNumber('0');
    setOperation('');
  };

  const handleBackspace = () => {
    // Remove o último caractere do número atual
    let newNumber = currentNumber.slice(0, -1);

    // Se o número ficar vazio, substituímos por '0'
    if (newNumber === '' || newNumber === '-') {
      newNumber = '0';
    }

    setCurrentNumber(formatNumber(newNumber.replace(/\./g, '').replace(',', '.')));
  };


  const handleAddNumber = (number) => {
    if (number === ',' && currentNumber.includes(',')) return;

    // Atualiza o número
    let newNumber = currentNumber === '0' && number !== ',' ? number : currentNumber + number;

    setCurrentNumber(newNumber);
  };

  // Função de soma
  const handleSumNumbers = () => {
    if (firstNumber === '0') {
      setFirstNumber(currentNumber);
      setCurrentNumber('0');
      setOperation('+');
    } else {
      const sum = convertToStandardNumber(firstNumber) + convertToStandardNumber(currentNumber);
      setCurrentNumber(formatNumber(sum.toFixed(2)));
      setFirstNumber('0');
      setOperation('');
    }
  };

  // Função de subtração
  const handleSubtractionNumbers = () => {
    if (firstNumber === '0') {
      setFirstNumber(currentNumber);
      setCurrentNumber('0');
      setOperation('-');
    } else {
      const difference = convertToStandardNumber(firstNumber) - convertToStandardNumber(currentNumber);
      setCurrentNumber(formatNumber(difference.toFixed(2)));
      setFirstNumber('0');
      setOperation('');
    }
  };

  // Função de multiplicação
  const handleMultiplicationNumbers = () => {
    if (firstNumber === '0') {
      setFirstNumber(currentNumber);
      setCurrentNumber('0');
      setOperation('*');
    } else {
      const mult = convertToStandardNumber(firstNumber) * convertToStandardNumber(currentNumber);
      setCurrentNumber(formatNumber(mult.toFixed(2)));
      setFirstNumber('0');
      setOperation('');
    }
  };

  // Função de divisão
  const handleDivisionNumbers = () => {
    if (firstNumber === '0') {
      setFirstNumber(currentNumber);
      setCurrentNumber('0');
      setOperation('/');
    } else {
      if (currentNumber !== '0') {
        const division = convertToStandardNumber(firstNumber) / convertToStandardNumber(currentNumber);
        setCurrentNumber(formatNumber(division.toFixed(2)));
        setFirstNumber('0');
        setOperation('');
      } else {
        alert("Cannot divide by 0!");
        handleOnClear();
      }
    }
  };
  const handleEquals = () => {
    if (firstNumber !== '0' && operation !== '' && currentNumber !== '0') {
      switch (operation) {
        case '+':
          handleSumNumbers();
          break;
        case '-':
          handleSubtractionNumbers();
          break;
        case '*':
          handleMultiplicationNumbers();
          break;
        case '/':
          handleDivisionNumbers();
          break;
        default:
          break;
      }
    }
  };

  const handlePercentage = () => {
    if (currentNumber !== '0') {
      const percentage = Number(currentNumber.replace(/\./g, '').replace(',', '.')) / 100;
      setCurrentNumber(formatNumber(String(percentage)));
    }
  };

  return (
    <Container>
      <Content>
        <Input value={currentNumber} />

        <Row>
          <Button label="/" onClick={handleDivisionNumbers} style={{ backgroundColor: '#424242', color: '#ff1905' }} />
          <Button label="%" onClick={handlePercentage} style={{ backgroundColor: '#424242', color: '#ff1905' }} />
          <Button label="C" onClick={handleOnClear} style={{ backgroundColor: '#424242', color: '#ff1905' }} />
          <Button label={<FontAwesomeIcon icon={faBackspace} />} onClick={handleBackspace} style={{ backgroundColor: '#424242', color: '#ff1905'}} />
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber('7')} />
          <Button label="8" onClick={() => handleAddNumber('8')} />
          <Button label="9" onClick={() => handleAddNumber('9')} />
          <Button label="x" onClick={handleMultiplicationNumbers} style={{ backgroundColor: '#424242', color: '#ff1905' }} />
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber('4')} />
          <Button label="5" onClick={() => handleAddNumber('5')} />
          <Button label="6" onClick={() => handleAddNumber('6')} />
          <Button label="-" onClick={handleSubtractionNumbers} style={{ backgroundColor: '#424242', color: '#ff1905' }} />
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber('1')} />
          <Button label="2" onClick={() => handleAddNumber('2')} />
          <Button label="3" onClick={() => handleAddNumber('3')} />
          <Button label="+" onClick={handleSumNumbers} style={{ backgroundColor: '#424242', color: '#ff1905' }} />
        </Row>
        <Row>
          <Button label="," onClick={() => handleAddNumber(',')} style={{ backgroundColor: '#424242', color: '#ff1905', borderBottomLeftRadius: '15px' }} />
          <Button label="0" onClick={() => handleAddNumber('0')} />
          <Button label="=" onClick={handleEquals} style={{ backgroundColor: '#424242', color: '#ff1905',borderBottomRightRadius: '15px' }} />
        </Row>
      </Content>
    </Container>
  );
};

export default App;
