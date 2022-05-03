import styled from "@emotion/styled";

const Drawer = styled.aside`
  position: absolute;
  height: 100vh;
  width: 200px;
  border-right: 2px solid black;
  box-shadow: 5px 10px darkslategrey;
`

function Sidenav() {
  return(
    <Drawer>
      ooh, sidenav
    </Drawer>
  )
}

export default Sidenav;
