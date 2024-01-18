import { styled } from 'styled-components';

const Text = styled.span`
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 5px;
`;

function NavigateText({ children }) {
  return <Text>{children}</Text>;
}

export default Text;
