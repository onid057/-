import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const Text = styled.span`
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 2px;
`;

function NavigateText({ nextPage, children }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(nextPage);
  };

  return <Text onClick={handleClick}>{children}</Text>;
}

export default NavigateText;
