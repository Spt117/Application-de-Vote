import Nav from "react-bootstrap/Nav"

export default function Navbar() {
   return (
      <Nav>
         <Nav.Item>
            <Nav.Link href="/">Accueil</Nav.Link>
         </Nav.Item>
         <Nav.Item>
            <Nav.Link href="/Demo">Démo</Nav.Link>
         </Nav.Item>
         <Nav.Item>
            <Nav.Link href="/Acheter">Acheter</Nav.Link>
         </Nav.Item>
      </Nav>
   )
}
