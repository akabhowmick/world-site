import { Wrapper } from './Header.style';
import { useNavigate } from 'react-router';

const Header = () => {
  let navigate = useNavigate();

  const gotoHome = () => {
    navigate('/');
  };
  return (
    <Wrapper>
      <h1 onClick={gotoHome}>Where in the world?</h1>
    </Wrapper>
  );
};

export default Header;
