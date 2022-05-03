import styled from "@emotion/styled";
import NavItem from "./nav-item";

const Nav = styled.div`
  display: flex;
  flex-direction: row;
`

const Navigation = ({ items }:{items:string[]}) =>
  (
    <Nav>
      { items.map((item, i) => <NavItem key={`nav+${i}`}>{item}</NavItem>)}
    </Nav>
  )

export default Navigation;
